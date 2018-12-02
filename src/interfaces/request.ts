export interface IRequest {
    setPayload(payload: any): void;
    setParams(params: any): void;
    setQuery(query: any): void;
    getPayload(): any;
    getParams(): any;
    getQuery(): any;
}
