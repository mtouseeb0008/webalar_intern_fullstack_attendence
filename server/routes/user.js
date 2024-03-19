import express from "express";
import {
  getUserDetails,
  userRegister,
  userlogin,
} from "../controllers/user.js";
import { authentication } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userlogin);
router.route("/user").get(authentication, getUserDetails);

export default router;
