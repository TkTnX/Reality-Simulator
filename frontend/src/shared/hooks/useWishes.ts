/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "@tanstack/react-query";
import type { SendWishType } from "../resolvers";
import { deleteWish, getWishes, sendWish } from "../api";
import type { WishType } from "../types";
import { useUsersStore } from "../stores";

export function useWishes() {
  const { user } = useUsersStore();
  const sendWishMutation = () =>
    useMutation({
      mutationKey: ["send wish"],
      mutationFn: (values: SendWishType) => sendWish(values),
    });

  const deleteWishMutation = () =>
    useMutation({
      mutationKey: ["delete wish"],
      mutationFn: (id: string) => deleteWish(id),
    });

  const getUserWishesQuery = () =>
    useQuery({
      queryKey: ["get wishes"],
      queryFn: (): Promise<WishType[]> => getWishes(),
      enabled: !!user,
    });

  return {
    sendWishMutation,
    deleteWishMutation,
    getUserWishesQuery,
  };
}
