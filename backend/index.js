process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import cors from "cors";
import axios from "axios";
import https from "https";
import GigaChat from "gigachat/index.mjs";
import questionsRouter from "./routes/questions.route.js";
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("Connection Error: ", err));

app.use("/wishes", questionsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
