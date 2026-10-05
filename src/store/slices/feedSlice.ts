import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ContentCategory, ContentItem, ContentType } from "@/types";
import { INITIAL_CONTENT_ITEMS } from "@/data/mockData";
import { safeStorage } from "@/utils/storage";

const ORDER_STORAGE_KEY = "pulseboard_custom_order";

export interface FeedState {
  items: ContentItem[];
  pendingRealtimeItems: ContentItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  selectedType: ContentType | "all";
  selectedCategoryFilter: ContentCategory | "all";
  sortBy: "newest" | "trending" | "engagement";
  customOrderIds: string[]; // Order saved from drag and drop
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Async Thunk to fetch unified feed from internal API routes with fallback
export const fetchFeedItems = createAsyncThunk(
  "feed/fetchFeedItems",
  async (
    params: {
      categories?: ContentCategory[];
      search?: string;
      type?: ContentType | "all";
    } = {},
    { rejectWithValue }
  ) => {
    try {
      // Attempt to fetch from API routes
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.set("q", params.search);
      if (params.type && params.type !== "all") queryParams.set("type", params.type);
      if (params.categories && params.categories.length > 0) {
        queryParams.set("categories", params.categories.join(","));
      }

      const res = await fetch(`/api/news?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          return data.items as ContentItem[];
        }
      }

      // If network fails or returns empty, fallback cleanly to rich mock data
      return INITIAL_CONTENT_ITEMS;
    } catch {
      // Clean fallback on client/SSR if API isn't yet reached
      return INITIAL_CONTENT_ITEMS;
    }
  }
);

const getInitialOrder = (): string[] => {
  return safeStorage.get<string[]>(ORDER_STORAGE_KEY, []);
};

const initialState: FeedState = {
  items: INITIAL_CONTENT_ITEMS,
  pendingRealtimeItems: [],
  status: "idle",
  error: null,
  searchQuery: "",
  selectedType: "all",
  selectedCategoryFilter: "all",
  sortBy: "newest",
  customOrderIds: getInitialOrder(),
  page: 1,
  pageSize: 9,
  hasMore: true,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1; // Reset pagination on search
    },
    setSelectedType: (state, action: PayloadAction<ContentType | "all">) => {
      state.selectedType = action.payload;
      state.page = 1;
    },
    setSelectedCategoryFilter: (state, action: PayloadAction<ContentCategory | "all">) => {
      state.selectedCategoryFilter = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<"newest" | "trending" | "engagement">) => {
      state.sortBy = action.payload;
    },
    reorderFeedItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
      state.customOrderIds = action.payload.map((item) => item.id);
      safeStorage.set(ORDER_STORAGE_KEY, state.customOrderIds);
    },
    addRealtimeItem: (state, action: PayloadAction<ContentItem>) => {
      // Add to pending real-time queue so user is not disoriented by jarring layout shift
      // User can click "New Updates Waiting" or it flows in seamlessly
      const exists = state.pendingRealtimeItems.some((item) => item.id === action.payload.id);
      if (!exists && !state.items.some((item) => item.id === action.payload.id)) {
        state.pendingRealtimeItems.unshift(action.payload);
      }
    },
    applyPendingUpdates: (state) => {
      if (state.pendingRealtimeItems.length > 0) {
        state.items = [...state.pendingRealtimeItems, ...state.items];
        state.pendingRealtimeItems = [];
      }
    },
    dismissPendingUpdates: (state) => {
      state.pendingRealtimeItems = [];
    },
    loadMore: (state) => {
      state.page += 1;
    },
    resetPagination: (state) => {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeedItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        const fetchedItems = action.payload;

        // If custom ordering exists, re-apply saved order
        if (state.customOrderIds.length > 0) {
          const itemMap = new Map(fetchedItems.map((item) => [item.id, item]));
          const ordered: ContentItem[] = [];

          state.customOrderIds.forEach((id) => {
            const item = itemMap.get(id);
            if (item) {
              ordered.push(item);
              itemMap.delete(id);
            }
          });

          // Append any remaining items that weren't in saved order
          itemMap.forEach((item) => ordered.push(item));
          state.items = ordered;
        } else {
          state.items = fetchedItems;
        }
      })
      .addCase(fetchFeedItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch content";
      });
  },
});

export const {
  setSearchQuery,
  setSelectedType,
  setSelectedCategoryFilter,
  setSortBy,
  reorderFeedItems,
  addRealtimeItem,
  applyPendingUpdates,
  dismissPendingUpdates,
  loadMore,
  resetPagination,
} = feedSlice.actions;

export default feedSlice.reducer;
