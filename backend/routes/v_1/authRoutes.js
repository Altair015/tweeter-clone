import { Router } from "express";
import { signIn, signOut, signUp } from "../../controllers/authController.js";

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/signout", signOut);

export default router;
