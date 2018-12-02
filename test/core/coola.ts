import { expect } from 'chai';
import * as chai from 'chai';

import { Coola } from '../../src/core';

describe('Core', () => {
    const coola = new Coola();

    beforeEach(async () => {

    });

    describe('Coola start', async () => {
        it('should set global path', async () => {
            const result = await coola.start();
            expect(result).to.be.true;
        });
    });

    afterEach(async () => {
        await coola.stop();
    });
});
