import 'reflect-metadata';

import { PATH_METADATA } from '../commons/constants';

export function Controller(prefix?: string): ClassDecorator {
    let path = prefix ? prefix : '/';
    if (path.indexOf('/') !== 0) {
        path = '/' + path;
    }

    return (target: object) => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}
