import {
  iQueryValues,
  iRetrieveUserPagination,
} from "../../interfaces/users.types";
import { User } from "../../models/User.model";

export const retrieveUsersService = async (
  params: iQueryValues
): Promise<iRetrieveUserPagination> => {
  let limitNumber = parseInt((params.limit as unknown as string) ?? "5");
  let pageNumber = parseInt((params.page as unknown as string) ?? "1");

  if (isNaN(limitNumber)) {
    limitNumber = 5;
  }

  if (isNaN(pageNumber)) {
    pageNumber = 1;
  }

  const countDocuments = await User.countDocuments();

  if (countDocuments < limitNumber) {
    limitNumber = countDocuments;
  }

  const options = {
    page: pageNumber,
    limit: limitNumber,
    select: "-password -__v",
  };

  const users = await User.paginate({}, options);

  return users;
};
