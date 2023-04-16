import { Document, Mixed } from "mongoose";

export interface iLoginUser extends Document {
  email: string | Mixed;
  password: string;
}
