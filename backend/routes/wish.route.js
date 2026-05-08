import { Router } from "express";
import {
  createWish,
  deleteWish,
  developAuth,
  getWishes,
} from "../services/wish.service.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = new Router();

router.post("/", verifyAuth, createWish);
router.post("/develop", verifyAuth, developAuth);
router.delete("/:id", verifyAuth, deleteWish);
router.get("/", verifyAuth, getWishes);

export default router;
