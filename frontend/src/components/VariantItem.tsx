import { ERisk, type WishType } from "../types";

interface Props {
  wish: WishType;
}

export const VariantItem = ({ wish }: Props) => {
  return (
    <div className="w-full!">
      <h2 className="font-bold text-base">{wish.text}</h2>
      <div className="flex items-center flex-col justify-center">
        <span
          // TODO:  < 40 % - red, < 70% yellow, > 70 green
          className={`flex items-center justify-center text-white rounded-full p-2  w-10 h-10 ${wish.probability <= 0.4 ? "bg-red-500" : wish.probability > 0.4 && wish.probability <= 0.7 ? "bg-yellow-400" : "bg-green-500"}`}
        >
          {wish.probability * 100}%
        </span>
        <p className="italic text-xs">Возможность</p>
      </div>
      <p>Риск: {ERisk[`${wish.risk.toUpperCase()}` as keyof typeof ERisk]}</p>
    </div>
  );
};
