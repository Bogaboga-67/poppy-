import { NextResponse } from "next/server";
import { addComment } from "@/application/use-cases";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await request.json()) as { text?: string; parentId?: string | null };
  try {
    const comment = await addComment(id, body.text ?? "", body.parentId ?? null);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
