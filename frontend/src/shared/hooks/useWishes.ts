/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import type { SendWishType } from "../resolvers";
import { sendWish } from "../api";

export function useWishes() {
  const sendWishMutation = () =>
    useMutation({
      mutationKey: ["send wish"],
      mutationFn: (values: SendWishType) => sendWish(values),
    });

  return {
    sendWishMutation,
  };
}
