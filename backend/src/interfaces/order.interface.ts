import {OrderCourseTypeEnum} from "../enums/order-course-type.enum";
import {OrderCourseFormatEnum} from "../enums/order-course-format.enum";
import {OrderCourseEnum} from "../enums/order-course.enum";
import {OrderStatusEnum} from "../enums/order-status.enum";
import { IComment } from "./comment.interface";

export interface IOrder{
    id: number,
    _id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course: OrderCourseEnum,
    _userId: string
    course_format: OrderCourseFormatEnum,
    course_type: OrderCourseTypeEnum,
    status: OrderStatusEnum,
    sum: number,
    alreadyPaid: number,
    group: string,
    created_at: string
    manager: string,
    utm: string,
    msg: string
}

export interface IOrderWithComments extends IOrder{
    comments: IComment[];
}
