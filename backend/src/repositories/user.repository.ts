
import { IDataUser, IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { IUserQuery } from "../interfaces/user-query.interface";
import { OrderStatusEnum } from "../enums/order-status.enum";

class UserRepository {

    public async create(dto: Partial<IUser>, lastId: number): Promise<IUser> {
        return await User.create({...dto, id: lastId});
    }

    public async getAll(query: IUserQuery): Promise<[IDataUser[], number, number]> {
        const skip = 25 * (+query.page - 1);
        return await Promise.all([
        //     await User.find().sort({createdAt: -1}).skip(skip).limit(25),
        //     User.countDocuments(),
        //     25
            User.aggregate([
                {
                    $lookup: {
                        from: "orders",
                        let: { userId: "$_id" },
                        as: "total",
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        let: { userId: "$_id" },
                        as: "aggre",
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                            { $match: { status: { $eq: OrderStatusEnum.AGGRE } } }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        let: { userId: "$_id" },
                        as: "disaggre",
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                            { $match: { status: { $eq: OrderStatusEnum.DISAGGRE } } }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        let: { userId: "$_id" },
                        as: "in_work",
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                            { $match: { status: { $eq: OrderStatusEnum.IN_WORK } } }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        let: { userId: "$_id" },
                        as: "dubbing",
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                            { $match: { status: { $eq: OrderStatusEnum.DUBBING } } }
                        ]
                    }
                },
                {
                    $sort: {createdAt: -1}
                },
                {
                    $skip: skip,
                }
            ]).limit(25),
            User.countDocuments(),
            25
        ])
    }

    public async getById(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select("+password");
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, { new: true });
    }

    public async updateLastLogin(userId: string, last_login: string): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, {last_login}, { new: true });
    }

    public async getLastIdUser(): Promise<number> {
        const [user] = await User.find().sort({id: -1}).limit(1)
        return user.id
    }


}

export const userRepository = new UserRepository();
