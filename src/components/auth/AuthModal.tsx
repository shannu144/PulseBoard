"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Sparkles, Check, LogOut, LogIn, Edit3 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile, login, logout } from "@/store/slices/authSlice";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string) => void;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
        avatar,
      })
    );
    setIsEditing(false);
    onShowToast("Profile Updated", "Your profile details have been saved.");
  };

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      dispatch(logout());
      onShowToast("Logged Out", "You are now browsing in Guest mode.");
    } else {
      dispatch(login({ name: "Alex Rivera", email: "alex.rivera@engineering.dev" }));
      onShowToast("Logged In", "Welcome back, Alex!");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAuthenticated ? "Account & Profile" : "Sign In to PulseBoard"}
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-indigo-600 ring-4 ring-indigo-500/20 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base text-slate-900 dark:text-white truncate">
                {isAuthenticated ? user.name : "Guest Explorer"}
              </h4>
              {isAuthenticated && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {isAuthenticated ? user.email : "Sign in to persist cross-device"}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Member since {user.joinedDate}
            </p>
          </div>
        </div>

        {isAuthenticated && !isEditing ? (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                About Bio
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                {user.bio}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                Edit Profile
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthToggle}
                className="text-rose-600 hover:text-rose-700"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Sign Out
              </Button>
            </div>
          </div>
        ) : isAuthenticated && isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Choose Avatar
              </label>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {PRESET_AVATARS.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatar(url)}
                    className={`relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 transition-transform ${
                      avatar === url
                        ? "border-indigo-600 scale-105 ring-2 ring-indigo-500/40"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Details
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sign in with one click to personalize your streams, unlock favorites backup, and configure custom API keys.
            </p>
            <Button
              type="button"
              className="w-full"
              onClick={handleAuthToggle}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In as Alex Rivera
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
