import { Router } from "express";
import { getUserData } from "../../controllers/userController.js";
import { ValidateJWTMiddleware } from "../../middlewares/protected.js";

const router = Router();

router.get("/user/:user_id", ValidateJWTMiddleware, getUserData);

export default router;
