import preferencesReducer, {
  toggleCategory,
  setCategories,
  toggleDarkMode,
  setDarkMode,
  setContentDensity,
  setLanguage,
  resetPreferences,
} from "@/store/slices/preferencesSlice";
import { UserPreferences } from "@/types";

describe("preferencesSlice", () => {
  const initialTestState: UserPreferences = {
    selectedCategories: ["technology", "sports", "finance"],
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

  it("should toggle a category off if already selected", () => {
    const state = preferencesReducer(initialTestState, toggleCategory("sports"));
    expect(state.selectedCategories).not.toContain("sports");
    expect(state.selectedCategories).toContain("technology");
  });

  it("should toggle a category on if not selected", () => {
    const state = preferencesReducer(initialTestState, toggleCategory("gaming"));
    expect(state.selectedCategories).toContain("gaming");
  });

  it("should not allow deselecting all categories (minimum 1 constraint)", () => {
    const singleCatState: UserPreferences = {
      ...initialTestState,
      selectedCategories: ["technology"],
    };
    const state = preferencesReducer(singleCatState, toggleCategory("technology"));
    expect(state.selectedCategories).toEqual(["technology"]);
  });

  it("should toggle dark mode", () => {
    const state = preferencesReducer(initialTestState, toggleDarkMode());
    expect(state.darkMode).toBe(false);
  });

  it("should update content density", () => {
    const state = preferencesReducer(initialTestState, setContentDensity("compact"));
    expect(state.contentDensity).toBe("compact");
  });

  it("should update language", () => {
    const state = preferencesReducer(initialTestState, setLanguage("es"));
    expect(state.language).toBe("es");
  });

  it("should reset to default preferences", () => {
    const modifiedState: UserPreferences = {
      ...initialTestState,
      darkMode: false,
      contentDensity: "visual",
      language: "de",
    };
    const state = preferencesReducer(modifiedState, resetPreferences());
    expect(state.darkMode).toBe(true);
    expect(state.contentDensity).toBe("normal");
    expect(state.language).toBe("en");
  });
});
