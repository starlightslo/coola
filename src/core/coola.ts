import 'reflect-metadata';

import * as moment from 'moment';

import { CoolaConfig } from './coola-config';
import { ServerType } from '../enums';
import { HapiServer, KoaServer, Logger } from '../components';

export class Coola {
    private readonly mServer: HapiServer | KoaServer;
    private config: CoolaConfig = new CoolaConfig();

    constructor(config?: CoolaConfig) {
        // Replacing the config if existing
        if (config) {
            this.config = config;
        }

        // Setup Server
        switch (this.config.getServerType()) {
            case ServerType.Hapi:
                this.mServer = new HapiServer(this.config);
                break;
            case ServerType.Koa:
                this.mServer = new KoaServer(this.config);
                break;
            default:
                this.mServer = new HapiServer(this.config);
        }
    }

    public addController(controller: any): void {
        this.mServer.addController(controller);
    }

    /*
    private handleControllers(): void {
        const controllers = Reflect.getMetadata(metadata.CONTROLLERS, this.config.constructor);
        if (!controllers) { return; }

        controllers.forEach((controller) => {
            const basePath = Utils.setURLPrefix(Reflect.getMetadata(PATH_METADATA, controller));
            this.logger.info('Adding controller [' + controller.name + ']: ' + 'route path: ' + basePath);
            this.addController(basePath, controller);
        });
    }

    private addController(basePath: string, controller: any): void {
        const _controller = new controller();
        Object.getOwnPropertyNames(controller.prototype).forEach((func) => {
            const path = Reflect.getMetadata(PATH_METADATA, controller.prototype[func]);
            const method = Utils.getRequestMethodString(Reflect.getMetadata(METHOD_METADATA, controller.prototype[func]));
            const requestValidation = Reflect.getMetadata(REQUEST_VALIDATION, controller.prototype[func]);
            const responseValidation = Reflect.getMetadata(RESPONSE_VALIDATION, controller.prototype[func]);
            const actualPath = (!path) ? basePath : basePath + ((basePath === '/') ? Utils.removeURLPrefix(path) : Utils.setURLPrefix(path));
            if (method !== undefined) {
                this.logger.info('  - [' + method + '] ' + actualPath);
                this.addRoute(actualPath, method, _controller[func], requestValidation, responseValidation);
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
                    const coolaRequestReply = new CoolaRequestReply(this, request, reply);
                    this.preHandlerMiddleware(coolaRequestReply);
                    func(coolaRequestReply);
                    this.postHandlerMiddleware(coolaRequestReply);
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
    */

    public setPreHandlerMiddleware(preHandlerMiddleware: any): void {
        // this.preHandlerMiddleware = preHandlerMiddleware;
    }

    public setPostHandlerMiddleware(postHandlerMiddleware: any): void {
        // this.postHandlerMiddleware = postHandlerMiddleware;
    }

    public async start(): Promise<void> {
        await this.mServer.start();
        this.mServer.getLogger().info('-----------------------------------------------------');
        this.mServer.getLogger().info('Coola is running at: ' + this.mServer.getHost() + ':' + this.mServer.getPort());
        this.mServer.getLogger().info('-----------------------------------------------------');
    }

    public async stop(): Promise<void> {
        await this.mServer.stop();
        this.mServer.getLogger().info('Coola is stop!!');
    }

    public setLogger(logger: Logger) {
        this.mServer.setLogger(logger);
    }

    private readonly preHandlerMiddleware = (): void => {
        // coolaRequestReply.set(State.START_TIME, moment());
    }

    private readonly postHandlerMiddleware = (): void => {
        // const responseTime = moment().diff(coolaRequestReply.get(State.START_TIME));
        /*
        this.logger.debug(
            coolaRequestReply.getRequest().method + ' ' +
            coolaRequestReply.getRequest().path + ' - ' +
            responseTime + 'ms'
        );
        */
    }

}
