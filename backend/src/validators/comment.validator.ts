import Joi from "joi";


export class CommentValidator {

    public static CreateComment : Joi.ObjectSchema = Joi.object({
        body: Joi.string().min(5).max(255).trim().required(),
    });

}