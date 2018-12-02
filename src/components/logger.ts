import * as moment from 'moment';
import * as colors from 'colors';
import { ILogger } from '../interfaces';

export class Logger implements ILogger {
    private isDebug: boolean = true;

    constructor(isDebug: boolean) {
        this.isDebug = isDebug;
    }

    public debug(data: any): void {
        if (this.isDebug) { console.log(moment().format('YYYY-MM-DD hh:mm:ss.SSS') + ' DEBUG ' + data); }
    }

    public trace(data: any): void {
        if (this.isDebug) { console.trace(data); }
    }

    public info(data: any): void {
        if (this.isDebug) { console.info(moment().format('YYYY-MM-DD hh:mm:ss.SSS') + colors.green(' INFO ') + data); }
    }

    public warn(data: any): void {
        if (this.isDebug) { console.warn(moment().format('YYYY-MM-DD hh:mm:ss.SSS') + colors.yellow(' WARN ') + data); }
    }

    public error(data: any): void {
        console.error(moment().format('YYYY-MM-DD hh:mm:ss.SSS') + colors.red(' ERROR ') + data);
    }

    public fatal(data: any): void {
        console.error(moment().format('YYYY-MM-DD hh:mm:ss.SSS') + colors.red(' FATAL ') + data);
    }
}
