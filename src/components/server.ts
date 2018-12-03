import * as moment from 'moment';

import { IServer } from '../interfaces';
import { ServerConfig, Logger } from '.';
import { SERVICE_METADATA } from '../commons/constants';
import { CoolaException, CoolaError } from '../exceptions';
import { CoolaRequest, CoolaResponse } from '../core';
import { State } from '../enums';

export abstract class Server implements IServer {
    protected readonly config: ServerConfig;
    protected readonly host: string;
    protected readonly port: number;
    protected debug: boolean;

    private preHandlerMiddleware: any;
    private postHandlerMiddleware: any;

    protected services: any = {};
    protected logger: Logger = null;

    constructor(config: ServerConfig) {
        this.config = config;
        this.host = config.getHost();
        this.port = config.getPort();
        this.debug = config.isDebug();

        // Setting logger
        this.logger = new Logger(config.isDebug());
    }

    public setDebug(isDebug: boolean): void {
        this.debug = isDebug;
    }

    public getHost(): string {
        return this.host;
    }

    public getPort(): number {
        return this.port;
    }

    public isDebug(): boolean {
        return this.debug;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
    }

    public getLogger(): Logger {
        return this.logger;
    }

    public addService(service: any): void {
        const serviceName = Reflect.getMetadata(SERVICE_METADATA, service);
        if (!serviceName) {
            throw new Error(CoolaError.MISSING_SERVICE_NAME);
        }
        if (this.services[serviceName]) {
            throw new Error(CoolaError.DUPLICATE_SERVICE_NAME);
        }
        this.services[serviceName] = new service(this.services);
    }

    public setPreHandlerMiddleware(preHandlerMiddleware: any) {
        this.preHandlerMiddleware = preHandlerMiddleware;
    }

    public setPostHandlerMiddleware(postHandlerMiddleware: any) {
        this.postHandlerMiddleware = postHandlerMiddleware;
    }

    protected readonly preHandler = (request: CoolaRequest, response: CoolaResponse): void => {
        if (this.preHandlerMiddleware) {
            this.preHandlerMiddleware(request, response);
        }

        request.set(State.START_TIME, moment());
    }

    protected readonly postHandler = (request: CoolaRequest, response: CoolaResponse): void => {
        if (this.postHandlerMiddleware) {
            this.postHandlerMiddleware(request, response);
        }

        const responseTime = moment().diff(request.get(State.START_TIME));
        this.logger.debug(
            request.getMethod() + ' ' +
            request.getPath() + ' - ' +
            responseTime + 'ms'
        );
    }

    abstract start(): void;
    abstract stop(): void;
    abstract addController(controller: any): void;
}