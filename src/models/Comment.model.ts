import mongoose from "mongoose";
import { iCreateComments } from "../interfaces/comments/comments.types";
import mongoosePaginate from "mongoose-paginate-v2";
import { ICustomModel } from "../interfaces/global/paginate.types";

const commentsSchema = new mongoose.Schema<iCreateComments>({
  description: { type: String, required: true, maxlength: 255 },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    options: {
      onDelete: "CASCADE",
    },
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    options: {
      onDelete: "CASCADE",
    },
    required: true,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
    options: {
      onDelete: "CASCADE",
    },
  },
  childComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      options: {
        onDelete: "CASCADE",
      },
    },
  ],
});

commentsSchema.plugin(mongoosePaginate);

export const Comment = mongoose.model<
  iCreateComments,
  ICustomModel<iCreateComments>
>("Comment", commentsSchema);
