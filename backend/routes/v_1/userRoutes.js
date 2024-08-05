import { Router } from "express";
import {
  getUserData,
  editUserProfile,
  updateUserFollowing,
} from "../../controllers/userController.js";
import { multerMiddleWare } from "../../middlewares/multerSetup.js";
import { ValidateJWTMiddleware } from "../../middlewares/protected.js";

const router = Router();

router.get("/user/:user_id", ValidateJWTMiddleware, getUserData);

router.post(
  "/user/:user_id",
  ValidateJWTMiddleware,
  multerMiddleWare,
  editUserProfile
);

router.put("/user/:user_id", ValidateJWTMiddleware, updateUserFollowing);

export default router;
