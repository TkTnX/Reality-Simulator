import { UserAvatar } from "../shared";
import { useUsersStore } from "../shared/stores";

export const Header = () => {
  const { user } = useUsersStore();
  return (
    <header className="absolute h-15 px-4 z-10 flex items-center justify-between w-full bg-white">
      <UserAvatar name={user?.name} />
      <h1 className="font-black text-2xl">Reality Simulator</h1>
    </header>
  );
};
