import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentCategory, ContentType, UserPreferences } from "@/types";
import { safeStorage } from "@/utils/storage";

const STORAGE_KEY = "pulseboard_user_preferences";

const DEFAULT_PREFERENCES: UserPreferences = {
  selectedCategories: ["technology", "sports", "finance", "entertainment", "science", "gaming"],
  darkMode: true,
  contentDensity: "normal",
  enableRealtime: true,
  realtimeSpeedSeconds: 20,
  language: "en",
  preferredSourceTypes: ["news", "recommendation", "social"],
  customApiKeys: {
    newsApi: "",
    tmdb: "",
  },
};

const getInitialPreferences = (): UserPreferences => {
  return safeStorage.get<UserPreferences>(STORAGE_KEY, DEFAULT_PREFERENCES);
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState: getInitialPreferences(),
  reducers: {
    toggleCategory: (state, action: PayloadAction<ContentCategory>) => {
      const cat = action.payload;
      if (state.selectedCategories.includes(cat)) {
        // Prevent unselecting all categories
        if (state.selectedCategories.length > 1) {
          state.selectedCategories = state.selectedCategories.filter((c) => c !== cat);
        }
      } else {
        state.selectedCategories.push(cat);
      }
      safeStorage.set(STORAGE_KEY, state);
    },
    setCategories: (state, action: PayloadAction<ContentCategory[]>) => {
      if (action.payload.length > 0) {
        state.selectedCategories = action.payload;
        safeStorage.set(STORAGE_KEY, state);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      safeStorage.set(STORAGE_KEY, state);
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      safeStorage.set(STORAGE_KEY, state);
    },
    setContentDensity: (state, action: PayloadAction<"compact" | "normal" | "visual">) => {
      state.contentDensity = action.payload;
      safeStorage.set(STORAGE_KEY, state);
    },
    setLanguage: (state, action: PayloadAction<UserPreferences["language"]>) => {
      state.language = action.payload;
      safeStorage.set(STORAGE_KEY, state);
    },
    toggleRealtime: (state) => {
      state.enableRealtime = !state.enableRealtime;
      safeStorage.set(STORAGE_KEY, state);
    },
    setSourceTypes: (state, action: PayloadAction<ContentType[]>) => {
      state.preferredSourceTypes = action.payload;
      safeStorage.set(STORAGE_KEY, state);
    },
    setApiKeys: (state, action: PayloadAction<{ newsApi?: string; tmdb?: string }>) => {
      state.customApiKeys = { ...state.customApiKeys, ...action.payload };
      safeStorage.set(STORAGE_KEY, state);
    },
    resetPreferences: () => {
      safeStorage.set(STORAGE_KEY, DEFAULT_PREFERENCES);
      return DEFAULT_PREFERENCES;
    },
  },
});

export const {
  toggleCategory,
  setCategories,
  toggleDarkMode,
  setDarkMode,
  setContentDensity,
  setLanguage,
  toggleRealtime,
  setSourceTypes,
  setApiKeys,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
