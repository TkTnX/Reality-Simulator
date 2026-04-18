import { Router } from "express";
import { sendQuestion } from "../services/questions.service.js";

const router = new Router();

router.post("/", sendQuestion);

export default router;
