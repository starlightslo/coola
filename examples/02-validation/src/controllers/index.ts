import { Controller, Post, RequestValidation, ResponseValidation } from '../../../../src/decorators';
import { CoolaRequest, CoolaResponse } from '../../../../src/core';

import { LoginRequestValidation, LoginResponseValidation } from '../validations/index';

@Controller('/')
export class Index {

    @Post('login')
    @RequestValidation(LoginRequestValidation)
    @ResponseValidation(LoginResponseValidation)
    login(request: CoolaRequest, response: CoolaResponse) {
        const payload = request.getPayload();
        console.log(payload);
        return payload.username;
    }
}
