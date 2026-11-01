import { NextResponse } from "next/server";
import { likeComment } from "@/application/use-cases";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const comment = await likeComment(id);
  if (!comment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(comment);
}
