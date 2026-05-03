import GigaChat from "gigachat/index.mjs";
import { Wish } from "../models/wish.model.js";
import { getUser } from "./user.service.js";
import axios from "axios";
import { assistantConfig } from "../shared/constants/assistant-config.js";
import { gigachatConfig } from "../shared/libs/gigachat-config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { processNode } from "../shared/helpers/generateUniqueId.js";

export async function createWish(req, res) {
  const accessToken = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
  const { data } = await axios.request(
    gigachatConfig(
      process.env.GIGA_URL,
      process.env.GIGA_CLIENT_ID,
      process.env.GIGA_AUTH_KEY,
    ),
  );
  const giga = new GigaChat({
    credentials: process.env.GIGA_AUTH_KEY,
    scope: process.env.GIGA_SCOPE,
    accessToken: data.accessToken,
  });
  const body = req.body;
  const user = await User.findById(payload.id);
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  try {
    const msg = await giga.chat({
      messages: [
        {
          role: "system",
          content: assistantConfig,
        },
        { role: "user", content: body.request },
      ],
    });

    const content = msg.choices[0].message.content;
    const contentJSON = JSON.parse(content);

    if (contentJSON.error)
      return res.status(500).send("Я не понял, что вы имели в виду");

    processNode(contentJSON);

    const wish = await Wish.create({
      probability: contentJSON.probability,
      risk: contentJSON.risk,
      text: contentJSON.text,
      children: contentJSON.children,
      user: user._id,
    });

    if (!wish) return res.status(400).send("Не удалось создать вопрос");
    return res.status(201).json(wish);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка при запросе к ИИ" });
  }
}

export async function getWishes(req, res) {
  const payload = req.user;
  console.log(payload);

  const userWishes = await Wish.find({ user: payload.id });
  if (!userWishes) return res.send(404).send("Желания пользователя не найдены");

  return res.status(200).json(userWishes);
}

export async function deleteWish(req, res) {
  try {
    const { id } = req.params;
    const wish = await Wish.findById(id);
    if (!wish) return res.send(404).send("Желание не найдено!");

    await Wish.deleteOne({ _id: id });
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Не удалось удалить желание!");
  }
}
