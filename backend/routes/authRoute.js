import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.use("/auth", userEndPoint);

function userEndPoint() {
  return router.post("/", createUser);
}

export default router;
