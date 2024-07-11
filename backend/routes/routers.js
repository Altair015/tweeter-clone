import { Router } from "express";
import {
  authRoutes,
  extraRoutes,
  tweetRoutes,
  userRoutes,
} from "./v_1/index.js";

const router = Router();

router.use("/v_1", authRoutes);
router.use("/v_1", userRoutes);
router.use("/v_1", tweetRoutes);
router.use("/v_1", extraRoutes);

export default router;
