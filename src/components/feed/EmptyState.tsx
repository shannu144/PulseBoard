import React from "react";
import { FolderSearch, HeartCrack, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  type?: "search" | "favorites" | "general";
  title?: string;
  description?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = "general",
  title,
  description,
  onReset,
}) => {
  const isFavorites = type === "favorites";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 my-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500 mb-4 shadow-sm">
        {isFavorites ? (
          <HeartCrack className="w-8 h-8 text-rose-400" />
        ) : (
          <FolderSearch className="w-8 h-8" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1.5">
        {title || (isFavorites ? "No Bookmarks Saved Yet" : "No Content Found")}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description ||
          (isFavorites
            ? "Click the heart icon on any news story, movie recommendation, or social post to bookmark it here for fast access."
            : "We couldn't find any items matching your active category or search query. Try broadening your criteria.")}
      </p>

      {onReset && (
        <Button variant="secondary" size="sm" onClick={onReset}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Reset Filters
        </Button>
      )}
    </div>
  );
};
