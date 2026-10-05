"use client";

import React from "react";
import { Compass, TrendingUp, Heart, BarChart3, Sliders } from "lucide-react";
import { ActiveTab } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/utils/translations";

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const favoriteCount = useAppSelector((state) => state.favorites.items.length);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const items = [
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as ActiveTab)}
            className={`flex flex-col items-center justify-center p-1.5 relative transition-colors ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-rose-500 text-white rounded-full text-[9px] font-bold">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
