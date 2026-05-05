import { Router } from "express";
import { login, logout, refreshTokens, register } from "../services/auth.service.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.post('/refresh', refreshTokens)
router.post('/logout', logout)

export default router;
