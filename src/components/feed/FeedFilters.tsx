"use client";

import React from "react";
import {
  Layers,
  Newspaper,
  Film,
  MessageSquare,
  SlidersHorizontal,
  LayoutGrid,
  Maximize2,
  Minimize2,
  ArrowUpDown,
} from "lucide-react";
import { ContentCategory, ContentType } from "@/types";
import { CATEGORIES_CONFIG } from "@/data/mockData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedType,
  setSelectedCategoryFilter,
  setSortBy,
} from "@/store/slices/feedSlice";
import { setContentDensity } from "@/store/slices/preferencesSlice";
import { TRANSLATIONS } from "@/utils/translations";

export const FeedFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector((state) => state.feed.selectedType);
  const selectedCategoryFilter = useAppSelector(
    (state) => state.feed.selectedCategoryFilter
  );
  const sortBy = useAppSelector((state) => state.feed.sortBy);
  const density = useAppSelector((state) => state.preferences.contentDensity);
  const lang = useAppSelector((state) => state.preferences.language);
  const userSelectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories
  );
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const typeTabs: { id: ContentType | "all"; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: t.all, icon: <Layers className="w-4 h-4" /> },
    { id: "news", label: t.news, icon: <Newspaper className="w-4 h-4" /> },
    {
      id: "recommendation",
      label: t.recommendations,
      icon: <Film className="w-4 h-4" />,
    },
    { id: "social", label: t.social, icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Primary Type Bar & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Feed Type Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl overflow-x-auto no-scrollbar border border-slate-200/50 dark:border-slate-700/50">
          {typeTabs.map((tab) => {
            const isActive = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => dispatch(setSelectedType(tab.id))}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Density & Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              aria-label="Sort feed items"
              onChange={(e) =>
                dispatch(
                  setSortBy(e.target.value as "newest" | "trending" | "engagement")
                )
              }
              className="bg-transparent border-none focus:outline-none cursor-pointer text-xs font-medium"
            >
              <option value="newest" className="dark:bg-slate-900">Latest Updates</option>
              <option value="trending" className="dark:bg-slate-900">Trending First</option>
              <option value="engagement" className="dark:bg-slate-900">Highest Engagement</option>
            </select>
          </div>

          {/* Density Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => dispatch(setContentDensity("compact"))}
              className={`p-1.5 rounded-lg transition-colors ${
                density === "compact"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Compact View"
              aria-label="Compact View"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => dispatch(setContentDensity("normal"))}
              className={`p-1.5 rounded-lg transition-colors ${
                density === "normal"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Standard View"
              aria-label="Standard View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => dispatch(setContentDensity("visual"))}
              className={`p-1.5 rounded-lg transition-colors ${
                density === "visual"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Visual Cards"
              aria-label="Visual Cards"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => dispatch(setSelectedCategoryFilter("all"))}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0 ${
            selectedCategoryFilter === "all"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
          }`}
        >
          {t.all}
        </button>

        {CATEGORIES_CONFIG.map((cat) => {
          const isCategoryActive = selectedCategoryFilter === cat.id;
          const isUserPreference = userSelectedCategories.includes(cat.id as ContentCategory);

          return (
            <button
              key={cat.id}
              onClick={() => dispatch(setSelectedCategoryFilter(cat.id as ContentCategory))}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0 flex items-center gap-1.5 ${
                isCategoryActive
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xs"
                  : isUserPreference
                  ? "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
                  : "bg-slate-50/70 dark:bg-slate-900/40 text-slate-400 border-slate-200/50 dark:border-slate-800/40"
              }`}
            >
              <span className="capitalize">{cat.label}</span>
              {isUserPreference && !isCategoryActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
