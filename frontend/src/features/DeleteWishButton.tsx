import { Trash } from "lucide-react";
import { useWishes } from "../shared";

interface Props {
  id: string;
}

export const DeleteWishButton = ({ id }: Props) => {
  const { deleteWishMutation } = useWishes();
  const { mutate, isPending } = deleteWishMutation();

  return (
    <button
      onClick={() => mutate(id)}
      disabled={isPending}
      className="text-red-500 absolute top-2  right-2 group transition disabled:opacity-60 disabled:pointer-events-none"
    >
      <Trash className="group-hover:fill-red-500 group-hover:stroke-red-400 transition " />
    </button>
  );
};
