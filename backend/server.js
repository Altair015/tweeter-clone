import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./db/connection.js";
import routers from "./routes/routers.js";
// import cors from "cors";
import { existsSync, mkdirSync } from "node:fs";

const server = express();

dotenv.config();
const { PORT } = process.env;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(cookieParser());
server.use("/public", express.static("public"));

// needed to be removed only for testing
// server.use(cors());

server.use("/api", routers);

server.listen(PORT, () => {
  console.log(`express running on ${PORT} `);
  const imageUploadPath = "./public/uploads/";

  if (!existsSync(imageUploadPath)) {
    mkdirSync(imageUploadPath, { recursive: true });
  }
  // connecting with mongoDB
  connectDB();
});
