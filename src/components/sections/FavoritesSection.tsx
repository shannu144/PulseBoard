"use client";

import React, { useState, useMemo } from "react";
import {
  Heart,
  Search,
  Trash2,
  Download,
  Share2,
  Check,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAllFavorites } from "@/store/slices/favoritesSlice";
import { ContentCard } from "@/components/feed/ContentCard";
import { EmptyState } from "@/components/feed/EmptyState";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TRANSLATIONS } from "@/utils/translations";

interface FavoritesSectionProps {
  onNavigateToFeed: () => void;
  onOpenReader?: (item: ContentItem) => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  onNavigateToFeed,
  onOpenReader,
}) => {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const density = useAppSelector((state) => state.preferences.contentDensity);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [search, setSearch] = useState("");
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [exported, setExported] = useState(false);

  const filteredFavorites = useMemo(() => {
    if (!search.trim()) return favoriteItems;
    const q = search.toLowerCase();
    return favoriteItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [favoriteItems, search]);

  const handleExportJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(favoriteItems, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `pulseboard-favorites-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const gridColsClass =
    density === "compact"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
      : density === "visual"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5";

  if (favoriteItems.length === 0) {
    return (
      <EmptyState
        type="favorites"
        title={t.noFavoritesYet}
        description="Browse your personalized feed or trending topics and click the heart icon on any story, movie, or tweet to bookmark it here."
        onReset={onNavigateToFeed}
      />
    );
  }

  return (
    <div>
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <span>{t.favorites}</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {favoriteItems.length} saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your personal knowledge library persisted securely across sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportJson}>
            {exported ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                <span>Exported!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 mr-1.5" />
                <span>Export JSON</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsConfirmClearOpen(true)}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            <span>Clear All</span>
          </Button>
        </div>
      </div>

      {/* Search Bar within favorites */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter within your bookmarks..."
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-rose-500 outline-none transition-colors"
        />
      </div>

      {/* Grid of Saved Cards */}
      {filteredFavorites.length === 0 ? (
        <p className="text-center py-12 text-sm text-slate-500">
          No bookmarks match &ldquo;{search}&rdquo;.
        </p>
      ) : (
        <div className={`grid ${gridColsClass}`}>
          {filteredFavorites.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              isDragEnabled={false}
              onOpenReader={onOpenReader}
            />
          ))}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={isConfirmClearOpen}
        onClose={() => setIsConfirmClearOpen(false)}
        title="Clear All Saved Favorites?"
        maxWidth="sm"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Are you sure you want to remove all {favoriteItems.length} bookmarked items? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsConfirmClearOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              dispatch(clearAllFavorites());
              setIsConfirmClearOpen(false);
            }}
          >
            Yes, Clear All
          </Button>
        </div>
      </Modal>
    </div>
  );
};
