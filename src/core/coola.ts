import 'reflect-metadata';

import * as Hapi from 'hapi';

import { CoolaConfig } from './coola-config';
import { CoolaRequestReply } from './coola-request-reply';
import { Logger } from './logger';
import { Utils } from '../common';
import { metadata, PATH_METADATA, METHOD_METADATA, REQUEST_VALIDATION, RESPONSE_VALIDATION } from '../common/constants';
import { RequestMethod } from '../common/enums/request-method';

export class Coola {
    private mHapiServer = new Hapi.Server();
    private config: CoolaConfig = new CoolaConfig();
    private logger: Logger = null;

    constructor(config?: CoolaConfig) {
        // Replacing the config if existing
        if (config) {
            this.config = config;
        }

        // Setting logger
        this.logger = new Logger(this.config.getDebug());

        this.mHapiServer.connection({
            host: this.config.getHost(),
            port: this.config.getPort()
        });

        this.handleControllers();
    }

    private handleControllers(): void {
        const controllers = Reflect.getMetadata(metadata.CONTROLLERS, this.config.constructor);
        if (!controllers) return;

        controllers.forEach((controller) => {
            const basePath = Utils.setURLPrefix(Reflect.getMetadata(PATH_METADATA, controller));
            this.logger.info('Adding controller [' + controller.name + ']: ' + 'route path: ' + basePath);
            this.addController(basePath, controller);
        });
    }

    private addController(basePath: string, controller: any): void {
        const _controller = new controller();
        Reflect.ownKeys(controller.prototype).forEach((func) => {
            const path = basePath + Reflect.getMetadata(PATH_METADATA, controller.prototype[func]);
            const method = Utils.getRequestMethodString(Reflect.getMetadata(METHOD_METADATA, controller.prototype[func]))
            const requestValidation = Reflect.getMetadata(REQUEST_VALIDATION, controller.prototype[func]);
            const responseValidation = Reflect.getMetadata(RESPONSE_VALIDATION, controller.prototype[func]);
            if (method !== undefined) {
                this.logger.info('  - [' + method + '] ' + path);
                this.addRoute(path, method, _controller[func], requestValidation, responseValidation);
            }
        });
    }

    private addRoute(
        path: string,
        method: Hapi.HTTP_METHODS_PARTIAL,
        func: any,
        requestValidation: any,
        responseValidation: any
    ) {

        // Basic route config
        let routeConfig = {
            path: path,
            method: method,
            config: {
                handler: (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
                    const coolaRequestReply = new CoolaRequestReply(request, reply);
                    func(coolaRequestReply);
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

        this.mHapiServer.route(routeConfig);

    }

    public start(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.mHapiServer.start().then((err) => {
                if (err) {
                    console.error(err);
                    resolve(err.toString());
                    return;
                }
                console.info('Coola is running at: ' + this.mHapiServer.info.uri);
                resolve(null);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }

    public stop(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.mHapiServer.stop().then((err) => {
                if (err) {
                    console.error(err);
                    resolve(err.toString());
                    return;
                }
                console.info('Coola is stop!!');
                resolve(null);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }
}
