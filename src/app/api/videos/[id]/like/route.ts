import { NextResponse } from "next/server";
import { reactToVideo } from "@/application/use-cases";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await request.json()) as { direction?: "like" | "dislike" | "none" };
  const video = await reactToVideo(id, body.direction ?? "none");
  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(video);
}
