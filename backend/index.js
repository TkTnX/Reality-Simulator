process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import cors from "cors";
import axios from "axios";
import https from "https";
import GigaChat from "gigachat/index.mjs";
const app = express();
const PORT = 5000;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/access", async (req, res) => {
  const resp = await axios.post(
    "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    new URLSearchParams({
      scope: "GIGACHAT_API_PERS",
    }),
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        RqUID: "019da13c-b7b3-780f-8d26-8fda473c6ffc",
        Authorization:
          "Basic MDE5ZGExM2MtYjdiMy03ODBmLThkMjYtOGZkYTQ3M2M2ZmZjOjdiNjc5MGUwLWQxY2YtNDQxMC04NzBiLTZlNzQ2ZjlkZmViNA==",
      },
    },
  );
  return res.json(resp.data.access_token);
});

app.post("/message", async (req, res) => {
  const giga = new GigaChat({
    credentials:
      "MDE5ZGExM2MtYjdiMy03ODBmLThkMjYtOGZkYTQ3M2M2ZmZjOjdiNjc5MGUwLWQxY2YtNDQxMC04NzBiLTZlNzQ2ZjlkZmViNA==",
    scope: "GIGACHAT_API_PERS",
  });

  try {
    const msg = await giga.chat({
      messages: [
        {
          role: "system",
          content: `Ты — аналитический ИИ внутри приложения Reality Simulator.
  
  Твоя задача: преобразовать ситуацию пользователя в дерево возможных сценариев будущего.
  
  СТРОГО СЛЕДУЙ ПРАВИЛАМ:
  
  1. Верни ТОЛЬКО JSON
  2. Без текста, объяснений и комментариев
  3. JSON должен быть валидным
  
  СТРУКТУРА:
  
  Каждый узел:
  {
    "id": string,
    "text": string,
    "probability": number (0-1),
    "risk": "low" | "medium" | "high",
    "children": Node[]
  }
  
  ТРЕБОВАНИЯ:
  
  - Глубина дерева: 2-3 уровня
  - У каждого узла: 2-3 дочерних исхода
  - probability у детей суммарно ≈ 1
  - text короткий (до 10 слов)
  - избегай общих фраз (типа "всё будет хорошо")
  
  ЛОГИКА:
  
  - учитывай реальные факторы (деньги, опыт, рынок)
  - добавляй как позитивные, так и негативные исходы
  - оценивай риск реалистично
  
  ФОРМАТ КОРНЯ:
  
  {
    "id": "root",
    "text": "Начальный сценарий",
    "probability": 1,
    "risk": "medium",
    "children": [...]
  }`,
        },
        { role: "user", content: "Я хочу купить машину" },
      ],
    });
    return res.json(msg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка при запросе к ИИ" });
  }
});
