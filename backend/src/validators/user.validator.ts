import Joi from "joi";
import { IUser } from "../interfaces/user.interface";

export class UserValidator {

    public static createUser: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
        email: Joi.string()
            .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .lowercase()
            .trim()
            .required(),
        name: Joi.string().min(3).max(15).trim().required(),
        surname: Joi.string()
            .trim()
            .required(),

    });

}