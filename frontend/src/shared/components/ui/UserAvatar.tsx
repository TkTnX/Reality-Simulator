import { useState } from "react";
import { LogoutButton, ThemeButton } from "../../../features";

interface Props {
  name?: string;
}

export const UserAvatar = ({ name }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-black w-10 h-10 flex items-center justify-center rounded-full font-bold text-white "
      >
        {name?.[0]}
      </button>
      <div
        className={`bg-white absolute top-15 p-3 left-0 w-50 h-0 opacity-0  flex flex-col items-center justify-center gap-2  ${open && "h-30 opacity-100"}`}
      >
        <ThemeButton />
        <LogoutButton />
      </div>
    </>
  );
};
