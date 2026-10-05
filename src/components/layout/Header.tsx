"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  X,
  Sun,
  Moon,
  Globe,
  Bell,
  Settings,
  User,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/feedSlice";
import { toggleDarkMode, setLanguage } from "@/store/slices/preferencesSlice";
import { TRANSLATIONS, LanguageCode } from "@/utils/translations";

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenProfile }) => {
  const dispatch = useAppDispatch();
  const currentSearch = useAppSelector((state) => state.feed.searchQuery);
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const language = useAppSelector((state) => state.preferences.language);
  const pendingUpdates = useAppSelector((state) => state.feed.pendingRealtimeItems);
  const user = useAppSelector((state) => state.auth.user);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [localSearch, setLocalSearch] = useState(currentSearch);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Sync Redux search query to local input
  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  // Debounced search dispatch (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== currentSearch) {
        dispatch(setSearchQuery(localSearch));
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, currentSearch, dispatch]);

  // Keyboard shortcut '/' or 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setLocalSearch("");
    dispatch(setSearchQuery(""));
    searchInputRef.current?.focus();
  };

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Search Input Bar (Centered / Left Expansion) */}
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-20 py-2 text-xs sm:text-sm bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-indigo-500 rounded-xl transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          {localSearch ? (
            <button
              onClick={handleClearSearch}
              className="absolute right-10 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-3.5 hidden sm:flex items-center gap-0.5 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200/60 dark:bg-slate-700/60 rounded border border-slate-300 dark:border-slate-600">
                /
              </kbd>
            </div>
          )}
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-4">
        {/* Language Switcher */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 text-xs"
            title="Change Language"
            aria-label="Change Language"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline font-mono uppercase text-[11px] font-semibold">
              {language}
            </span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    dispatch(setLanguage(item.code));
                    setShowLangMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                    language === item.code
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </span>
                  {language === item.code && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-transform active:scale-95"
          title={darkMode ? t.lightMode : t.darkMode}
          aria-label={darkMode ? t.lightMode : t.darkMode}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title={t.settings}
          aria-label={t.settings}
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* User Account / Profile */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          aria-label="User Account"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-indigo-600 ring-2 ring-indigo-500/30">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-white m-auto mt-1.5" />
            )}
          </div>
          <span className="hidden lg:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
            {user.name.split(" ")[0]}
          </span>
        </button>
      </div>
    </header>
  );
};
