import { NextResponse } from "next/server";
import { fetchRandomGif } from "@/lib/giphy";

export async function GET() {
  try {
    const { url } = await fetchRandomGif();
    return NextResponse.redirect(url);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
