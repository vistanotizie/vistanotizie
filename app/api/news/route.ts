import { NextResponse } from "next/server";
import { mockNews } from "@/lib/mock-news";

export async function GET() {
  return NextResponse.json({ ok: true, items: mockNews });
}
