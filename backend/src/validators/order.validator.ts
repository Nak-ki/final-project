import Joi from "joi";
import { OrderListEnum } from "../enums/order-list.enum";



export class OrderValidator {

    public static OrderQuery : Joi.ObjectSchema = Joi.object({
        page: Joi.number().default(1),
        order: Joi.string().valid(...Object.values(OrderListEnum)),

    });

}