import { Controller, Get, Post, Patch } from '../../../../src/common';
import { Coola, CoolaRequestReply } from '../../../../src/core';

@Controller('user')
export class Users {

    @Get('/list')
    getAll(crr: CoolaRequestReply) {
        crr.reply(['user 1', 'user 2']);
    }
}
