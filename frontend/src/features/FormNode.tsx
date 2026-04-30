import { Loader, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sendWishResolver,
  showErrorMessage,
  type SendWishType,
} from "../shared";
import { useWishes, type WishType } from "../shared";

interface Props {
  setWish: (wish: WishType) => void;
}

export const FormNode = ({ setWish }: Props) => {
  const { sendWishMutation } = useWishes();
  const { mutate, isPending } = sendWishMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendWishType>({
    resolver: zodResolver(sendWishResolver),
  });
  const onSubmit = (values: SendWishType) => {
    mutate(values, {
      onSuccess: (data: WishType) => {
        setWish(data);
      },
      onError: (error) => {
        return showErrorMessage(error);
      },
    });
  };

  return (
    <div className="w-full">
      <h1 className="font-black text-2xl">
        {isPending ? "Думаю..." : "Введите ваше желание"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex w-full! mt-3 border border-gray-200 rounded-lg items-center gap-1 bg-gray-50 transition duration-700 ${isPending && "opacity-0 -translate-y-4"}`}
      >
        <input
          disabled={isPending}
          {...register("request")}
          placeholder="Я хочу купить машину"
          className="input border-none"
          type="text"
        />
        <button
          disabled={isPending}
          type="submit"
          className="text-gray-500 hover:text-black cursor-pointer transition pr-2"
        >
          <Send size={14} />
        </button>
      </form>

      <div
        className={`opacity-0 translate-y-4 transition duration-700 flex justify-center ${isPending && "opacity-100 -translate-y-6! "}`}
      >
        <Loader className="animate-spin" />
      </div>
      {errors.request && (
        <p className="text-red-500 mt-2">{errors.request.message}</p>
      )}
    </div>
  );
};
