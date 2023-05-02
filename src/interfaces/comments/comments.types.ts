import mongoose, { Document } from "mongoose";

export interface iCreateComments extends Document {
  description: string;
  authorId: mongoose.Schema.Types.ObjectId;
  postId: mongoose.Schema.Types.ObjectId;
  parentCommentId?: mongoose.Schema.Types.ObjectId;
  childComments?: [mongoose.Schema.Types.ObjectId];
}
