/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export function useUsers() {
  const getMeQuery = () =>
    useQuery({ queryKey: ["me"], queryFn: () => getMe() });

  return { getMeQuery };
}
