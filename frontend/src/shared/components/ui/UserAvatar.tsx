interface Props {
  name?: string;
}

export const UserAvatar = ({ name }: Props) => {
  return (
    <button className="bg-black w-10 h-10 flex items-center justify-center rounded-full font-bold text-white">
      {name?.[0]}
    </button>
  );
};
