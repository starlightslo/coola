import { Coola } from '../../../src/core';

import { Config } from './config';
import { MLogger } from './logger';
import { Index } from './controllers/index';

async function bootstrap() {
    const coola = new Coola(new Config());
    coola.addController(Index);
    coola.setLogger(new MLogger());
    await coola.start();
}
bootstrap();
