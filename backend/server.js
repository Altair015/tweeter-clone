import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import authRoute from "./routes/userRoute.js";
import morgan from "morgan";

const server = express();
dotenv.config();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("combined"));

server.use("/api/auth", authRoute);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`express running on ${PORT} `);
  connectDB();
});
