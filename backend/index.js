process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import cors from "cors";
import axios from "axios";
import https from "https";
import GigaChat from "gigachat/index.mjs";
import questionsRouter from "./routes/questions.route.js";
import dotenv from "dotenv"
dotenv.config();


const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }),
);
app.use(express.json());

app.use("/wishes", questionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
