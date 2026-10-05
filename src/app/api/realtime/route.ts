import { NextResponse } from "next/server";
import { SAMPLE_REALTIME_UPDATES } from "@/data/mockData";
import { ContentItem } from "@/types";

export async function GET() {
  // Pick random update and stamp with current ISO timestamp
  const randomIndex = Math.floor(Math.random() * SAMPLE_REALTIME_UPDATES.length);
  const template = SAMPLE_REALTIME_UPDATES[randomIndex];

  const newItem: ContentItem = {
    ...template,
    id: `realtime-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    publishedAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    item: newItem,
  });
}
