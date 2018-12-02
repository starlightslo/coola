
export interface IServerConfig {
    setDebug(isDebug: boolean): void;

    getHost(): string;
    getPort(): number;
    isDebug(): boolean;
}