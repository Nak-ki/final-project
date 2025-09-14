
import { IComment } from "../interfaces/comment.interface";
import { Comment } from "../models/comment.model";



class CommentRepository {

    public async createComment(dto: Partial<IComment>): Promise<IComment> {
        return await Comment.create(dto);
    }

    public async getById(commentId: string): Promise<IComment | null> {
        return await Comment.findById(commentId);
    }

}

export const commentRepository = new CommentRepository();

