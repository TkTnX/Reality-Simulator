import { create } from "zustand";

interface WishesStore {
  sellectedWishId: string | null;
  setSellectedWishId: (str: string | null) => void;
}

export const useWishesStore = create<WishesStore>((set) => ({
  sellectedWishId: null,
  setSellectedWishId: (sellectedWishId) => set({ sellectedWishId }),
}));
