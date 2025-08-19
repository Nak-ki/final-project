
import { IComment } from "../interfaces/comment.interface";
import { Comment } from "../models/comment.model";

class CommentRepository {

    public async createComment(dto: Partial<IComment>): Promise<IComment> {
        return await Comment.create(dto);
    }

}

export const commentRepository = new CommentRepository();

