import { axiosInstance } from "../helpers";

export async function getMe() {
  try {
    const { data } = await axiosInstance.get("users/me");
    return data;
  } catch (error) {
    console.log(error);
    return { error: "Ошибка при получении пользователя!" };
  }
}
