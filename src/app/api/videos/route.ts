import { NextResponse } from "next/server";
import { getHomeFeed } from "@/application/use-cases";
import type { Category } from "@/domain/entities";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") as Category) || "All";
  const feed = await getHomeFeed(category);
  return NextResponse.json(feed);
}
