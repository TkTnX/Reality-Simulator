import GigaChat from "gigachat/index.mjs";
import { assistantConfig } from "../shared/constants/assistant-config.js";
import qs from "qs";
import axios from "axios";

export async function getAccess(req, res) {
  let body = qs.stringify({
    scope: "GIGACHAT_API_PERS",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      RqUID: process.env.GIGA_CLIENT_ID,
      Authorization: `Basic ${process.env.GIGA_AUTH_KEY}`,
    },
    data: body,
  };
  const { data } = await axios.request(config);

  return data.access_token;
}

export async function sendQuestion(req, res) {
  const { accessToken } = req.body;
  const giga = new GigaChat({
    credentials: process.env.GIGA_AUTH_KEY,
    scope: process.env.GIGA_SCOPE,
    accessToken,
  });

  try {
    const msg = await giga.chat({
      messages: [
        {
          role: "system",
          content: assistantConfig,
        },
        { role: "user", content: "Я хочу купить машину" },
      ],
    });
    return res.json(msg.choices[0].message.content);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка при запросе к ИИ" });
  }
}
