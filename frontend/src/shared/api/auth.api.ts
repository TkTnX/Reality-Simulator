import { axiosInstance } from "../helpers";
import type { LoginSchemaType, RegisterSchemaType } from "../resolvers";
import Cookies from "js-cookie";
export async function register(values: RegisterSchemaType) {
  const { data } = await axiosInstance.post("auth/register", values);

  return data;
}

export async function login(values: LoginSchemaType) {
  const { data } = await axiosInstance.post("auth/login", values);

  return data;
}

export async function refreshTokens() {
  const { data } = await axiosInstance.post("auth/refresh");
  Cookies.set("accessToken", data);
  return data;
}
