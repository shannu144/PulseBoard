import favoritesReducer, {
  toggleFavorite,
  removeFavorite,
  clearAllFavorites,
  FavoritesState,
} from "@/store/slices/favoritesSlice";
import { ContentItem } from "@/types";

describe("favoritesSlice", () => {
  const sampleItem: ContentItem = {
    id: "item-1",
    type: "news",
    category: "technology",
    source: "TechCrunch",
    title: "Quantum Leap in AI",
    description: "Breakthrough in generative computing.",
    url: "https://example.com/ai",
    imageUrl: "https://example.com/ai.jpg",
    publishedAt: new Date().toISOString(),
  };

  const sampleItem2: ContentItem = {
    id: "item-2",
    type: "recommendation",
    category: "entertainment",
    source: "TMDB",
    title: "Inception",
    description: "Dream within a dream.",
    url: "https://example.com/inception",
    imageUrl: "https://example.com/inception.jpg",
    publishedAt: new Date().toISOString(),
  };

  const emptyState: FavoritesState = {
    items: [],
    itemIds: [],
  };

  it("should add an item to favorites when toggled", () => {
    const state = favoritesReducer(emptyState, toggleFavorite(sampleItem));
    expect(state.itemIds).toContain("item-1");
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe("Quantum Leap in AI");
  });

  it("should remove an item from favorites when toggled again", () => {
    const stateWithOne = favoritesReducer(emptyState, toggleFavorite(sampleItem));
    const stateAfterSecondToggle = favoritesReducer(stateWithOne, toggleFavorite(sampleItem));
    expect(stateAfterSecondToggle.itemIds).not.toContain("item-1");
    expect(stateAfterSecondToggle.items).toHaveLength(0);
  });

  it("should remove an item by id using removeFavorite", () => {
    const stateWithTwo: FavoritesState = {
      items: [sampleItem, sampleItem2],
      itemIds: ["item-1", "item-2"],
    };
    const state = favoritesReducer(stateWithTwo, removeFavorite("item-1"));
    expect(state.itemIds).toEqual(["item-2"]);
    expect(state.items).toHaveLength(1);
  });

  it("should clear all favorites", () => {
    const stateWithTwo: FavoritesState = {
      items: [sampleItem, sampleItem2],
      itemIds: ["item-1", "item-2"],
    };
    const state = favoritesReducer(stateWithTwo, clearAllFavorites());
    expect(state.items).toHaveLength(0);
    expect(state.itemIds).toHaveLength(0);
  });
});
