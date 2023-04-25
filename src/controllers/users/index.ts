import {
  createUserController,
  deleteUserProfileImageController,
  uploadUserProfileImageController,
  retrieveUsersController,
  deletedUsersController,
} from "./users.controllers";
import {
  userLoginController,
  userLogoutController,
  userRefreshTokenController,
} from "./usersLogin.controllers";

export default {
  users: {
    createUserController,
    deleteUserProfileImageController,
    uploadUserProfileImageController,
    retrieveUsersController,
    deletedUsersController,
  },
  usersLogin: {
    userLoginController,
    userLogoutController,
    userRefreshTokenController,
  },
};
