import 'reflect-metadata';

import { PATH_METADATA } from '../constants';

export function Controller(prefix?: string): ClassDecorator {
    const path = prefix ? prefix : '/';

    return (target: object) => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}
