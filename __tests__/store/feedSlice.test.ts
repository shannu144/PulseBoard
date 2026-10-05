import feedReducer, {
  setSearchQuery,
  setSelectedType,
  setSelectedCategoryFilter,
  setSortBy,
  reorderFeedItems,
  addRealtimeItem,
  applyPendingUpdates,
  dismissPendingUpdates,
  loadMore,
  FeedState,
} from "@/store/slices/feedSlice";
import { ContentItem } from "@/types";

describe("feedSlice", () => {
  const itemA: ContentItem = {
    id: "a",
    type: "news",
    category: "technology",
    source: "TechCrunch",
    title: "Article A",
    description: "Description A",
    url: "https://a.com",
    imageUrl: "https://a.com/img.jpg",
    publishedAt: new Date().toISOString(),
  };

  const itemB: ContentItem = {
    id: "b",
    type: "social",
    category: "finance",
    source: "Twitter/X",
    title: "Post B",
    description: "Description B",
    url: "https://b.com",
    imageUrl: "https://b.com/img.jpg",
    publishedAt: new Date().toISOString(),
  };

  const baseState: FeedState = {
    items: [itemA, itemB],
    pendingRealtimeItems: [],
    status: "idle",
    error: null,
    searchQuery: "",
    selectedType: "all",
    selectedCategoryFilter: "all",
    sortBy: "newest",
    customOrderIds: [],
    page: 1,
    pageSize: 9,
    hasMore: true,
  };

  it("should update search query and reset page", () => {
    const modifiedState = { ...baseState, page: 3 };
    const state = feedReducer(modifiedState, setSearchQuery("quantum"));
    expect(state.searchQuery).toBe("quantum");
    expect(state.page).toBe(1);
  });

  it("should filter by type", () => {
    const state = feedReducer(baseState, setSelectedType("news"));
    expect(state.selectedType).toBe("news");
  });

  it("should reorder feed items via drag and drop and persist order IDs", () => {
    const reordered = [itemB, itemA];
    const state = feedReducer(baseState, reorderFeedItems(reordered));
    expect(state.items[0].id).toBe("b");
    expect(state.items[1].id).toBe("a");
    expect(state.customOrderIds).toEqual(["b", "a"]);
  });

  it("should queue real-time items without immediately shifting current view", () => {
    const newItem: ContentItem = {
      id: "realtime-1",
      type: "news",
      category: "science",
      source: "Wired",
      title: "Space Discovery",
      description: "Telescope update",
      url: "https://wired.com",
      imageUrl: "https://wired.com/img.jpg",
      publishedAt: new Date().toISOString(),
    };

    const state = feedReducer(baseState, addRealtimeItem(newItem));
    expect(state.pendingRealtimeItems).toHaveLength(1);
    expect(state.items).toHaveLength(2); // Items unchanged until applied

    const appliedState = feedReducer(state, applyPendingUpdates());
    expect(appliedState.items).toHaveLength(3);
    expect(appliedState.items[0].id).toBe("realtime-1");
    expect(appliedState.pendingRealtimeItems).toHaveLength(0);
  });

  it("should increment page when loadMore is triggered", () => {
    const state = feedReducer(baseState, loadMore());
    expect(state.page).toBe(2);
  });
});
