import { iCreateComments } from "../../interfaces/comments/comments.types";
import { Comment } from "../../models/Comment.model";
import { Post } from "../../models/Post.model";

export const createCommentPostService = async (
  payload: iCreateComments,
  postId: string,
  userId: string
) => {
  const { parentCommentId } = payload;
  const post = await Post.findById(postId);
  const newPayload = {
    ...payload,
    authorId: userId,
    postId: postId,
  };

  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId)!;

    const childComment = new Comment({
      ...newPayload,
    });

    await childComment.save();

    parentComment?.childComments?.push(childComment._id);

    await parentComment?.save();

    return { commentId: `${childComment._id}` };
  }

  const comment = new Comment({
    ...newPayload,
  });

  await comment.save();

  post?.comments?.push(comment._id);

  await post?.save();

  return { commentId: `${comment._id}` };
};
