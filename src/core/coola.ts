import 'reflect-metadata';

import { CoolaConfig } from './coola-config';
import { ServerType } from '../enums';
import { HapiServer, KoaServer, Logger } from '../components';

export class Coola {
    private readonly mServer: HapiServer | KoaServer;
    private config: CoolaConfig = new CoolaConfig();

    constructor(config?: CoolaConfig) {
        // Replacing the config if existing
        if (config) {
            this.config = config;
        }

        // Setup Server
        switch (this.config.getServerType()) {
            case ServerType.Hapi:
                this.mServer = new HapiServer(this.config);
                break;
            case ServerType.Koa:
                this.mServer = new KoaServer(this.config);
                break;
            default:
                this.mServer = new HapiServer(this.config);
        }
    }

    public addController(controller: any): void {
        this.mServer.addController(controller);
    }

    public setPreHandlerMiddleware(preHandlerMiddleware: any): void {
        this.mServer.setPostHandlerMiddleware(preHandlerMiddleware);
    }

    public setPostHandlerMiddleware(postHandlerMiddleware: any): void {
        this.mServer.setPostHandlerMiddleware(postHandlerMiddleware);
    }

    public async start(): Promise<void> {
        await this.mServer.start();
        this.mServer.getLogger().info('-----------------------------------------------------');
        this.mServer.getLogger().info('Coola is running at: ' + this.mServer.getHost() + ':' + this.mServer.getPort());
        this.mServer.getLogger().info('-----------------------------------------------------');
    }

    public async stop(): Promise<void> {
        await this.mServer.stop();
        this.mServer.getLogger().info('Coola is stop!!');
    }

    public setLogger(logger: Logger) {
        this.mServer.setLogger(logger);
    }

}
