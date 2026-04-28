import { User } from "../models/user.model.js";
import argon from "argon2";
import jwt from "jsonwebtoken";
export async function register(req, res) {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) return res.status(401).send("Пользователь уже существует!");

  const hashedPassword = await argon.hash(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return setCookies(res, user);
}

export async function login(req, res) {
  const { email, password } = req.body;

  const isUserExists = await User.findOne({ email });
  if (!isUserExists) return res.status(401).send("Неверные почта или пароль!");

  const isPasswordCorrect = await argon.verify(isUserExists.password, password);
  if (!isPasswordCorrect)
    return res.status(401).send("Неверные почта или пароль!");

  return setCookies(res, isUserExists);
}

export async function refreshTokens(req, res) {
  const { refreshToken } = req.cookies;
  const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const user = await User.findOne({ email: payload.email });
  if (!user) return res.status(404).send("Пользователь не найден!");

  return setCookies(res, user);
}

async function generateTokens(user) {
  const payload = { email: user.email, id: user._id };
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { refreshToken, accessToken };
}

async function setCookies(res, user) {
  const { accessToken, refreshToken } = await generateTokens(user);
  
  res.cookie("refreshToken", refreshToken, {
    maxAge: 604800000,
    httpOnly: true,
  });

  return res.send(accessToken);
}
