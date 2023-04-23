import {
  iQueryValues,
  iRetrieveUserPagination,
} from "../../interfaces/users.types";
import { User } from "../../models/User.model";

export const retrieveUsersService = async (
  params: iQueryValues
): Promise<iRetrieveUserPagination> => {
  const { limit, page } = params;

  const options = {
    page: Number(page),
    limit: Number(limit),
    select: "-password -__v",
  };

  const users = await User.paginate({}, options);

  return users;
};
