
export class Logger {
    private isDebug: boolean = true;

    constructor(isDebug: boolean) {
        this.isDebug = isDebug;
    }

    public info(data: string): void {
        if (this.isDebug) console.info(data);
    }

    public warn(data: string): void {
        if (this.isDebug) console.warn(data);
    }

    public error(data: string): void {
        console.error(data);
    }
}
