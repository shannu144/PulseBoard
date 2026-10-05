import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { ContentCategory, ContentType } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  category?: ContentCategory;
  type?: ContentType;
  variant?: "category" | "type" | "trending" | "source" | "neutral";
  className?: string;
  size?: "sm" | "md";
}

const CATEGORY_COLORS: Record<ContentCategory, string> = {
  technology: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  sports: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  finance: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  entertainment: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  science: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  gaming: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const TYPE_COLORS: Record<ContentType, string> = {
  news: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  recommendation: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  social: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  category,
  type,
  variant = "neutral",
  className,
  size = "sm",
}) => {
  let colorStyles = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";

  if (category) {
    colorStyles = CATEGORY_COLORS[category];
  } else if (type) {
    colorStyles = TYPE_COLORS[type];
  } else if (variant === "trending") {
    colorStyles = "bg-gradient-to-r from-amber-500/15 to-rose-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold";
  } else if (variant === "source") {
    colorStyles = "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/60";
  }

  const sizeStyles = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1 font-medium rounded-full border tracking-wide uppercase font-mono",
          sizeStyles,
          colorStyles,
          className
        )
      )}
    >
      {children}
    </span>
  );
};
