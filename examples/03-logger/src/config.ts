import { Module } from '../../../src/common';
import { CoolaConfig } from '../../../src/core';

import { Index } from './controllers/index';

@Module({
    controllers: [ Index ]
})
export class Config extends CoolaConfig {
    constructor() {
        super();
    }
}
