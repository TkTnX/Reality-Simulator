import GigaChat from "gigachat/index.mjs";
import { Wish } from "../models/wish.model.js";
import { getUser } from "./user.service.js";
import axios from "axios";
import { assistantConfig } from "../shared/constants/assistant-config.js";
import { gigachatConfig } from "../shared/libs/gigachat-config.js";

export async function createWish(req, res) {
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
  const user = await getUser(req, res);

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
