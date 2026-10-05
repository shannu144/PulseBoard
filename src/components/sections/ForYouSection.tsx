"use client";

import React, { useMemo } from "react";
import { Sparkles, RefreshCw, Layers, PlusCircle } from "lucide-react";
import { ContentItem } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ContentGrid } from "@/components/feed/ContentGrid";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { LiveTicker } from "@/components/feed/LiveTicker";
import { DailyBriefingBanner } from "@/components/feed/DailyBriefingBanner";
import { EmptyState } from "@/components/feed/EmptyState";
import { Button } from "@/components/ui/Button";
import {
  loadMore,
  resetPagination,
  setSearchQuery,
  setSelectedCategoryFilter,
  setSelectedType,
} from "@/store/slices/feedSlice";
import { TRANSLATIONS } from "@/utils/translations";

interface ForYouSectionProps {
  onOpenReader: (item: ContentItem) => void;
  onOpenCreatePost: () => void;
}

export const ForYouSection: React.FC<ForYouSectionProps> = ({
  onOpenReader,
  onOpenCreatePost,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.feed.items);
  const searchQuery = useAppSelector((state) => state.feed.searchQuery);
  const selectedType = useAppSelector((state) => state.feed.selectedType);
  const selectedCategoryFilter = useAppSelector(
    (state) => state.feed.selectedCategoryFilter
  );
  const sortBy = useAppSelector((state) => state.feed.sortBy);
  const page = useAppSelector((state) => state.feed.page);
  const pageSize = useAppSelector((state) => state.feed.pageSize);
  const userSelectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories
  );
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Filter and sort items dynamically
  const filteredItems = useMemo(() => {
    let result = [...items];

    // 1. User preferences filter: only show items matching user's selected preferences
    // (unless user is explicitly searching or filtering)
    if (userSelectedCategories.length > 0) {
      result = result.filter((item) =>
        userSelectedCategories.includes(item.category)
      );
    }

    // 2. Active category tab filter
    if (selectedCategoryFilter !== "all") {
      result = result.filter((item) => item.category === selectedCategoryFilter);
    }

    // 3. Active type filter (news, recommendation, social)
    if (selectedType !== "all") {
      result = result.filter((item) => item.type === selectedType);
    }

    // 4. Debounced search query
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.source.toLowerCase().includes(query) ||
          (item.author && item.author.toLowerCase().includes(query)) ||
          (item.hashtags &&
            item.hashtags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // 5. Sorting
    if (sortBy === "trending") {
      result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    } else if (sortBy === "engagement") {
      result.sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0));
    } else {
      // Newest
      result.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return result;
  }, [
    items,
    userSelectedCategories,
    selectedCategoryFilter,
    selectedType,
    searchQuery,
    sortBy,
  ]);

  // Paginated slice
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(0, page * pageSize);
  }, [filteredItems, page, pageSize]);

  const hasMore = paginatedItems.length < filteredItems.length;

  const handleResetFilters = () => {
    dispatch(setSearchQuery(""));
    dispatch(setSelectedType("all"));
    dispatch(setSelectedCategoryFilter("all"));
    dispatch(resetPagination());
  };

  return (
    <div>
      {/* Real-time Ticker & Alert Bar */}
      <LiveTicker />

      {/* Morning AI Intelligence Brief */}
      <DailyBriefingBanner />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.forYou}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              {filteredItems.length} items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Curated feed based on your subscribed topics. Click any card to read story, or drag to reorder.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            size="sm"
            onClick={onOpenCreatePost}
            className="shadow-sm shadow-indigo-500/20"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Create Story</span>
          </Button>
        </div>
      </div>

      {/* Interactive Filters Strip */}
      <FeedFilters />

      {/* Content Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <EmptyState
          type="search"
          title={t.noContentFound}
          description="Try adjusting your search keyword or selecting more categories in the settings."
          onReset={handleResetFilters}
        />
      ) : (
        <>
          <ContentGrid
            items={paginatedItems}
            enableDrag={true}
            onOpenReader={onOpenReader}
          />

          {/* Infinite Scroll / Load More Trigger */}
          {hasMore && (
            <div className="flex justify-center mt-8 mb-4">
              <Button
                variant="outline"
                size="md"
                onClick={() => dispatch(loadMore())}
                className="group"
              >
                <span>Load More Content</span>
                <span className="text-xs text-slate-400 font-mono ml-1.5">
                  ({filteredItems.length - paginatedItems.length} remaining)
                </span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
