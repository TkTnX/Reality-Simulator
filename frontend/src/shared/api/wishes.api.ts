import { axiosInstance } from "../helpers";
import type { SendWishType } from "../resolvers";

export async function sendWish(values: SendWishType) {
  const { data } = await axiosInstance.post("/wishes", values);

  return data;
}

export async function deleteWish(id: string) {
  const { data } = await axiosInstance.delete(`/wishes/${id}`);
  return data
}

export async function getWishes() {
  const { data } = await axiosInstance.get('/wishes')
  return data
}