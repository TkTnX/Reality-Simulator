import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function showErrorMessage(error: AxiosError | Error) {
    if (error instanceof AxiosError) {
        return toast.error(error.response?.data)
    } else {
        return toast.error(error.message)
    }
}