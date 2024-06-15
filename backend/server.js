import express from "express";
import dotenv from "dotenv";

const server = express();
dotenv.config();

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`express running on ${PORT} `);
});
