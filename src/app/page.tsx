"use client";

import React, { useState, useEffect } from "react";
import { ActiveTab, ContentItem } from "@/types";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ForYouSection } from "@/components/sections/ForYouSection";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { FavoritesSection } from "@/components/sections/FavoritesSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { SettingsModal } from "@/components/sections/SettingsModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { ReaderModal } from "@/components/feed/ReaderModal";
import { CreatePostModal } from "@/components/feed/CreatePostModal";
import { ShortcutsModal } from "@/components/ui/ShortcutsModal";
import { ToastContainer, ToastMessage } from "@/components/ui/NotificationToast";
import { useAppDispatch } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/preferencesSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<ActiveTab>("for-you");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<ContentItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    message?: string,
    type: "success" | "info" | "warning" = "success"
  ) => {
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

  const handleOpenReader = (item: ContentItem) => {
    setSelectedStory(item);
  };

  // Global hotkeys listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "?" || (e.shiftKey && key === "/")) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (key === "d") {
        e.preventDefault();
        dispatch(toggleDarkMode());
        showToast("Theme Toggled", "Switched display color mode.");
      } else if (key === "n") {
        e.preventDefault();
        setIsCreatePostOpen(true);
      } else if (key === "1") {
        setActiveTab("for-you");
      } else if (key === "2") {
        setActiveTab("trending");
      } else if (key === "3") {
        setActiveTab("favorites");
      } else if (key === "4") {
        setActiveTab("analytics");
      } else if (key === "s") {
        setIsSettingsOpen(true);
      } else if (key === "p") {
        setIsProfileOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

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
            {activeTab === "for-you" && (
              <ForYouSection
                onOpenReader={handleOpenReader}
                onOpenCreatePost={() => setIsCreatePostOpen(true)}
              />
            )}
            {activeTab === "trending" && (
              <TrendingSection onOpenReader={handleOpenReader} />
            )}
            {activeTab === "favorites" && (
              <FavoritesSection
                onNavigateToFeed={() => setActiveTab("for-you")}
                onOpenReader={handleOpenReader}
              />
            )}
            {activeTab === "analytics" && <AnalyticsSection />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Story Reader & Media Preview Modal */}
      <ReaderModal
        item={selectedStory}
        isOpen={Boolean(selectedStory)}
        onClose={() => setSelectedStory(null)}
        onShowToast={showToast}
      />

      {/* Create Custom Story Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onShowToast={showToast}
      />

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

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
