import { IComment } from "./IComment";

export interface IOrder{
    id: number,
    _id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course: string,
    _userId: string
    course_format: string,
    course_type: string,
    status: string,
    sum: number,
    alreadyPaid: number,
    group: string,
    created_at: string
    manager: string,
    utm: string,
    msg: string
}

export type IUpdateOrder = Pick<IOrder, "email" | "name" | "surname" | "age" | "alreadyPaid" | "course" | "course_format" | "course_type" | "phone" | "status" | "sum" | "group">;

export interface IOrderWithComments extends IOrder{
    comments: IComment[];
}
