import { Coola } from '../../../src/core';

import { Config } from './config';
import { MLogger } from './logger';

async function bootstrap() {
    const coola = new Coola(new Config());
    const err = await coola.start();

    coola.setLogger(new MLogger());
}
bootstrap();
