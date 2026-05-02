import { Router } from "express";
import { createWish, deleteWish, getWishes } from "../services/wish.service.js";

const router = new Router();

router.post("/", createWish);
router.delete('/:id', deleteWish)
router.get('/', getWishes)

export default router;
