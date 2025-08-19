import { ITokenPayload } from "../interfaces/token.interface";
import { IComment } from "../interfaces/comment.interface";
import { userRepository } from "../repositories/user.repository";
import { orderRepository } from "../repositories/order.repository";
import dayjs from "dayjs";
import { commentRepository } from "../repositories/comment.repository";
import { OrderStatusEnum } from "../enums/order-status.enum";


class CommentService{
    public async createComment(orderId: string, jwtPayload: ITokenPayload, dto: {body: string}): Promise<IComment> {
        const user = await userRepository.getById(jwtPayload.userId)
        const order = await orderRepository.getById(orderId)

        const createdAt = dayjs().format('MMMM D, YYYY')

        const comment = await commentRepository.createComment({name: user.name, surname: user.surname,
        body: dto.body, createdAt, _orderId: order._id, _userId: user._id})

        if (order.status === OrderStatusEnum.NEW || !order.status ){
            await orderRepository.updateById({_id: order._id, manager: user.name, status: OrderStatusEnum.IN_WORK, _userId:user._id})
        }



        return comment;
    }

}

export const  commentService = new  CommentService();