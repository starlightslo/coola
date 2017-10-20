import { Coola } from '../../../src/core';

import { Config } from './config';

async function bootstrap() {
    const coola = new Coola(new Config());
    const err = await coola.start();
}
bootstrap();
