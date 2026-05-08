import { Trash } from "lucide-react";
import { useWishes } from "../shared";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

export const DeleteWishButton = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const { deleteWishMutation } = useWishes();
  const { mutate, isPending } = deleteWishMutation();

  const onClick = () =>
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get wishes"] });
        toast.success("Успешное удаление!")
      },
    });

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="text-red-500 absolute top-2  right-2 group transition disabled:opacity-60 disabled:pointer-events-none"
    >
      <Trash className="group-hover:fill-red-500 group-hover:stroke-red-400 transition " />
    </button>
  );
};
