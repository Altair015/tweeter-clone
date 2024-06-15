import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import router from "./routes/userRoute.js";

const server = express();
dotenv.config();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/user", router);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`express running on ${PORT} `);
  connectDB();
});
