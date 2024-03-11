import { Router } from "express";
import {
  addUser,
  authentication,
  deleteUser,
  displayAllUsers,
  forgotPassword,
  getUserDetails,
  loginUeser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/addUser").post(addUser);
router.route("/login").post(loginUeser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/userData").get(verifyJwt, getUserDetails);
router.route("/updateDetails").patch(verifyJwt, updateUserDetails);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/forgot-Password").post(forgotPassword);
router.route("/reset-password/:id/:token").post(resetPassword);
router.route("/auth").get(verifyJwt, authentication);
router.route("/all-users").get(verifyJwt, displayAllUsers);
router.route("/delete-user/:id").post(deleteUser);

export default router;
