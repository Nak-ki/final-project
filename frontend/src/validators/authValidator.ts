import Joi from "joi";

const login= Joi.object({
    email: Joi.string()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .lowercase()
        .trim()
        .required(),
    password: Joi.string()
        .trim()
        .min(5)
        .required(),
    }
)

export {login};