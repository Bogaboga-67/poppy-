import { NextResponse } from "next/server";
import { searchVideos } from "@/application/use-cases";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const results = await searchVideos(q);
  return NextResponse.json(results);
}
