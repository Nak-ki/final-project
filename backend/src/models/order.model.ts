import { model, Schema } from "mongoose";
import { User } from "./user.model";
import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { IOrder } from "../interfaces/order.interface";

const OrderSchema = new Schema(
    {
        id: {type: Number, unique: true},
        name: {type: String},
        surname: {type: String},
        email: {type: String},
        phone: {type: String},
        age: {type: Number},
        course: {type: String, enum: OrderCourseEnum},
        course_format: {type: String, enum: OrderCourseFormatEnum},
        course_type: {type: String, enum: OrderCourseTypeEnum},
        status: {type: String, enum: OrderStatusEnum},
        sum: {type: Number},
        alreadyPaid: {type: Number},
        group: {type: String},
        created_at: {type: String},
        manager: {type: String},
        utm: {type: String},
        msg: {type: String},

        _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Order = model<IOrder>("orders", OrderSchema);