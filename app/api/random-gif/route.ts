import { NextResponse } from "next/server";
import { fetchRandomGif } from "@/lib/giphy";

export async function GET() {
  try {
    const result = await fetchRandomGif();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
