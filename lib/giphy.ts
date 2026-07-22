export type GiphyRating = "g" | "r";

export interface RandomGifResult {
  url: string;
  rating: GiphyRating;
}

const RATINGS: GiphyRating[] = ["g", "r"];

function pickRandomRating(): GiphyRating {
  return RATINGS[Math.floor(Math.random() * RATINGS.length)];
}

export async function fetchRandomGif(): Promise<RandomGifResult> {
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) {
    throw new Error("GIPHY_API_KEY is not set");
  }

  const rating = pickRandomRating();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=${rating}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Giphy request failed with status ${response.status}`);
  }

  const body = await response.json();
  const gifUrl = body?.data?.images?.original?.url;

  if (typeof gifUrl !== "string" || gifUrl.length === 0) {
    throw new Error("Giphy response did not include a gif url");
  }

  return { url: gifUrl, rating };
}
