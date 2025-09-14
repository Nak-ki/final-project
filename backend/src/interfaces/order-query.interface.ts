import { OrderListEnum } from "../enums/order-list.enum";
import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";

export interface IOrderQuery{
    page: string,
    order: OrderListEnum,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: string,
    course: OrderCourseEnum,
    course_format: OrderCourseFormatEnum,
    course_type: OrderCourseTypeEnum,
    status: OrderStatusEnum,
    group: string,
    start_date: string,
    end_date: string,
    manager: string,

}