import { expect } from 'chai';
import * as chai from 'chai';

import { Coola } from '../../src/core';

describe('Core', () => {
    const coola = new Coola();

    beforeEach(async () => {

    });

    describe('Coola start', async () => {
        it('should set global path', async () => {
            await coola.start();
        });
    });

    afterEach(async () => {
        await coola.stop();
    });
});
