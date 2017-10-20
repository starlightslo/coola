import { Controller, Post, RequestValidation, ResponseValidation } from '../../../../src/common';
import { Coola, CoolaRequestReply } from '../../../../src/core';

import { LoginRequestValidation, LoginResponseValidation } from '../validations/index';

@Controller('/')
export class Index {

    @Post('login')
    @RequestValidation(LoginRequestValidation)
    @ResponseValidation(LoginResponseValidation)
    login(crr: CoolaRequestReply) {
        crr.reply('OK');
    }
}
