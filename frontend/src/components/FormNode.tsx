import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendWishResolver, type SendWishType } from "../resolvers";
import { useWishes } from "../hooks";
import type { WishType } from "../types";

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
      onSuccess: (data: string) => {
        const nodes = JSON.parse(data) as WishType;
        setWish(nodes);
      },
    });
  };

  return (
    <div className="w-full">
      <h1 className="font-black text-2xl">Введите ваше желание</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full! mt-3 border border-gray-200 rounded-lg items-center gap-1 bg-gray-50"
      >
        <input
          disabled={isPending}
          {...register("request")}
          placeholder="Я хочу купить машину"
          className="flex-1 outline-none py-2 px-1"
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
      {errors.request && (
        <p className="text-red-500 mt-2">{errors.request.message}</p>
      )}
    </div>
  );
};
