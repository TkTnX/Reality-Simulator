import { Router } from "express";
import { getUser } from "../services/user.service.js";

const router = new Router();

router.get("/me", getUser);

export default router;
