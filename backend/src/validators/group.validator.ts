import Joi from "joi";



export class GroupValidator {

    public static GroupDTO = Joi.object({
        name: Joi.string().min(5).max(20).trim().required()
    })

}