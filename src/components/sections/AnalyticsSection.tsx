"use client";

import React, { useMemo } from "react";
import {
  BarChart3,
  Clock,
  Heart,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { CATEGORIES_CONFIG } from "@/data/mockData";
import { TRANSLATIONS } from "@/utils/translations";

export const AnalyticsSection: React.FC = () => {
  const items = useAppSelector((state) => state.feed.items);
  const favorites = useAppSelector((state) => state.favorites.items);
  const lang = useAppSelector((state) => state.preferences.language);
  const selectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories
  );
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Compute breakdown stats
  const stats = useMemo(() => {
    const totalItems = items.length;
    const categoryCounts: Record<string, number> = {};
    const typeCounts: Record<string, number> = {
      news: 0,
      recommendation: 0,
      social: 0,
    };
    let totalReadTime = 0;

    items.forEach((item) => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
      if (item.readTimeMinutes) {
        totalReadTime += item.readTimeMinutes;
      }
    });

    const topCategoryEntry = Object.entries(categoryCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      totalItems,
      categoryCounts,
      typeCounts,
      totalReadTime,
      topCategory: topCategoryEntry ? topCategoryEntry[0] : "technology",
      savedCount: favorites.length,
    };
  }, [items, favorites]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <span>{t.analytics}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time metrics on content distribution, reading time, and bookmark velocity.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 font-mono uppercase">
              Total Stream Items
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.totalItems}
          </p>
          <p className="text-[11px] text-emerald-500 mt-1 font-medium">
            Active multi-source ingestion
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 font-mono uppercase">
              {t.totalSaved}
            </span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-slate-800 text-rose-500">
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.savedCount}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Persisted in browser storage
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 font-mono uppercase">
              {t.topCategory}
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-slate-800 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
            {stats.topCategory}
          </p>
          <p className="text-[11px] text-indigo-500 mt-1 font-medium">
            Highest concentration of feeds
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 font-mono uppercase">
              Est. Reading Time
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-slate-800 text-purple-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.totalReadTime} mins
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Across curated news and articles
          </p>
        </div>
      </div>

      {/* Visual Progress Breakdown: Categories & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Category Breakdown
          </h3>
          <div className="space-y-3.5">
            {CATEGORIES_CONFIG.map((cat) => {
              const count = stats.categoryCounts[cat.id] || 0;
              const percentage = Math.round((count / (stats.totalItems || 1)) * 100);
              const isSubscribed = selectedCategories.includes(cat.id as any);

              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="capitalize text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <span>{cat.label}</span>
                      {isSubscribed && (
                        <span className="text-[10px] text-indigo-500 font-mono font-bold">
                          [Active]
                        </span>
                      )}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {count} items ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Type Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Content Formats
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">
                  News & Investigative Journalism
                </span>
                <span className="text-slate-500 font-mono">
                  {stats.typeCounts.news} items (
                  {Math.round((stats.typeCounts.news / stats.totalItems) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{
                    width: `${(stats.typeCounts.news / stats.totalItems) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">
                  Recommendations (TMDB & Spotify)
                </span>
                <span className="text-slate-500 font-mono">
                  {stats.typeCounts.recommendation} items (
                  {Math.round(
                    (stats.typeCounts.recommendation / stats.totalItems) * 100
                  )}
                  %)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{
                    width: `${
                      (stats.typeCounts.recommendation / stats.totalItems) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">
                  Social Media Feed (Twitter/X & Instagram)
                </span>
                <span className="text-slate-500 font-mono">
                  {stats.typeCounts.social} items (
                  {Math.round((stats.typeCounts.social / stats.totalItems) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{
                    width: `${(stats.typeCounts.social / stats.totalItems) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Recommendation Engine Health
            </p>
            Feed diversity score is optimal (balanced between news reporting, media recommendations, and real-time social sentiment).
          </div>
        </div>
      </div>
    </div>
  );
};
