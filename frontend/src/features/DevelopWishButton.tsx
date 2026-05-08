import { Loader } from "lucide-react";
import { useWishes, type WishType } from "../shared";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Props {
  wish: WishType;
  rootId?: string;
}

export const DevelopWishButton = ({ wish, rootId }: Props) => {
  const queryClient = useQueryClient();
  const { developWishMutation } = useWishes();
  const { mutate, isPending } = developWishMutation();

  const onClick = () =>
    mutate(
      { rootId, ...wish },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get wishes"] });
          toast.success("Узел дополнен!");
        },
      },
    );

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="bg-blue-100 dark:bg-gray-400 w-full mt-2 py-2 flex items-center justify-center rounded-full hover:bg-blue-500 dark:hover:bg-gray-500 transition hover:text-white"
    >
      {isPending ? <Loader className="animate-spin" /> : " Развить идею"}
    </button>
  );
};
