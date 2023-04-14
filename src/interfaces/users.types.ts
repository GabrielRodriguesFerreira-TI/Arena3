import { Mixed } from "mongoose";

export interface iCreateUser {
  username: string;
  password: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
}
