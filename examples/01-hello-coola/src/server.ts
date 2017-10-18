import { Coola } from '../../../src/core';

import { Config } from './config';

async function bootstrap() {
    const config = new Config();
    config.setPort(8081);

    const coola = new Coola(config);
    await coola.start();
}
bootstrap();
