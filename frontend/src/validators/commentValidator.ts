import Joi from "joi";

const comment= Joi.object({
    body: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required().messages({
            "string.min": "min 5 characters",
            "string.max": "max 235 characters",
            "any.required": "The comment is required",
        })
})

export {comment};