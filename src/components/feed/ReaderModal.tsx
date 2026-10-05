"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Share2,
  ExternalLink,
  Volume2,
  VolumeX,
  Type,
  Sparkles,
  Clock,
  Play,
  Pause,
  Star,
  MessageCircle,
  Repeat,
  BookmarkCheck,
  Check,
} from "lucide-react";
import { ContentItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";

interface ReaderModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string) => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({
  item,
  isOpen,
  onClose,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.itemIds);

  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const isFavorited = favoriteIds.includes(item.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(item));
    onShowToast(
      isFavorited ? "Removed from Favorites" : "Saved to Favorites",
      item.title
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShowToast("Link Copied", "Article link copied to clipboard.");
    }
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      onShowToast("Audio Reader Active", "Simulating natural AI speech reader.");
    }
  };

  const fontSizeClass =
    fontSize === "sm" ? "text-sm leading-relaxed" : fontSize === "lg" ? "text-lg leading-loose" : "text-base leading-relaxed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Reader Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Badge category={item.category}>{item.category}</Badge>
            <Badge variant="source">{item.source}</Badge>
            {item.isTrending && <Badge variant="trending">🔥 Trending</Badge>}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center p-0.5 bg-slate-200/60 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setFontSize("sm")}
                className={`px-2 py-1 rounded font-medium ${
                  fontSize === "sm" ? "bg-white dark:bg-slate-700 shadow-xs text-indigo-600" : "text-slate-500"
                }`}
                title="Smaller text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("base")}
                className={`px-2 py-1 rounded font-medium ${
                  fontSize === "base" ? "bg-white dark:bg-slate-700 shadow-xs text-indigo-600" : "text-slate-500"
                }`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-2 py-1 rounded font-medium ${
                  fontSize === "lg" ? "bg-white dark:bg-slate-700 shadow-xs text-indigo-600" : "text-slate-500"
                }`}
                title="Larger text"
              >
                A+
              </button>
            </div>

            {/* Audio Reader Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl transition-colors ${
                isPlayingAudio
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
              title={isPlayingAudio ? "Stop Audio Reader" : "Listen with AI Reader"}
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Favorite */}
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-xl transition-colors ${
                isFavorited
                  ? "text-rose-500 bg-rose-50 dark:bg-rose-950/40"
                  : "text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-rose-500"
              }`}
              title={isFavorited ? "Saved in Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header Metadata */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              {item.author && (
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  By {item.author}
                </span>
              )}
              {item.readTimeMinutes && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.readTimeMinutes} min read
                </span>
              )}
              {item.rating && (
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Rating {item.rating}/10
                </span>
              )}
              <span>Published {new Date(item.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Featured Image */}
          {item.imageUrl && (
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          {/* AI Highlights & Executive Summary Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-4 h-4" />
              <span>AI Executive Takeaways</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>Comprehensive overview curated from {item.source} covering core implications.</li>
              <li>High audience engagement velocity with key focus on {item.category} trends.</li>
              <li>Verified source telemetry with cross-network confirmation.</li>
            </ul>
          </div>

          {/* Media Player Simulation (For Recommendations/Podcasts/Music) */}
          {item.type === "recommendation" && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingMedia(!isPlayingMedia)}
                  className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white transition-transform active:scale-95 shadow-md"
                >
                  {isPlayingMedia ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <div>
                  <p className="text-xs font-bold truncate max-w-xs">{item.title}</p>
                  <p className="text-[11px] text-slate-400">
                    {isPlayingMedia ? "Streaming audio preview..." : "Interactive Preview Ready"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 h-6">
                {[40, 70, 90, 60, 80, 50, 95, 60, 40].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-indigo-400 transition-all duration-300 ${
                      isPlayingMedia ? "animate-pulse" : "opacity-30"
                    }`}
                    style={{ height: isPlayingMedia ? `${h}%` : "30%" }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Social Media Thread View (For Social Posts) */}
          {item.type === "social" && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-rose-500 font-semibold">
                  <Heart className="w-4 h-4 fill-current" /> {item.likesCount?.toLocaleString()} Likes
                </span>
                <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                  <Repeat className="w-4 h-4" /> {item.retweetsCount?.toLocaleString()} Reposts
                </span>
                <span className="flex items-center gap-1 text-indigo-500 font-semibold">
                  <MessageCircle className="w-4 h-4" /> {item.commentsCount?.toLocaleString()} Comments
                </span>
              </div>
            </div>
          )}

          {/* Main Story Narrative */}
          <div className={`space-y-4 text-slate-700 dark:text-slate-300 font-serif ${fontSizeClass}`}>
            <p className="first-letter:float-left first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:text-indigo-600">
              {item.description}
            </p>
            <p>
              Industry leaders and specialized analysts note that this development reflects a broader transition toward modular, resilient distributed paradigms. By optimizing real-time feedback loops and caching structures, performance bottlenecks are eliminated while preserving accessibility and latency targets across client devices.
            </p>
            <p>
              Furthermore, continuous user feedback and automated telemetry indicate rapid adoption. Organizations integrating these methodologies report up to 40% efficiency gains across development iterations and deployment lifecycles.
            </p>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Reader
          </Button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            <span>Visit Original Source ({item.source})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
