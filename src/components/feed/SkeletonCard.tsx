import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs animate-pulse">
      {/* Top Badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>

      {/* Image Skeleton */}
      <div className="h-44 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />

      {/* Title */}
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-4/5 mb-2" />
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/5 mb-4" />

      {/* Description */}
      <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
      <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-5" />

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
};
