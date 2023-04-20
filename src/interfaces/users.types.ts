import { Document, Mixed } from "mongoose";

export interface iCreateUser extends Document {
  username: string;
  password: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  imageProfile?: string;
  isAdmin: boolean;
  UserWithoutPassword: () => Omit<this, "password">;
}

export interface iCreateUserReturn {
  id: Object;
  username: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  imageProfile?: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface iUploadUserImageProfile {
  userId: string;
  avatarUrl: string;
}
