"use client";

import React from "react";
import {
  Compass,
  TrendingUp,
  Heart,
  BarChart3,
  Sliders,
  Sparkles,
  Check,
  Zap,
} from "lucide-react";
import { ActiveTab, ContentCategory } from "@/types";
import { CATEGORIES_CONFIG } from "@/data/mockData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCategory } from "@/store/slices/preferencesSlice";
import { TRANSLATIONS } from "@/utils/translations";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenProfile,
}) => {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories
  );
  const favoriteCount = useAppSelector((state) => state.favorites.items.length);
  const user = useAppSelector((state) => state.auth.user);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = [
    { id: "for-you", label: t.forYou, icon: Compass },
    { id: "trending", label: t.trending, icon: TrendingUp },
    {
      id: "favorites",
      label: t.favorites,
      icon: Heart,
      badge: favoriteCount > 0 ? favoriteCount : undefined,
    },
    { id: "analytics", label: t.analytics, icon: BarChart3 },
    { id: "settings", label: t.settings, icon: Sliders },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 p-5 shrink-0 select-none transition-colors">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25">
          <Zap className="w-5 h-5 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            {t.appName}
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              v2.0
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {t.tagline}
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1 mb-8">
        <p className="px-3 text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-400 mb-2">
          Feeds & Insights
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-mono font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Category Subscriptions */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
        <div className="flex items-center justify-between px-3 mb-2">
          <p className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-400">
            {t.categories} ({selectedCategories.length})
          </p>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id as ContentCategory);
          return (
            <button
              key={cat.id}
              onClick={() => dispatch(toggleCategory(cat.id as ContentCategory))}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                isSelected
                  ? "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
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

      {/* User Footer Profile */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 mt-4">
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-indigo-600 relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          </div>
        </button>
      </div>
    </aside>
  );
};
