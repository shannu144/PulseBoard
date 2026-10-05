"use client";

import React, { useState } from "react";
import { ActiveTab } from "@/types";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ForYouSection } from "@/components/sections/ForYouSection";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { FavoritesSection } from "@/components/sections/FavoritesSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { SettingsModal } from "@/components/sections/SettingsModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { ToastContainer, ToastMessage } from "@/components/ui/NotificationToast";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("for-you");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: "success" | "info" | "warning" = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === "settings") {
      setIsSettingsOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#090d16]">
      {/* Sidebar Navigation (Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Sticky Header with Search, Language, Dark Mode & Profile */}
        <Header
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "for-you" && <ForYouSection />}
            {activeTab === "trending" && <TrendingSection />}
            {activeTab === "favorites" && (
              <FavoritesSection onNavigateToFeed={() => setActiveTab("for-you")} />
            )}
            {activeTab === "analytics" && <AnalyticsSection />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onShowToast={(title, msg) => showToast(title, msg, "success")}
      />

      {/* Profile & Auth Modal */}
      <AuthModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onShowToast={(title, msg) => showToast(title, msg, "success")}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
