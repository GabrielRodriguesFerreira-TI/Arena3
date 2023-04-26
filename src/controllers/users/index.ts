import {
  createUserController,
  deleteUserProfileImageController,
  uploadUserProfileImageController,
  retrieveUsersController,
  deletedUsersController,
  deactivatedUsersController,
  updateUsersController,
  retrieveOneUserController,
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
    updateUsersController,
    retrieveOneUserController,
  },
  usersLogin: {
    userLoginController,
    userLogoutController,
    userRefreshTokenController,
  },
};
