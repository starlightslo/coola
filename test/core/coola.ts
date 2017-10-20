import { expect } from 'chai';
import * as chai from 'chai';

import { Coola } from '../../src/core';

describe('Core', () => {
    const coola = new Coola();

    beforeEach((done) => {
        done();
    });

    describe('Coola start', () => {
        it('should set global path', (done) => {
            coola.start().then((err) => {
                expect(err).to.be.null;
                done();
            });
        });
    });

    afterEach((done) => {
        coola.stop().then((err) => {
            expect(err).to.be.null;
            done();
        });
    });
});
