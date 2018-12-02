export interface IResponse {
    setStatusCode(statusCode: number): IResponse;
    getStatusCode(): number;
}
