import {z} from "zod"

export const sendWishResolver = z.object({
    request: z.string().nonempty("Запрос обязателен!")
})

export type SendWishType = z.input<typeof sendWishResolver>

