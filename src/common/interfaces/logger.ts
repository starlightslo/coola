export interface ILogger {
    debug(data: string): void;
    trace(data: string): void;
    info(data: string): void;
    warn(data: string): void;
    error(data: string): void;
    fatal(data: string): void;
}
