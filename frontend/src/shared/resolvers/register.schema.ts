import { z } from "zod";

export const registerSchema = z.object({
  name: z.string("Имя должно быть строкой!").nonempty("Имя обязательно!"),
  email: z.email("Некорректный формат почты!").nonempty("Почта обязательна!"),
  password: z.string('Пароль должен быть строокой!').min(8, "Минимальная длина пароля - 8 символов!"),
});

export type RegisterSchemaType = z.input<typeof registerSchema>;
