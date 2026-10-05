"use client";

import React from "react";
import { Modal } from "./Modal";
import { Keyboard, Command } from "lucide-react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: "/", label: "Focus Search Input" },
    { key: "D", label: "Toggle Dark / Light Mode" },
    { key: "N", label: "Create & Publish New Story" },
    { key: "1", label: "Navigate to For You Feed" },
    { key: "2", label: "Navigate to Trending" },
    { key: "3", label: "Navigate to Favorites" },
    { key: "4", label: "Navigate to Analytics & Insights" },
    { key: "S", label: "Open Settings Panel" },
    { key: "P", label: "Open User Profile" },
    { key: "?", label: "Show Keyboard Shortcuts Cheat Sheet" },
    { key: "Esc", label: "Close active modal / dialog" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" maxWidth="md">
      <div className="space-y-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          PulseBoard supports power-user keybindings for lightning fast dashboard navigation.
        </p>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="py-2.5 flex items-center justify-between text-xs"
            >
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {s.label}
              </span>
              <kbd className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold shadow-xs">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
