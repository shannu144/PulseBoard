"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Zap, Newspaper } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export const DailyBriefingBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const items = useAppSelector((state) => state.feed.items);
  const selectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories
  );

  // Pick the top news story from active categories
  const topBriefingStories = items
    .filter((i) => selectedCategories.includes(i.category))
    .slice(0, 3);

  if (topBriefingStories.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 overflow-hidden transition-all duration-300">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/40 dark:hover:bg-slate-900/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Today&apos;s AI Intelligence Briefing</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold">
                Updated Just Now
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md sm:max-w-xl">
              {topBriefingStories[0]?.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          <span className="hidden sm:inline">
            {isExpanded ? "Collapse Brief" : "Read 3 Key Bullets"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-indigo-500/15 text-xs text-slate-700 dark:text-slate-300 space-y-2.5 animate-in fade-in duration-200">
          {topBriefingStories.map((story, i) => (
            <div key={story.id} className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold font-mono shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  <span className="capitalize font-mono text-[10px] text-indigo-500 mr-1.5">
                    [{story.category}]
                  </span>
                  {story.title}
                </p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
