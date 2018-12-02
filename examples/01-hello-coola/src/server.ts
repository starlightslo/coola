import { Coola } from '../../../src/core';

import { Config } from './config';
import { Users } from './controllers/users';

async function bootstrap() {
    const coola = new Coola(new Config());
    coola.addController(Users);
    await coola.start();
}
bootstrap();
