import { AxiosError } from "axios";
import { axiosInstance } from "../helpers";
import { refreshTokens } from "./auth.api";

export async function getMe() {
  try {
    const { data } = await axiosInstance.get("users/me");
    return data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.includes("jwt expired")
    ) {
      await refreshTokens();
      return await getMe();
    }
    return { error: "Ошибка при получении пользователя!" };
  }
}
