import { useNavigate } from "react-router";
import { useAuth } from "../shared";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { logoutMutation } = useAuth();
  const { mutate, isPending } = logoutMutation();

  const onClick = () => {
    mutate(
      {},
      {
        onSuccess: () => navigate("/auth"),
      },
    );
  };
  return (
    <button
      disabled={isPending}
      onClick={onClick}
      className="w-full rounded-lg hover:bg-gray-400/30 text-center bg-gray-100 transition py-1 px-3 disabled:opacity-50 disabled:pointer-events-none"
    >
      Выйти
    </button>
  );
};
