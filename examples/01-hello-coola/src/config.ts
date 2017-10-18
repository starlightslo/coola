import { Module } from '../../../src/common';
import { CoolaConfig } from '../../../src/core';

import { Users } from './controllers/users';

@Module({
    controllers: [ Users ]
})
export class Config extends CoolaConfig {
    constructor() {
        super();
    }
}
