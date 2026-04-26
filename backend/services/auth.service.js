import { User } from "../models/user.model.js";
import argon from "argon2";
export async function register(req, res) {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  console.log(isUserExist);
  if (isUserExist) throw new Error("Пользователь уже существует!");

  const hashedPassword = await argon.hash(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.send(user);
}

export async function login(req, res) {
  const { email, password } = req.body;

  const isUserExists = await User.findOne({ email });
  if (!isUserExists) throw new Error("Неверные данные или пароль!");

  const isPasswordCorrect = await argon.verify(isUserExists.password, password);
  if (!isPasswordCorrect) throw new Error("Неверные данные или пароль!");

  return res.send(isUserExists);
}
