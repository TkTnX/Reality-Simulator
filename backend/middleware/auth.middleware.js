import jwt from "jsonwebtoken";
import { refreshTokens } from "../services/auth.service.js";
export async function verifyAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Токен отсутсвует" });
    }
    const accessToken = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        if (!req.cookies.refreshToken) {
          return res
            .status(401)
            .json({ error: "Токен истёк, пожалуйста, авторизуйтесь!" });
        }
      }

      try {
        await refreshTokens(req, res);

        const newAccessToken = req.cookies.accessToken;
        const payload = jwt.verify(newAccessToken, process.env.JWT_SECRET);
        req.user = payload;
        next();
      } catch (error) {
        return res.status(401).json({ error: "Ошибка авторизации" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
