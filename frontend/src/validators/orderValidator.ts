import Joi from "joi";
import { OrderCourseEnum } from "../enums/OrderCourseEnum";
import { OrderStatusEnum } from "../enums/OrderStatusEnum";
import { OrderCourseFormatEnum } from "../enums/OrderCourseFormatEnum";
import { OrderCourseTypeEnum } from "../enums/OrderCourseTypeEnum";

const updateOrder = Joi.object({
    group: Joi.string().allow('', null).required(),
    status: Joi.string().valid(...Object.values(OrderStatusEnum)).allow('', null).required(),
    name: Joi.string().allow('', null).required(),
    sum: Joi.number().allow('', null).min(0).required(),
    surname: Joi.string().allow('', null).required(),
    alreadyPaid: Joi.number().allow(null, '').min(0).required(),
    email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).allow('', null).required().messages({
        "string.pattern.base" : "Invalid email"
    }),
    course: Joi.string().valid(...Object.values(OrderCourseEnum)).allow('', null).required(),
    phone: Joi.string().allow('', null).required(),
    course_format: Joi.string().valid(...Object.values(OrderCourseFormatEnum)).allow('', null).required(),
    age: Joi.number().allow('', null).min(10).required(),
    course_type: Joi.string().valid(...Object.values(OrderCourseTypeEnum)).allow('', null).required(),
})
export {updateOrder};