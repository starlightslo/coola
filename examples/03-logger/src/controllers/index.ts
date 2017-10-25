import { Controller, Get, RequestValidation, ResponseValidation } from '../../../../src/common';
import { Coola, CoolaRequestReply } from '../../../../src/core';

@Controller()
export class Index {
    private a = false;

    @Get()
    login(crr: CoolaRequestReply) {
        crr.log.info('Hello Coola');
        crr.reply('Hello Coola');
    }

}
