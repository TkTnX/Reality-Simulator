import { axiosInstance } from "../helpers";
import type { LoginSchemaType, RegisterSchemaType } from "../resolvers";

export async function register(values: RegisterSchemaType) {
  const { data } = await axiosInstance.post("auth/register", values);

  return data;
}

export async function login(values: LoginSchemaType) {
  const { data } = await axiosInstance.post("auth/login", values);

  return data;
}
