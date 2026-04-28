import { axiosInstance } from "../helpers";

export async function getMe() {
    const { data } = await axiosInstance.get('users/me')
    
    return data
}