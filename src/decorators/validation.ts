import 'reflect-metadata';

import { REQUEST_VALIDATION, RESPONSE_VALIDATION } from '../commons/constants';

export const RequestValidation = (validation: any): MethodDecorator => {
    return (target, key, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(REQUEST_VALIDATION, validation, descriptor.value);
        return descriptor;
    };
};

export const ResponseValidation = (validation: any): MethodDecorator => {
    return (target, key, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(RESPONSE_VALIDATION, validation, descriptor.value);
        return descriptor;
    };
};
