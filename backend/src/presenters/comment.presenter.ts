import { IComment } from "../interfaces/comment.interface";
import dayjs from "dayjs";

class CommentPresenter {
    public CommentPublicInfo (entity: IComment) : IComment{
        return {
            _id: entity._id,
            _orderId: entity._orderId,
            _userId: entity._userId,
            body: entity.body,
            date: dayjs(entity.createdAt).format('MMMM D, YYYY'),
            name: entity.name,
            surname: entity.surname,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,

        }
    }
}

export const commentPresenter = new CommentPresenter();