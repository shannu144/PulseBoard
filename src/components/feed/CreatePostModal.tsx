"use client";

import React, { useState } from "react";
import { PlusCircle, Image as ImageIcon, Tag, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ContentCategory, ContentItem, ContentType } from "@/types";
import { CATEGORIES_CONFIG } from "@/data/mockData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewPost } from "@/store/slices/feedSlice";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ContentCategory>("technology");
  const [type, setType] = useState<ContentType>("news");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const hashtags = tags
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const newPostItem: ContentItem = {
      id: `custom-post-${Date.now()}`,
      type,
      category,
      source: type === "social" ? "Twitter/X" : type === "recommendation" ? "Spotify" : "TechCrunch",
      title: title.trim(),
      description: description.trim(),
      url: "https://example.com/custom-post",
      imageUrl:
        imageUrl.trim() ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      author: user.name,
      avatarUrl: user.avatar,
      handle: `@${user.name.toLowerCase().replace(/\s+/g, "_")}`,
      readTimeMinutes: Math.max(1, Math.ceil(description.split(" ").length / 50)),
      likesCount: 1,
      retweetsCount: 0,
      commentsCount: 0,
      hashtags: hashtags.length > 0 ? hashtags : ["#personalized", "#pulseboard"],
      isTrending: false,
      engagementScore: 90,
    };

    dispatch(addNewPost(newPostItem));
    onShowToast("Post Published to Feed", "Your custom story is now live in your personalized feed.");
    // Reset fields & close
    setTitle("");
    setDescription("");
    setImageUrl("");
    setTags("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publish to Your Feed" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type & Category Selection */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Format Type
            </label>
            <select
              value={type}
              aria-label="Format Type"
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
            >
              <option value="news">News Article</option>
              <option value="recommendation">Recommendation (Music/Movie)</option>
              <option value="social">Social Thought</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              aria-label="Category"
              onChange={(e) => setCategory(e.target.value as ContentCategory)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 capitalize"
            >
              {CATEGORIES_CONFIG.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Headline / Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Building High-Performance Reactive Dashboards in 2026"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Description / Content */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Story Description / Post Body *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your perspective, research findings, or recommendations..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Image URL & Hashtags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Image URL (Optional)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Hashtags (Optional)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="#frontend #tech #ai"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            Publish Story
          </Button>
        </div>
      </form>
    </Modal>
  );
};
