import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentItem } from "@/types";
import { safeStorage } from "@/utils/storage";

const STORAGE_KEY = "pulseboard_favorites";

export interface FavoritesState {
  items: ContentItem[];
  itemIds: string[];
}

const getInitialFavorites = (): FavoritesState => {
  const items = safeStorage.get<ContentItem[]>(STORAGE_KEY, []);
  return {
    items,
    itemIds: items.map((i) => i.id),
  };
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getInitialFavorites(),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const item = action.payload;
      const index = state.itemIds.indexOf(item.id);
      if (index >= 0) {
        state.items = state.items.filter((i) => i.id !== item.id);
        state.itemIds = state.itemIds.filter((id) => id !== item.id);
      } else {
        state.items.unshift(item);
        state.itemIds.unshift(item.id);
      }
      safeStorage.set(STORAGE_KEY, state.items);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      state.itemIds = state.itemIds.filter((itemId) => itemId !== id);
      safeStorage.set(STORAGE_KEY, state.items);
    },
    clearAllFavorites: (state) => {
      state.items = [];
      state.itemIds = [];
      safeStorage.set(STORAGE_KEY, []);
    },
  },
});

export const { toggleFavorite, removeFavorite, clearAllFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
