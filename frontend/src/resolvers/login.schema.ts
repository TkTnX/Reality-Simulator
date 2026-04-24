import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Некорректный формат почты!").nonempty("Почта обязательна!"),
  password: z
    .string("Пароль должен быть строокой!")
    .min(8, "Минимальная длина пароля - 8 символов!"),
});

export type LoginSchemaType = z.input<typeof loginSchema>;
