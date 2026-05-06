import Joi from "joi";

const createUser = Joi.object({
    name: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required().messages({
        "string.pattern.base" : "Invalid email"
    }),
})
export {createUser};