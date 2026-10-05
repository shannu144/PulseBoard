"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, RefreshCw, Zap, BellRing } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addRealtimeItem,
  applyPendingUpdates,
  dismissPendingUpdates,
} from "@/store/slices/feedSlice";
import { TRANSLATIONS } from "@/utils/translations";

export const LiveTicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const enableRealtime = useAppSelector((state) => state.preferences.enableRealtime);
  const realtimeSpeed = useAppSelector((state) => state.preferences.realtimeSpeedSeconds);
  const pendingItems = useAppSelector((state) => state.feed.pendingRealtimeItems);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Poll / simulate real-time live events periodically when enabled
  useEffect(() => {
    if (!enableRealtime) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/realtime");
        if (res.ok) {
          const data = await res.json();
          if (data.item) {
            dispatch(addRealtimeItem(data.item));
          }
        }
      } catch (e) {
        // Fallback or offline silence
      }
    }, Math.max(realtimeSpeed, 10) * 1000);

    return () => clearInterval(interval);
  }, [enableRealtime, realtimeSpeed, dispatch]);

  return (
    <div className="mb-4">
      {/* Live Badge Strip */}
      <div className="flex items-center justify-between py-2 px-3.5 rounded-xl bg-slate-900/5 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                enableRealtime ? "bg-emerald-400" : "bg-slate-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                enableRealtime ? "bg-emerald-500" : "bg-slate-500"
              }`}
            />
          </span>
          <span className="font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-[11px] font-mono">
            {enableRealtime ? "LIVE STREAM ACTIVE" : "STREAM PAUSED"}
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
            Synchronizing News, TMDB & Social media posts
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">
            Sync every {realtimeSpeed}s
          </span>
        </div>
      </div>

      {/* Pending Items Floating Alert */}
      <AnimatePresence>
        {pendingItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 flex items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300 font-medium">
              <BellRing className="w-4 h-4 animate-bounce text-indigo-600" />
              <span>
                {pendingItems.length} {t.newUpdatesAvailable}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(applyPendingUpdates())}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.refreshNow}</span>
              </button>
              <button
                onClick={() => dispatch(dismissPendingUpdates())}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
