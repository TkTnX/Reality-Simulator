import { Router } from "express";
import { login, refreshTokens, register } from "../services/auth.service.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.post('/refresh', refreshTokens)

export default router;
