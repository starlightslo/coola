import 'reflect-metadata';

import { ServerConfig } from '../components/server-config';
import { ServerType } from '../enums/server-type';

export class CoolaConfig extends ServerConfig {
    private readonly serverType: ServerType = ServerType.Hapi;

    constructor(serverType?: ServerType, host?: string, port?: number) {
        super(host, port);
        this.serverType = serverType;
    }

    public getServerType(): ServerType {
        return this.serverType;
    }
}
