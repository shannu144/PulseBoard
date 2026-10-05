"use client";

import React from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { ContentItem } from "@/types";
import { ContentCard } from "./ContentCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { reorderFeedItems } from "@/store/slices/feedSlice";

interface ContentGridProps {
  items: ContentItem[];
  enableDrag?: boolean;
  onOpenReader?: (item: ContentItem) => void;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  enableDrag = true,
  onOpenReader,
}) => {
  const dispatch = useAppDispatch();
  const density = useAppSelector((state) => state.preferences.contentDensity);

  const handleReorder = (newOrder: ContentItem[]) => {
    dispatch(reorderFeedItems(newOrder));
  };

  const gridColsClass =
    density === "compact"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
      : density === "visual"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5";

  if (!enableDrag) {
    return (
      <div className={`grid ${gridColsClass}`}>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              isDragEnabled={false}
              onOpenReader={onOpenReader}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={handleReorder}
      className={`grid ${gridColsClass} list-none p-0 m-0`}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            dragListener={true}
            whileDrag={{ scale: 1.03, zIndex: 30, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="cursor-default list-none"
          >
            <ContentCard
              item={item}
              isDragEnabled={true}
              onOpenReader={onOpenReader}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
