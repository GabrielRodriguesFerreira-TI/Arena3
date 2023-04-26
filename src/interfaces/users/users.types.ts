import { Document, Mixed } from "mongoose";
import QueryString from "qs";

export interface iCreateUser extends Document {
  username: string;
  password: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  imageProfile?: string | null;
  isAdmin: boolean;
  deletedAt?: Date;
  UserWithoutPassword: () => Omit<this, "password">;
}

export interface iCreateUserReturn {
  _id: Object;
  username: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  imageProfile?: string | null;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface iUploadUserImageProfile {
  userId: string;
  avatarUrl: string;
}

export interface iRetrieveUserPagination {
  docs: iCreateUser[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages?: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  meta?: any;
}

export type ParamType =
  | string
  | QueryString.ParsedQs
  | string[]
  | QueryString.ParsedQs[]
  | undefined;

export interface iQueryValues {
  page: ParamType;
  limit: ParamType;
}

export interface iUpdatedUser {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}
