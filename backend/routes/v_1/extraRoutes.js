import { Router } from "express";
import { ValidateJWTMiddleware } from "../../middlewares/protected.js";
import {
  generateToken,
  getImageByName,
} from "../../controllers/extrasController.js";

const router = Router();

router.get("/images/:image_name", getImageByName);

// just for testing purpose
router.get("/token", generateToken);
// router.use("/test", ValidateJWTMiddleware);

export default router;
