import { Logger } from '../../../src/components';

export class MLogger extends Logger {
    constructor() {
        super(true);
    }

    public info(data) {
        super.info(data);
        console.log('This is my custom logger>>> ' + data);
    }
}
