"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ExternalLink,
  Share2,
  Clock,
  Star,
  MessageCircle,
  Repeat,
  GripVertical,
  Play,
  BookmarkCheck,
  Check,
} from "lucide-react";
import { ContentItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { TRANSLATIONS } from "@/utils/translations";

interface ContentCardProps {
  item: ContentItem;
  isDragEnabled?: boolean;
  onShare?: (item: ContentItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  isDragEnabled = false,
  onShare,
}) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.itemIds);
  const density = useAppSelector((state) => state.preferences.contentDensity);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const isFavorited = favoriteIds.includes(item.id);
  const [copied, setCopied] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (onShare) onShare(item);
  };

  const formattedDate = new Date(item.publishedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const isCompact = density === "compact";
  const isVisual = density === "visual";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 overflow-hidden ${
        isCompact ? "p-3.5" : "p-4 sm:p-5"
      }`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isDragEnabled && (
              <span
                className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 -ml-1 rounded transition-colors"
                title={t.dragToReorder}
              >
                <GripVertical className="w-4 h-4" />
              </span>
            )}
            <Badge category={item.category}>{item.category}</Badge>
            <Badge variant="source">{item.source}</Badge>
            {item.isTrending && <Badge variant="trending">🔥 Trending</Badge>}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShareClick}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={copied ? "Copied!" : "Share link"}
              aria-label="Share"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg transition-transform active:scale-90 ${
                isFavorited
                  ? "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  : "text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={isFavorited ? t.removeFavorite : t.markFavorite}
              aria-label={isFavorited ? t.removeFavorite : t.markFavorite}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Optional Media Image Header */}
        {item.imageUrl && !isCompact && (
          <div
            className={`relative w-full rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800 ${
              isVisual ? "h-52" : "h-40"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {item.rating && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-400 text-xs font-semibold shadow-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>
        )}

        {/* Social Author Bar */}
        {item.type === "social" && (
          <div className="flex items-center gap-2.5 mb-2.5">
            {item.avatarUrl && (
              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                <Image
                  src={item.avatarUrl}
                  alt={item.author || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {item.author}
              </p>
              <p className="text-[11px] text-slate-400 truncate">{item.handle}</p>
            </div>
          </div>
        )}

        {/* Title */}
        <h3
          className={`font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 ${
            isCompact ? "text-sm mb-1.5" : "text-base mb-2"
          }`}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={`text-slate-600 dark:text-slate-400 leading-relaxed ${
            isCompact ? "text-xs line-clamp-2 mb-2" : "text-xs sm:text-sm line-clamp-3 mb-3"
          }`}
        >
          {item.description}
        </p>

        {/* Hashtags for Social */}
        {item.hashtags && item.hashtags.length > 0 && !isCompact && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-indigo-500 dark:text-indigo-400 hover:underline font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer with Meta & CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {item.type === "news" && item.readTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.readTimeMinutes} min</span>
            </span>
          )}

          {item.type === "social" && (
            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" />
                <span>{item.likesCount?.toLocaleString()}</span>
              </span>
              {item.retweetsCount !== undefined && (
                <span className="flex items-center gap-1">
                  <Repeat className="w-3 h-3 text-emerald-400" />
                  <span>{item.retweetsCount.toLocaleString()}</span>
                </span>
              )}
            </div>
          )}

          {item.type === "recommendation" && item.mediaType && (
            <span className="capitalize font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              {item.mediaType}
            </span>
          )}

          <span className="hidden sm:inline">{formattedDate}</span>
        </div>

        {/* Action Button */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group-hover:translate-x-0.5 transition-all"
        >
          {item.type === "recommendation" ? (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>{t.playNow}</span>
            </>
          ) : item.type === "social" ? (
            <>
              <ExternalLink className="w-3 h-3" />
              <span>{t.viewPost}</span>
            </>
          ) : (
            <>
              <span>{t.readMore}</span>
              <ExternalLink className="w-3 h-3" />
            </>
          )}
        </a>
      </div>
    </motion.div>
  );
};
