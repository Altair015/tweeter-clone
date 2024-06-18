import { Router } from "express";
import { authRoutes } from "./index.js";

const routers = Router();

routers.use("/v_1", authRoutes);

export default routers;
