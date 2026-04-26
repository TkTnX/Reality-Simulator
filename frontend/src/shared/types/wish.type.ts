export type WishType = {
    id: string
    probability: 1
    risk: ERisk
    text: string
    children: WishType[]
}

export enum ERisk {
    LOW = "низкий",
    MEDIUM = "средний",
    HIGH = "высокий"
}