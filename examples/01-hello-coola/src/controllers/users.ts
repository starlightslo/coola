import { Controller, Get } from '../../../../src/decorators';
import { CoolaRequest, CoolaResponse } from '../../../../src/core';

@Controller('user')
export class Users {

    @Get('/list')
    getAll(request: CoolaRequest, response: CoolaResponse) {
        return [{ id: 1, name: 'AAA' }, { id: 2, name: 'BBB' }];
    }
}
