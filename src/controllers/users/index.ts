import {
  createUserController,
  deleteUserProfileImageController,
  uploadUserProfileImageController,
  retrieveUsersController,
  deletedUsersController,
  deactivatedUsersController,
  updateUsersController,
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
  },
  usersLogin: {
    userLoginController,
    userLogoutController,
    userRefreshTokenController,
  },
};
