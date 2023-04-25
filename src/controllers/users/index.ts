import {
  createUserController,
  deleteUserProfileImageController,
  uploadUserProfileImageController,
  retrieveUsersController,
  deletedUsersController,
  deactivatedUsersController,
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
    deactivatedUsersController,
  },
  usersLogin: {
    userLoginController,
    userLogoutController,
    userRefreshTokenController,
  },
};
