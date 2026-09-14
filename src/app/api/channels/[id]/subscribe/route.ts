import { NextResponse } from "next/server";
import { toggleSubscribe } from "@/application/use-cases";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await request.json()) as { subscribe?: boolean };
  const channel = await toggleSubscribe(id, body.subscribe !== false);
  if (!channel) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(channel);
}
