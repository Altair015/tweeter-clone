import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController.js";

const routers = Router();

routers.use("/auth/signup", signUp);
routers.use("/auth/signin", signIn);
routers.use("/auth/signout", signOut);

export default routers;
