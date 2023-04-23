import {
  createUserController,
  deleteUserProfileImageController,
  uploadUserProfileImageController,
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
  },
  usersLogin: {
    userLoginController,
    userLogoutController,
    userRefreshTokenController,
  },
};
