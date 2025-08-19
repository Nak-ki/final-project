import Joi from "joi";

import { IUser } from "../interfaces/user.interface";

export class AuthValidator {

    public static SignIn: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
        email: Joi.string()
            .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .lowercase()
            .trim()
            .required(),
        password: Joi.string()
            .trim()
            .min(5)
            .required(),
    });

    public static CheckPassword: Joi.ObjectSchema = Joi.object({
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .trim()
            .required()
            .messages({
                "string.pattern.base": " min length 8, at least 1 number, at least 1 Uppercase, at least 1 lowercase"
            }),
        confirm_password: Joi.string()
            .trim()
            .valid(Joi.ref('password'))
            .required()
            .messages({
            'any.only': 'Passwords do not match', // Custom message for this specific validation failure
        }),
    });

}