import { Controller, Get } from '../../../../src/decorators';
import { CoolaRequest, CoolaResponse } from '../../../../src/core';

@Controller()
export class Index {
    @Get()
    login(request: CoolaRequest, response: CoolaResponse) {
        request.logger.info('Hello Coola');
        return 'Hello Coola';
    }

}
