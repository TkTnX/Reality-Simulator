export type WishType = {
    _id?: string
    id: string
    probability: number
    description: string
    risk: ERisk
    text: string
    children: WishType[]
}

export enum ERisk {
    LOW = "низкий",
    MEDIUM = "средний",
    HIGH = "высокий"
}