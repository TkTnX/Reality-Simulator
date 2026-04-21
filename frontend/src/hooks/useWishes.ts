/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import { sendWish } from "../api";
import type { SendWishType } from "../resolvers";

export function useWishes() {
    const sendWishMutation = () => useMutation({
        mutationKey: ['send wish'],
        mutationFn: (values: SendWishType) => sendWish(values)
    })


    return {
        sendWishMutation
    }
}