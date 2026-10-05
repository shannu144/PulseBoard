import { NextResponse } from "next/server";
import { INITIAL_CONTENT_ITEMS } from "@/data/mockData";
import { ContentCategory, ContentType } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const categoriesParam = searchParams.get("categories");
  const typeParam = searchParams.get("type") as ContentType | "all" | null;

  let items = [...INITIAL_CONTENT_ITEMS];

  // Category filtering
  if (categoriesParam) {
    const allowedCategories = categoriesParam.split(",") as ContentCategory[];
    items = items.filter((item) => allowedCategories.includes(item.category));
  }

  // Type filtering
  if (typeParam && typeParam !== "all") {
    items = items.filter((item) => item.type === typeParam);
  }

  // Keyword search
  if (q && q.trim().length > 0) {
    const term = q.trim();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.source.toLowerCase().includes(term) ||
        (item.hashtags && item.hashtags.some((tag) => tag.toLowerCase().includes(term))) ||
        (item.author && item.author.toLowerCase().includes(term))
    );
  }

  return NextResponse.json({
    success: true,
    total: items.length,
    items,
  });
}
