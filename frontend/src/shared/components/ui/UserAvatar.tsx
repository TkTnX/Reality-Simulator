import { useState } from "react";

interface Props {
  name?: string;
}

// TODO: Выход из аккаунта
// TODO: Смена темы

export const UserAvatar = ({ name }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-black w-10 h-10 flex items-center justify-center rounded-full font-bold text-white"
      >
        {name?.[0]}
      </button>
      <div
        className={`bg-white absolute top-15 p-3 left-0 w-50 h-0 opacity-0 transition  ${open && "h-full opacity-100"}`}
      >
        <button className="w-full rounded-lg hover:bg-gray-400/30 text-left transition py-1 px-3">
          Выйти
        </button>
      </div>
    </>
  );
};
