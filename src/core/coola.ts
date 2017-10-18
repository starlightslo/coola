import 'reflect-metadata';

import * as Hapi from 'hapi';

import { CoolaConfig } from './coola-config';
import { CoolaRequestReply } from './coola-request-reply';
import { Logger } from './logger';
import { Utils } from '../common';
import { metadata, PATH_METADATA, METHOD_METADATA } from '../common/constants';
import { RequestMethod } from '../common/enums/request-method';

export class Coola {
    private mHapiServer = new Hapi.Server();
    private logger: Logger = null;

    constructor(config?: CoolaConfig) {
        if (!config) {
            config = new CoolaConfig();
        }

        // Setting logger
        this.logger = new Logger(config.getDebug());

        this.mHapiServer.connection({
            host: config.getHost(),
            port: config.getPort()
        });

        const controllers = Reflect.getMetadata(metadata.CONTROLLERS, config.constructor);
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
            if (method !== undefined) {
                this.logger.info('  - [' + method + '] ' + path);
                this.addRoute(path, method, _controller[func]);
            }
        });
    }

    private addRoute(path: string, method: Hapi.HTTP_METHODS_PARTIAL, func: any) {
        this.mHapiServer.route({
            path: path,
            method: method,
            config: {
                handler: (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
                    const coolaRequestReply = new CoolaRequestReply(request, reply);
                    func(coolaRequestReply);
                }
            }
        });
    }

    public start(): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.mHapiServer.start((err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.info('Coola is running at: ' + this.mHapiServer.info.uri);
                resolve({});
            })
        });
    }
}
