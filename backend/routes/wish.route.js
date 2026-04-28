import { Router } from "express";
import { createWish } from "../services/wish.service.js";

const router = new Router();

router.post("/", createWish);

export default router;
