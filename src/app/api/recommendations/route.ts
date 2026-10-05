import { NextResponse } from "next/server";
import { INITIAL_CONTENT_ITEMS } from "@/data/mockData";

export async function GET() {
  const recommendations = INITIAL_CONTENT_ITEMS.filter((item) => item.type === "recommendation");
  return NextResponse.json({
    success: true,
    total: recommendations.length,
    items: recommendations,
  });
}
