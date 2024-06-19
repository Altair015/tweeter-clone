import { Router } from "express";
import { authRoutes } from "./v_1/index.js";

const router = Router();

router.use("/v_1", authRoutes);

export default router;
