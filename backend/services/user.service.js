import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function getUser(req, res) {
  if (!req.headers.authorization) {
    if (!req.cookies.refreshToken) {
      return res.status(404).send("Вы не авторизованы!");
    } else {
      await refreshTokens(req, res)
    }
  }
    
  const accessToken = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

  const user = await User.findOne({ email: payload.email }).select("-password");
  if (!user) return res.status(404).send("Пользователь не найден!");
  return res.status(200).json(user);
}
