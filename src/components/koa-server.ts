import * as Koa from 'koa';
import * as Router from 'koa-router';

import { Server, ServerConfig } from './';

export class KoaServer extends Server {
    private readonly mServer = new Koa();

    constructor(config: ServerConfig) {
        super(config);
    }
    start(): void {
        throw new Error('Method not implemented.');
    }
    stop(): void {
        throw new Error('Method not implemented.');
    }
    addController(controller: any): void {
        throw new Error('Method not implemented.');
    }
    addService(service: any): void {
        throw new Error('Method not implemented.');
    }
}