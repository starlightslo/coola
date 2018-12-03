import { IRequest } from '../interfaces';
import { Logger } from '../components';


export class CoolaRequest implements IRequest {
    private payload: any;
    private params: any;
    private query: any;
    private method: string;
    private path: string;

    public readonly services: any = {};
    public readonly logger: Logger;
    private variables = {};

    constructor(services: any, logger: Logger) {
        this.services = services;
        this.logger = logger;
    }

    public set(key: string, value: any) {
        this.variables[key] = value;
    }

    public get(key: string): any {
        return this.variables[key];
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

    public setMethod(method: string): void {
        this.method = method;
    }

    public setPath(path: string): void {
        this.path = path;
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

    public getMethod(): string {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }
}