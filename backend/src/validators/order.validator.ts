import Joi from "joi";
import { OrderListEnum } from "../enums/order-list.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";



export class OrderValidator {

    public static OrderQuery  = Joi.object({
        page: Joi.number().min(1).default(1),
        order: Joi.string().valid(...Object.values(OrderListEnum)),
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
        age: Joi.string(),
        course: Joi.string().valid(...Object.values(OrderCourseEnum)),
        course_format: Joi.string().valid(...Object.values(OrderCourseFormatEnum)),
        course_type: Joi.string().valid(...Object.values(OrderCourseTypeEnum)),
        status: Joi.string().valid(...Object.values(OrderStatusEnum)),
        group: Joi.string(),
        start_date: Joi.string(),
        end_date: Joi.string(),
        manager: Joi.string(),

    });

    public static OrderBody = Joi.object({
        group: Joi.string().allow('', null).required(),
        status: Joi.string().valid(...Object.values(OrderStatusEnum)).allow('', null).required(),
        name: Joi.string().allow('', null).required(),
        sum: Joi.number().allow('', null).required(),
        surname: Joi.string().allow('', null).required(),
        alreadyPaid: Joi.number().allow(null, '').required(),
        email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).allow('', null).required(),
        course: Joi.string().valid(...Object.values(OrderCourseEnum)).allow('', null).required(),
        phone: Joi.string().allow('', null).required(),
        course_format: Joi.string().valid(...Object.values(OrderCourseFormatEnum)).allow('', null).required(),
        age: Joi.number().allow('', null).required(),
        course_type: Joi.string().valid(...Object.values(OrderCourseTypeEnum)).allow('', null).required(),
    })

}