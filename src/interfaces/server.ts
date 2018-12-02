export interface IServer {
    start(): void;
    stop(): void;
    addController(controller: any): void;
    addService(service: any): void;
}
