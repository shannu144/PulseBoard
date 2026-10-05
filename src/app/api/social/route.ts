import { NextResponse } from "next/server";
import { INITIAL_CONTENT_ITEMS } from "@/data/mockData";

export async function GET() {
  const posts = INITIAL_CONTENT_ITEMS.filter((item) => item.type === "social");
  return NextResponse.json({
    success: true,
    total: posts.length,
    items: posts,
  });
}
