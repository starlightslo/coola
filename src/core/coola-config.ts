import 'reflect-metadata';

import { Module } from '../common';

@Module({})
export class CoolaConfig {
    private host: string = 'localhost';
    private port: number = 8080;
    private debug: boolean = true;

    constructor() {

    }

    public setHost(host: string): void {
        this.host = host;
    }

    public setPort(port: number): void {
        this.port = port;
    }

    public setDebug(debug: boolean): void {
        this.debug = debug;
    }

    public getHost(): string {
        return this.host;
    }

    public getPort(): number {
        return this.port;
    }

    public getDebug(): boolean {
        return this.debug;
    }
}
