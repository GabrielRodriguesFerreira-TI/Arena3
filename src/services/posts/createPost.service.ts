import {
  iCreatPost,
  iCreatePostResult,
} from "../../interfaces/posts/posts.types";
import S3Storage from "../../utils/S3Storage";
import { Post } from "../../models/Post.model";
import fs from "fs";
import { AppError } from "../../errors/erros";

export const createPostService = async (payload: iCreatPost): Promise<any> => {
  const { midia } = payload;

  if (midia) {
    const files = fs.readdirSync("./tmp");
    const midiaExists = files.indexOf(midia as string);

    if (midiaExists !== -1) {
      const s3Storage = new S3Storage();

      await s3Storage.savePostFile(midia!);

      const newPost = {
        ...payload,
        midia: midia,
      };

      const post = await Post.create(newPost);
      await post.populate("author", "_id imageProfile username isAdmin");

      return post as unknown as iCreatePostResult;
    } else {
      throw new AppError("File not found!", 404);
    }
  }

  const post = await Post.create(payload);
  await post.populate("author", "_id imageProfile username isAdmin");

  return post as unknown as iCreatePostResult;
};
