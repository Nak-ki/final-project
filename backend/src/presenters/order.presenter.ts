import { IOrderWithComments } from "../interfaces/order.interface";
import dayjs from "dayjs";
import { commentPresenter } from "./comment.presenter";

class OrderPresenter {
    public OrderPublicInfo(entities: IOrderWithComments[], total: number, limit: number, page: string): {
        data: IOrderWithComments[],
        total: number,
        limit: number,
        page: string
    } {
        return {
            data: entities.map(this.ListOrderResDto),
            total,
            limit,
            page
        }
    }

    public ListOrderResDto(entity: IOrderWithComments): IOrderWithComments {
        return {
            _userId: entity._userId,
            _id: entity._id,
            id: entity.id,
            name: entity.name ? entity.name : null,
            surname: entity.surname ? entity.surname : null,
            email: entity.email ? entity.email : null,
            phone: entity.phone ? entity.phone : null,
            age: entity.age ? entity.age : null,
            course: entity.course ? entity.course : null,
            course_format: entity.course_format ? entity.course_format : null,
            course_type: entity.course_type ? entity.course_type : null,
            sum: entity.sum ? entity.sum : null,
            alreadyPaid: entity.alreadyPaid ? entity.alreadyPaid : null,
            group: entity.group ? entity.group : null,
            status: entity.status ? entity.status : null,
            msg: entity.msg ? entity.msg : null,
            utm: entity.utm ? entity.utm : null,
            created_at: dayjs(entity.created_at).format("MMMM D, YYYY"),
            manager: entity.manager ? entity.manager : null,
            comments:
                entity.comments.length <= 0
                    ? null
                    : entity.comments.map((comment) =>
                        commentPresenter.CommentPublicInfo(comment),
                    ),
        };
    }
}
export const orderPresenter = new OrderPresenter();