import { ERisk, type WishType } from "../shared";
import { DeleteWishButton } from "../features";
import { useWishesStore } from "../shared/stores";

interface Props {
  wish: WishType;
}

export const VariantItem = ({ wish }: Props) => {
  const { sellectedWishId, setSellectedWishId } = useWishesStore();
  return (
    <div
      onClick={() => setSellectedWishId(wish.id || null)}
      className="w-full!"
    >
      {wish._id && <DeleteWishButton id={wish._id} />}
      <h2 className="font-bold text-base">{wish.text}</h2>

      <div className="flex items-center flex-col justify-center">
        <span
          className={`flex items-center justify-center text-white rounded-full p-2  w-10 h-10 ${wish.probability <= 0.4 ? "bg-red-500" : wish.probability > 0.4 && wish.probability <= 0.7 ? "bg-yellow-400" : "bg-green-500"}`}
        >
          {wish.probability * 100}%
        </span>
        <p className="italic text-xs">Возможность</p>
      </div>
      <p>Риск: {ERisk[`${wish.risk.toUpperCase()}` as keyof typeof ERisk]}</p>
      <p
        className={`h-0 opacity-0 transition border-t border-gray-300 pt-3 mt-3 ${sellectedWishId === wish.id && "h-full opacity-100"}`}
      >
        {wish.description}
      </p>
      {!(sellectedWishId === wish.id) && !wish._id && (
        <p className="text-[8px] text-gray-500">Подробнее</p>
      )}
    </div>
  );
};
