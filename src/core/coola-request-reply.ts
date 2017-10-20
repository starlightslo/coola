import * as Hapi from 'hapi';

export class CoolaRequestReply {
    private _request: Hapi.Request;
    private _reply: Hapi.ReplyNoContinue;

    private isSend: boolean = false;
    private _code: number = 200;

    constructor(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        this._request = request;
        this._reply = reply;
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

    public reply(payload: any, statusCode?: number): void {
        // Prevent send twice
        if (this.isSend) return;

        if (statusCode) {
            this._code = statusCode;
        }

        this._reply(payload).code(this._code);
        this.isSend = true;
    }
}
