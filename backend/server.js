import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./db/connection.js";
import { ValidateJWTMiddleware } from "./middlewares/protected.js";
import routers from "./routes/routers.js";
import { generateJWT } from "./utils/handleJWT.js";

const server = express();

dotenv.config();
const { PORT } = process.env;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("combined"));
server.use(cookieParser());

server.use("/api", routers);

//testing routes, needed to be removed when, done testing all the frontend calls
// ==============================================================================================================
server.get("/api/gen_token", (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  generateJWT(userId, res);
  res.send({ status: "jwt set" });
});
server.post("/api/home", ValidateJWTMiddleware, (req, res) => {
  res.send({ data: req.body });
});
// ==============================================================================================================

server.listen(PORT, () => {
  console.log(`express running on ${PORT} `);
  connectDB();
});
