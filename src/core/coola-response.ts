import { IResponse } from '../interfaces';

export class CoolaResponse implements IResponse {
    private statusCode: number;
    private data: any;

    constructor() {

    }

    public setStatusCode(statusCode: number): IResponse {
        this.statusCode = statusCode;
        return this;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }
}