import { Router } from "express";
import {
  getUserDetails,
  loginUeser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUeser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/userData").get(verifyJwt, getUserDetails);
router.route("/updateDetails").patch(verifyJwt, updateUserDetails);
router.route("/refreshAccessToken").post(refreshAccessToken);

export default router;
