import * as Hapi from 'hapi';
import * as Boom from 'boom';

import { Server, ServerConfig } from './';
import { PATH_METADATA, METHOD_METADATA, SERVICE_METADATA, REQUEST_VALIDATION, RESPONSE_VALIDATION } from '../commons/constants';
import { RequestMethod, ResponseMethod } from '../enums';
import { Utils } from '../commons';
import { CoolaRequest, CoolaResponse } from '../core';
import { CoolaException } from '../exceptions';

export class HapiServer extends Server {
    private readonly mServer: Hapi.Server;

    constructor(config: ServerConfig) {
        super(config);

        this.mServer = new Hapi.Server({
            host: this.getHost(),
            port: this.getPort()
        });
    }

    public async start(): Promise<boolean> {
        try {
            await this.mServer.start();
            return true;
        } catch (err) {
            this.logger.error(err);
            return false;
        }
    }

    public async stop(): Promise<boolean> {
        try {
            await this.mServer.stop();
            return true;
        } catch (err) {
            this.logger.error(err);
            return false;
        }
    }

    public addController(controller: any): void {
        const basePath = Reflect.getMetadata(PATH_METADATA, controller);
        this.logger.info('Adding controller [' + controller.name + ']: ' + 'route path: ' + basePath);

        const controllerInstance = new controller();
        Object.getOwnPropertyNames(controller.prototype).forEach((func) => {
            const path = Reflect.getMetadata(PATH_METADATA, controller.prototype[func]);
            const requestMethods = Reflect.getMetadata(METHOD_METADATA, controller.prototype[func]);
            const requestValidation = Reflect.getMetadata(REQUEST_VALIDATION, controller.prototype[func]);
            const responseValidation = Reflect.getMetadata(RESPONSE_VALIDATION, controller.prototype[func]);
            const actualPath = (!path) ? basePath : basePath + ((basePath === '/') ? Utils.removeURLPrefix(path) : Utils.setURLPrefix(path));

            const methods: string[] = [];
            if (requestMethods) {
                requestMethods.forEach((method: RequestMethod) => {
                    switch (method) {
                        case RequestMethod.GET:
                            methods.push('GET');
                            break;
                        case RequestMethod.POST:
                            methods.push('POST');
                            break;
                        case RequestMethod.PUT:
                            methods.push('PUT');
                            break;
                        case RequestMethod.PATCH:
                            methods.push('PATCH');
                            break;
                        case RequestMethod.DELETE:
                            methods.push('DELETE');
                            break;
                    }
                });
            }

            this.logger.info('  - ' + methods + ' ' + actualPath);
            this.addRoute(actualPath, methods, controllerInstance[func], requestValidation, responseValidation);
        });
    }

    private addRoute(path: string, methods: string[], func: any, requestValidation?: any, responseValidation?: any) {
        // Basic route config
        const routeConfig = {
            path: path,
            method: methods,
            config: {
                handler: (request: Hapi.Request, responseToolkit: Hapi.ResponseToolkit) => {
                    const coolaRequest = new CoolaRequest(this.services, this.logger);
                    coolaRequest.setPayload(request.payload);
                    coolaRequest.setParams(request.params);
                    coolaRequest.setQuery(request.query);
                    coolaRequest.setMethod(request.method);
                    coolaRequest.setPath(request.path);

                    const coolaResponse = new CoolaResponse();

                    this.preHandler(coolaRequest, coolaResponse);
                    let message = '';
                    try {
                        message = func(coolaRequest, coolaResponse);
                    } catch (err) {
                        this.errorHandler(err);
                    }
                    this.postHandler(coolaRequest, coolaResponse);
                    return message;
                }
            }
        };

        // Validations
        if (requestValidation) {
            routeConfig['config']['validate'] = requestValidation;
        }
        if (responseValidation) {
            routeConfig['config']['response'] = responseValidation;
        }

        this.mServer.route(routeConfig);
    }

    private errorHandler(err) {
        if (err instanceof CoolaException) {
            throw Boom.boomify(err, { statusCode: err.getStatusCode() });
        } else {
            throw err;
        }
    }

}