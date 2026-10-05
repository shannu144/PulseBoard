"use client";

import React, { useState } from "react";
import {
  Sliders,
  Check,
  Moon,
  Sun,
  Radio,
  Key,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ContentCategory } from "@/types";
import { CATEGORIES_CONFIG } from "@/data/mockData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleCategory,
  setDarkMode,
  setContentDensity,
  toggleRealtime,
  setApiKeys,
  resetPreferences,
  setLanguage,
} from "@/store/slices/preferencesSlice";
import { TRANSLATIONS, LanguageCode } from "@/utils/translations";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);
  const t = TRANSLATIONS[preferences.language] || TRANSLATIONS.en;

  const [newsKey, setNewsKey] = useState(preferences.customApiKeys.newsApi || "");
  const [tmdbKey, setTmdbKey] = useState(preferences.customApiKeys.tmdb || "");

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setApiKeys({ newsApi: newsKey.trim(), tmdb: tmdbKey.trim() }));
    onShowToast("API Keys Saved", "Custom keys updated for NewsAPI and TMDB.");
  };

  const handleReset = () => {
    dispatch(resetPreferences());
    setNewsKey("");
    setTmdbKey("");
    onShowToast("Settings Reset", "All preferences returned to defaults.");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.settings} maxWidth="lg">
      <div className="space-y-6 text-sm">
        {/* Category Subscriptions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>{t.categories} Subscriptions</span>
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {preferences.selectedCategories.length} selected
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Select the categories to include in your personalized “For You” feed.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES_CONFIG.map((cat) => {
              const isSelected = preferences.selectedCategories.includes(
                cat.id as ContentCategory
              );
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => dispatch(toggleCategory(cat.id as ContentCategory))}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 shadow-xs"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <span className="capitalize">{cat.label}</span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme & Display Density */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Theme */}
          <div>
            <label className="font-semibold text-slate-900 dark:text-white block mb-1">
              Color Theme
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => dispatch(setDarkMode(false))}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-medium transition-all ${
                  !preferences.darkMode
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => dispatch(setDarkMode(true))}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-medium transition-all ${
                  preferences.darkMode
                    ? "border-indigo-600 bg-indigo-950/40 text-indigo-400"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Density */}
          <div>
            <label className="font-semibold text-slate-900 dark:text-white block mb-1">
              {t.density}
            </label>
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {(["compact", "normal", "visual"] as const).map((density) => (
                <button
                  key={density}
                  type="button"
                  onClick={() => dispatch(setContentDensity(density))}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    preferences.contentDensity === density
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {density}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Streaming Toggles */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-500" />
                <span>Live Feed Ingestion</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Periodically fetch breaking news, tweets, and trending updates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(toggleRealtime())}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.enableRealtime ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.enableRealtime ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="font-semibold text-slate-900 dark:text-white block mb-1">
            Display Language
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { code: "en", label: "English" },
              { code: "es", label: "Español" },
              { code: "fr", label: "Français" },
              { code: "de", label: "Deutsch" },
              { code: "hi", label: "हिन्दी" },
            ].map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => dispatch(setLanguage(item.code as LanguageCode))}
                className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                  preferences.language === item.code
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Custom API Keys */}
        <form onSubmit={handleSaveKeys} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div>
            <label className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
              <Key className="w-4 h-4 text-slate-400" />
              <span>External API Keys (Optional)</span>
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Leave blank to use built-in high-fidelity streaming data, or add your personal API keys.
            </p>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                NewsAPI.org API Key
              </span>
              <input
                type="password"
                value={newsKey}
                onChange={(e) => setNewsKey(e.target.value)}
                placeholder="e.g. 59a12c..."
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 font-mono outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                TMDB (The Movie Database) API Key
              </span>
              <input
                type="password"
                value={tmdbKey}
                onChange={(e) => setTmdbKey(e.target.value)}
                placeholder="e.g. 9b8c..."
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 font-mono outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button type="submit" size="sm" variant="secondary">
              Save API Keys
            </Button>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-slate-400 hover:text-rose-500"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            <span>Reset Defaults</span>
          </Button>

          <Button type="button" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
