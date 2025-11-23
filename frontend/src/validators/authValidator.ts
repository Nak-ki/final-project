import Joi from "joi";

const login= Joi.object({
    email: Joi.string()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .lowercase()
        .trim()
        .required()
        .messages({
            "string.pattern.base" : "Wrong credentials"
        }),
    password: Joi.string()
        .trim()
        .required(),
    }
)

export {login};