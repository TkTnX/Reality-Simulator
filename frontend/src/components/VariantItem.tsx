export const VariantItem = () => {
  return (
    <div className="w-full!">
      <h2 className="font-bold text-base">Накопить на первый взнос</h2>
      <div className="flex items-center flex-col justify-center">
        <span
          // TODO:  < 40 % - red, < 70% yellow, > 70 green
          className={`flex items-center justify-center text-white rounded-full p-2 bg-red-500 w-10 h-10`}
        >
          50%
        </span>
        <p className="italic text-xs">Возможность</p>
      </div>
      <p>Риск: низкий</p>
    </div>
  );
};
