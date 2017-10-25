import * as Hapi from 'hapi';
import { Coola, Logger } from './';

export class CoolaRequestReply {
    private _coola: Coola;
    private _request: Hapi.Request;
    private _reply: Hapi.ReplyNoContinue;
    public log: Logger;

    private isSend: boolean = false;
    private _code: number = 200;
    private variables = {};

    constructor(coola: Coola, request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        this._coola = coola;
        this._request = request;
        this._reply = reply;
        this.log = this._coola.getLogger();
    }

    public set(key: string, value: any) {
        this.variables[key] = value;
    }

    public get(key: string): any {
        return this.variables[key];
    }

    public getPayload(): any {
        return this._request.payload;
    }

    public getParams(): any {
        return this._request.params;
    }

    public getQuery(): any {
        return this._request.query;
    }

    public code(statusCode: number): CoolaRequestReply {
        this._code = statusCode;
        return this;
    }

    public getRequest(): Hapi.Request {
        return this._request;
    }

    public getReply(): Hapi.ReplyNoContinue {
        return this._reply;
    }

    public reply(payload: any, statusCode?: number): void {
        // Prevent send twice
        if (this.isSend) { return; }

        if (statusCode) {
            this._code = statusCode;
        }

        this._reply(payload).code(this._code);
        this.isSend = true;
    }
}
