import {
  iCreatPost,
  iCreatePostResult,
} from "../../interfaces/posts/posts.types";
import { Post } from "../../models/Post.model";

export const createPostService = async (payload: iCreatPost): Promise<any> => {
  const post = await Post.create(payload);
  await post.populate("author", "_id imageProfile username isAdmin");

  return post as unknown as iCreatePostResult;
};
