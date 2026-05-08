# Reality Simulator

`Reality Simulator` — это веб-приложение для моделирования вариантов развития желания/цели пользователя с помощью ИИ.  
Пользователь формулирует запрос, а система генерирует дерево возможных сценариев с вероятностями, рисками и краткими описаниями, которое можно интерактивно развивать.

## Описание проекта

Проект состоит из двух частей:

- `frontend` — SPA на React + TypeScript, отображает интерфейс, формы, дерево сценариев и работу с пользователем.
- `backend` — API на Express + MongoDB, отвечает за авторизацию, хранение данных и интеграцию с GigaChat.

## Для чего проект

`Reality Simulator` помогает:

- декомпозировать желание/цель на несколько реалистичных веток развития;
- видеть потенциальные риски и шансы по каждому варианту;
- итеративно углублять отдельные ветки и развивать идеи;
- сохранять историю желаний пользователя в аккаунте.

## Ключевой функционал

- Регистрация, вход, выход пользователя.
- Получение текущего профиля (`/users/me`).
- Создание нового желания с генерацией дерева сценариев через ИИ.
- Визуализация дерева в интерактивном графе (`React Flow`).
- Развитие отдельного узла (добавление новых дочерних веток через ИИ).
- Удаление созданного желания.
- Переключение светлой/темной темы.

## Технологии и стек

### Frontend

- `React 19`
- `TypeScript`
- `Vite`
- `react-router`
- `@tanstack/react-query`
- `axios`
- `react-hook-form` + `zod`
- `zustand`
- `@xyflow/react` (React Flow)
- `Tailwind CSS`
- `react-toastify`
- `lucide-react`

### Backend

- `Node.js`
- `Express 5`
- `MongoDB` + `Mongoose`
- `argon2` (хеширование паролей)
- `jsonwebtoken`
- `cookie-parser`
- `cors`
- `dotenv`
- `gigachat` + `axios` + `qs`



## Требования

- `Node.js` 18+ (рекомендуется LTS)
- `npm` 9+
- Доступная база `MongoDB`
- Доступ к `GigaChat API` (client credentials)

## Переменные окружения

### Frontend (`frontend/.env`)

```env
VITE_PUBLIC_SERVER_URL='http://localhost:5000'
```

Описание:

- `VITE_PUBLIC_SERVER_URL` — базовый URL backend API для frontend.

### Backend (`backend/.env`)

Пример:

```env
CLIENT_URL=http://localhost:5173
DB_URL=mongodb://localhost:27017/reality-simulator
JWT_SECRET=super_secret_key

GIGA_URL=https://ngw.devices.sberbank.ru:9443/api/v2/oauth
GIGA_CLIENT_ID=your_client_id
GIGA_AUTH_KEY=your_base64_basic_auth_key
GIGA_SCOPE=GIGACHAT_API_PERS
```

Описание:

- `CLIENT_URL` — origin frontend для CORS.
- `DB_URL` — строка подключения к MongoDB.
- `JWT_SECRET` — секрет подписи JWT.
- `GIGA_URL` — URL получения OAuth токена GigaChat.
- `GIGA_CLIENT_ID` — идентификатор клиента GigaChat.
- `GIGA_AUTH_KEY` — `Authorization: Basic ...` для OAuth запроса.
- `GIGA_SCOPE` — scope для токена GigaChat.

## Установка и запуск

Проект запускается отдельно для backend и frontend.

### 1) Backend

```bash
cd backend
npm install
npm run start
```

По умолчанию сервер слушает `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

По умолчанию frontend доступен на `http://localhost:5173`.

## Доступные npm-скрипты

### Backend (`backend/package.json`)

- `npm run start` — запуск backend через `nodemon ./index.js`.
- `npm run test` — заглушка (тесты пока не реализованы).

### Frontend (`frontend/package.json`)

- `npm run dev` — dev-сервер Vite.
- `npm run build` — production-сборка (`tsc -b && vite build`).
- `npm run preview` — предпросмотр production-сборки.
- `npm run lint` — запуск ESLint.

## API

Базовый URL: `http://localhost:5000`

### Auth

- `POST /auth/register` — регистрация.
- `POST /auth/login` — логин.
- `POST /auth/refresh` — обновление токенов.
- `POST /auth/logout` — выход.

### Users

- `GET /users/me` — получить текущего пользователя.

### Wishes

- `POST /wishes` — создать желание и получить дерево (требует авторизацию).
- `POST /wishes/develop` — развить узел дерева (требует авторизацию).
- `GET /wishes` — получить список желаний пользователя (требует авторизацию).
- `DELETE /wishes/:id` — удалить желание (требует авторизацию).

