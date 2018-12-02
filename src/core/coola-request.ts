import { IRequest } from '../interfaces';
import { Logger } from '../components';


export class CoolaRequest implements IRequest {
    private payload: any;
    private params: any;
    private query: any;

    public readonly services: any = {};
    public readonly logger: Logger;

    constructor(services: any, logger: Logger) {
        this.services = services;
        this.logger = logger;
    }

    public setPayload(payload: any): void {
        this.payload = payload;
    }

    public setParams(params: any): void {
        this.params = params;
    }

    public setQuery(query: any): void {
        this.query = query;
    }

    public getPayload() {
        return this.payload;
    }

    public getParams() {
        return this.params;
    }

    public getQuery() {
        return this.query;
    }

}