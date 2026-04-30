import { Router } from "express";
import { createWish, getWishes } from "../services/wish.service.js";

const router = new Router();

router.post("/", createWish);
router.get('/', getWishes)

export default router;
