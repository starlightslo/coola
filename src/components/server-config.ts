import { IServerConfig } from '../interfaces';

export abstract class ServerConfig implements IServerConfig {
    protected readonly host: string = 'localhost';
    protected readonly port: number = 8080;
    protected debug: boolean = true;

    constructor(host?: string, port?: number) {
        if (host) {
            this.host = host;
        }
        if (port) {
            this.port = port;
        }
        this.debug = true;
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
}