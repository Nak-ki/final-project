
import { IOrder, IOrderWithComments } from "../interfaces/order.interface";
import { Order } from "../models/order.model";
import { IOrderQuery } from "../interfaces/order-query.interface";
import { OrderListEnum } from "../enums/order-list.enum";
import { FilterQuery } from "mongoose";


class OrderRepository {
    public async getAll(query: IOrderQuery): Promise<[IOrderWithComments[], number, number]> {
        const page = query.page ? query.page : 1
        const skip = 25 * (+page - 1);
        const filterObj: FilterQuery<IOrderQuery> = {};
        if (query.name) {
            filterObj.name = { $regex: query.name, $options: "i" };
        }
        if (query.surname) {
            filterObj.surname = { $regex: query.surname, $options: "i" };
        }
        if (query.email) {
            filterObj.email = { $regex: query.email, $options: "i" };
        }
        if (query.phone) {
            filterObj.phone = { $regex: query.phone, $options: "i" };
        }
        if (query.age) {
            filterObj.age = +query.age;
        }
        if (query.course) {
            filterObj.course = { $regex: query.course, $options: "i" };
        }
        if (query.course_format) {
            filterObj.course_format = { $regex: query.course_format, $options: "i" };
        }
        if (query.course_type) {
            filterObj.course_type = { $regex: query.course_type, $options: "i" };
        }
        if (query.status) {
            filterObj.status = { $regex: query.status, $options: "i" };
        }
        if (query.group) {
            filterObj.group = { $regex: query.group, $options: "i" };
        }
        if (query.start_date) {
            filterObj.created_at = { $gte: query.start_date };
        }
        if (query.end_date) {
            filterObj.created_at = query.start_date ? { $not: {$lt: query.start_date, $lte: query.end_date} } : { $lte: query.end_date };
        }
        if (query.manager) {
            filterObj.manager = query.manager;
        }


        // let sortObject: Record<string, 1 | -1> = {};
        // if (query.order) {
        //     switch (query.order) {
        //         case OrderListEnum.ID:
        //             sortObject = {id: 1};
        //             break;
        //         case OrderListEnum._ID:
        //             sortObject = {id: -1};
        //             break;
        //         case OrderListEnum.NAME:
        //             sortObject = {name: 1};
        //             break;
        //         case OrderListEnum._NAME:
        //             sortObject = {name: -1};
        //             break;
        //         case OrderListEnum.SURNAME:
        //             sortObject = {surname: 1};
        //             break;
        //         case OrderListEnum._SURNAME:
        //             sortObject = {surname: -1};
        //             break;
        //         case OrderListEnum.EMAIL:
        //             sortObject = {email: 1};
        //             break;
        //         case OrderListEnum._EMAIL:
        //             sortObject = {email: -1};
        //             break;
        //         case OrderListEnum.PHONE:
        //             sortObject = {phone: 1};
        //             break;
        //         case OrderListEnum._PHONE:
        //             sortObject = {phone: -1};
        //             break;
        //         case OrderListEnum.AGE:
        //             sortObject = {age: 1};
        //             break;
        //         case OrderListEnum._AGE:
        //             sortObject = {age: -1};
        //             break;
        //         case OrderListEnum.COURSE:
        //             sortObject = {course: 1};
        //             break;
        //         case OrderListEnum._COURSE:
        //             sortObject = {course: -1};
        //             break;
        //         case OrderListEnum.COURSE_FORMAT:
        //             sortObject = {course_format: 1};
        //             break;
        //         case OrderListEnum._COURSE_FORMAT:
        //             sortObject = {course_format: -1};
        //             break;
        //         case OrderListEnum.COURSE_TYPE:
        //             sortObject = {course_type: 1};
        //             break;
        //         case OrderListEnum._COURSE_TYPE:
        //             sortObject = {course_type: -1};
        //             break;
        //         case OrderListEnum.STATUS:
        //             sortObject = {status: 1};
        //             break;
        //         case OrderListEnum._STATUS:
        //             sortObject = {status: -1};
        //             break;
        //         case OrderListEnum.SUM:
        //             sortObject = {sum: 1};
        //             break;
        //         case OrderListEnum._SUM:
        //             sortObject = {sum: -1};
        //             break;
        //         case OrderListEnum.ALREADY_PAID:
        //             sortObject = {alreadyPaid: 1};
        //             break;
        //         case OrderListEnum._ALREADY_PAID:
        //             sortObject = {alreadyPaid: -1};
        //             break;
        //         case OrderListEnum.GROUP:
        //             sortObject = {group: 1};
        //             break;
        //         case OrderListEnum._GROUP:
        //             sortObject = {group: -1};
        //             break;
        //         case OrderListEnum.CREATED_AT:
        //             sortObject = {created_at: 1};
        //             break;
        //         case OrderListEnum._CREATED_AT:
        //             sortObject = {created_at: -1};
        //             break;
        //         case OrderListEnum.MANAGER:
        //             sortObject = {manager: 1};
        //             break;
        //         case OrderListEnum._MANAGER:
        //             sortObject = {manager: -1};
        //             break;
        //     }
        // }
        let sortObject: { [key: string]: 1 | -1 } = {};
        if (query.order) {
            switch (query.order) {
                case OrderListEnum.ID:
                    sortObject.id = 1;
                    break;
                case OrderListEnum._ID:
                    sortObject.id = -1;
                    break;
                case OrderListEnum.NAME:
                    sortObject.name = 1;
                    break;
                case OrderListEnum._NAME:
                    sortObject.name = -1;
                    break;
                case OrderListEnum.SURNAME:
                    sortObject.surname = 1;
                    break;
                case OrderListEnum._SURNAME:
                    sortObject.surname = -1;
                    break;
                case OrderListEnum.EMAIL:
                    sortObject.email = 1;
                    break;
                case OrderListEnum._EMAIL:
                    sortObject.email = -1;
                    break;
                case OrderListEnum.PHONE:
                    sortObject.phone = 1;
                    break;
                case OrderListEnum._PHONE:
                    sortObject.phone = -1;
                    break;
                case OrderListEnum.AGE:
                    sortObject.age = 1;
                    break;
                case OrderListEnum._AGE:
                    sortObject.age = -1;
                    break;
                case OrderListEnum.COURSE:
                    sortObject.course = 1;
                    break;
                case OrderListEnum._COURSE:
                    sortObject.course = -1;
                    break;
                case OrderListEnum.COURSE_FORMAT:
                    sortObject.course_format = 1;
                    break;
                case OrderListEnum._COURSE_FORMAT:
                    sortObject.course_format = -1;
                    break;
                case OrderListEnum.COURSE_TYPE:
                    sortObject.course_type = 1;
                    break;
                case OrderListEnum._COURSE_TYPE:
                    sortObject.course_type = -1;
                    break;
                case OrderListEnum.STATUS:
                    sortObject.status = 1;
                    break;
                case OrderListEnum._STATUS:
                    sortObject.status = -1;
                    break;
                case OrderListEnum.SUM:
                    sortObject.sum = 1;
                    break;
                case OrderListEnum._SUM:
                    sortObject.sum = -1;
                    break;
                case OrderListEnum.ALREADY_PAID:
                    sortObject.alreadyPaid = 1;
                    break;
                case OrderListEnum._ALREADY_PAID:
                    sortObject.alreadyPaid = -1;
                    break;
                case OrderListEnum.GROUP:
                    sortObject.group = 1;
                    break;
                case OrderListEnum._GROUP:
                    sortObject.group = -1;
                    break;
                case OrderListEnum.CREATED_AT:
                    sortObject.created_at = 1;
                    break;
                case OrderListEnum._CREATED_AT:
                    sortObject.created_at = -1;
                    break;
                case OrderListEnum.MANAGER:
                    sortObject.manager = 1;
                    break;
                case OrderListEnum._MANAGER:
                    sortObject.manager = -1;
                    break;
            }
        }
        else {
            sortObject.id = -1;
        }
        // return await Order.find().skip(skip).sort(sortObject).limit(25)
        return Promise.all([
            await Order.aggregate([
                {
                    $match: filterObj ? filterObj : {}
                },
                {
                    $lookup: {
                        from: "comments",
                        let: { orderId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_orderId", "$$orderId"] } } },
                            { $sort: { createdAt: -1 } },
                            { $limit: 3}
                        ],
                        as: "comments",
                    },
                },
                {
                    $sort: sortObject
                },
                {
                    $skip: skip
                },
                {
                    $limit: 25
                }
            ]),
            Order.countDocuments(filterObj),
            25
        ])
    }

    public async getById(orderId: string): Promise<IOrder | null> {
        return await Order.findById(orderId);
    }

    public async updateById(dto: Partial<IOrder>): Promise<IOrder> {
        return await Order.findByIdAndUpdate(dto._id, dto, {new: true} );
    }

    public async updateOrder(dto: Partial<IOrder>): Promise<IOrder> {
        return await Order.findByIdAndUpdate(dto._id, dto, {new: true} );
    }

}

export const orderRepository = new OrderRepository();

