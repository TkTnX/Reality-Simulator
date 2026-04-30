/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "@tanstack/react-query";
import type { SendWishType } from "../resolvers";
import { getWishes, sendWish } from "../api";
import type { WishType } from "../types";

export function useWishes() {
  const sendWishMutation = () =>
    useMutation({
      mutationKey: ["send wish"],
      mutationFn: (values: SendWishType) => sendWish(values),
    });

  const getUserWishesQuery = () =>
    useQuery({
      queryKey: ["get wishes"],
      queryFn: (): Promise<WishType[]> => getWishes(),
    });

  return {
    sendWishMutation,
    getUserWishesQuery,
  };
}
