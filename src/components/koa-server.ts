import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { Server, ServerConfig } from './';
import { PATH_METADATA, METHOD_METADATA } from '../commons/constants';
import { RequestMethod } from '../enums';
import { CoolaRequest, CoolaResponse } from '../core';
import { CoolaException } from '../exceptions';

export class KoaServer extends Server {
    private readonly mServer = new Koa();

    constructor(config: ServerConfig) {
        super(config);

        this.mServer.use(bodyParser());
    }
    start(): void {
        this.mServer.listen(this.config.getPort());
    }
    stop(): void {

    }
    addController(controller: any): void {
        const router: Router = new Router();
        const basePath = Reflect.getMetadata(PATH_METADATA, controller);
        router.prefix(basePath);

        const controllerInstance = new controller();
        Object.getOwnPropertyNames(controller.prototype).forEach((func) => {
            const path: string = Reflect.getMetadata(PATH_METADATA, controller.prototype[func]);
            const requestMethods: RequestMethod[] = Reflect.getMetadata(METHOD_METADATA, controller.prototype[func]);
            const methods: string[] = [];
            if (requestMethods) {
                requestMethods.forEach((method: RequestMethod) => {
                    switch (method) {
                        case RequestMethod.GET:
                            methods.push('get');
                            break;
                        case RequestMethod.POST:
                            methods.push('post');
                            break;
                        case RequestMethod.PUT:
                            methods.push('put');
                            break;
                        case RequestMethod.PATCH:
                            methods.push('patch');
                            break;
                        case RequestMethod.DELETE:
                            methods.push('delete');
                            break;
                    }
                });
            }
            this.addRoute(router, path, methods, controllerInstance[func]);
        });
        this.mServer.use(router.routes());
    }

    private addRoute(router: Router, path: string, methods: string[], func) {
        if (!router) { return; }
        if (!path) { path = ''; }
        if (methods.length === 0) { return; }
        if (!func) { return; }

        router.register(path, methods, (ctx: Router.IRouterContext, next: () => Promise<any>) => {
            const coolaRequest = new CoolaRequest(this.services, this.logger);
            coolaRequest.setPayload(ctx.request.body);
            coolaRequest.setParams(ctx.params);
            coolaRequest.setQuery(ctx.request.query);
            coolaRequest.setMethod(ctx.method);
            coolaRequest.setPath(ctx.path);

            const coolaResponse = new CoolaResponse();


            this.preHandler(coolaRequest, coolaResponse);
            let message = '';
            try {
                message = func(coolaRequest, coolaResponse);
            } catch (err) {
                this.errorHandler(err);
            }
            this.postHandler(coolaRequest, coolaResponse);
            ctx.body = message;
        });
    }

    private errorHandler(err) {
        if (err instanceof CoolaException) {
            throw err;
        } else {
            throw err;
        }
    }
}