export interface IRequest {
    setPayload(payload: any): void;
    setParams(params: any): void;
    setQuery(query: any): void;
    setMethod(method: string): void;
    setPath(path: string): void;
    getPayload(): any;
    getParams(): any;
    getQuery(): any;
    getMethod(): string;
    getPath(): string;
}
