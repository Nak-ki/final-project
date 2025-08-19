import { model, Schema } from "mongoose";
import { User } from "./user.model";
import { Order } from "./order.model";
import { IComment } from "../interfaces/comment.interface";



const CommentSchema = new Schema(
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        body: {type: String, required: true},
        createdAt: {type: String, required: true},

        _orderId: {type: Schema.Types.ObjectId, required: true, ref: Order},
        _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Comment = model<IComment>("comments", CommentSchema);