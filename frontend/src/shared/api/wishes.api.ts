import { axiosInstance } from "../helpers";
import type { SendWishType } from "../resolvers";
import type { WishType } from "../types";

export async function sendWish(values: SendWishType) {
  const { data } = await axiosInstance.post("/wishes", values);

  return data;
}

export async function developWish(values: WishType) {
  console.log(values);
  const { data } = await axiosInstance.post("/wishes/develop", values);

  return data;
}

export async function deleteWish(id: string) {
  const { data } = await axiosInstance.delete(`/wishes/${id}`);
  return data;
}

export async function getWishes() {
  const { data } = await axiosInstance.get("/wishes");
  return data;
}
