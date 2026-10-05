"use client";

import React, { useState, useMemo } from "react";
import { Flame, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { ContentCategory, ContentItem } from "@/types";
import { CATEGORIES_CONFIG } from "@/data/mockData";
import { useAppSelector } from "@/store/hooks";
import { ContentCard } from "@/components/feed/ContentCard";
import { TRANSLATIONS } from "@/utils/translations";

interface TrendingSectionProps {
  onOpenReader?: (item: ContentItem) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ onOpenReader }) => {
  const items = useAppSelector((state) => state.feed.items);
  const lang = useAppSelector((state) => state.preferences.language);
  const density = useAppSelector((state) => state.preferences.contentDensity);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [trendingCategory, setTrendingCategory] = useState<ContentCategory | "all">("all");

  const trendingList = useMemo(() => {
    let result = items.filter((item) => item.isTrending || (item.engagementScore && item.engagementScore > 85));

    if (trendingCategory !== "all") {
      result = result.filter((item) => item.category === trendingCategory);
    }

    return result.sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0));
  }, [items, trendingCategory]);

  const gridColsClass =
    density === "compact"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
      : density === "visual"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5";

  return (
    <div>
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/20 mb-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Viral & High Velocity</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.trending} Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Ranked algorithms tracking real-time community engagement, viral velocity, and audience interaction across News, TMDB and Social Networks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
              <p className="text-[11px] text-slate-400 font-mono uppercase font-semibold">
                Top Trending Item
              </p>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate max-w-[200px]">
                {trendingList[0]?.title || "Calculating..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        <button
          onClick={() => setTrendingCategory("all")}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0 ${
            trendingCategory === "all"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
          }`}
        >
          All Trending ({items.filter((i) => i.isTrending).length})
        </button>

        {CATEGORIES_CONFIG.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setTrendingCategory(cat.id as ContentCategory)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0 ${
              trendingCategory === cat.id
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Trending Cards with Rank Badges */}
      <div className={`grid ${gridColsClass}`}>
        {trendingList.map((item, index) => (
          <div key={item.id} className="relative">
            {/* Rank Badge */}
            <div className="absolute -top-2.5 -left-2.5 z-20 flex items-center justify-center w-7 h-7 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md font-mono text-xs font-bold ring-2 ring-white dark:ring-slate-900">
              #{index + 1}
            </div>
            <ContentCard
              item={item}
              isDragEnabled={false}
              onOpenReader={onOpenReader}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
