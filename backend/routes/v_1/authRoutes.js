import { Router } from "express";
import { signIn, signOut, signUp } from "../../controllers/authController.js";

const router = Router();

router.use("/auth/signup", signUp);
router.use("/auth/signin", signIn);
router.use("/auth/signout", signOut);

export default router;
