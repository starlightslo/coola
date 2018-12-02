import { Coola } from '../../../src/core';

import { Config } from './config';
import { Index } from './controllers/index';

async function bootstrap() {
    const coola = new Coola(new Config());
    coola.addController(Index);
    await coola.start();
}
bootstrap();
