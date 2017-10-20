import * as Joi from 'joi';

export const LoginRequestValidation = {
    payload: {
        username: Joi.string().required().description('This should be an email.'),
        password: Joi.string().required().description('The length between 8-16.'),
    }
};

export const LoginResponseValidation = {
    status: {
        200: Joi.string().required(),
    }
};
