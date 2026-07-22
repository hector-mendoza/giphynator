# Giphynator: Random GIF Landing + API

## Summary

A minimal Next.js app that shows a random GIF (Giphy) when visiting the home page, alternating randomly between work-safe (`rating=g`) and higher-rated (`rating=r`) content. The same logic is exposed as a GET API endpoint.

## Goals

- Visiting `/` shows a random GIF, centered, no other UI.
- `GET /api/random-gif` returns the same random GIF as JSON, usable independently of the page.
- Each request/page load picks a fresh GIF; rating alternates randomly between `g` and `r` on every call.
- Giphy API key is never exposed to the client and never committed to the repo.

## Non-goals

- No rate limiting, no auth, no caching layer.
- No UI beyond the bare GIF (no "new gif" button, no styling system).
- No automated test suite (manual verification only, given the scope).
- No persistence/history of shown GIFs.

## Architecture

Next.js App Router project (TypeScript).

```
giphynator/
├── app/
│   ├── page.tsx              # minimal SSR page, centered gif
│   ├── layout.tsx            # base layout
│   └── api/
│       └── random-gif/
│           └── route.ts      # GET endpoint
├── lib/
│   └── giphy.ts              # fetchRandomGif() — shared logic
├── .env.local.example
├── .gitignore
├── package.json
└── tsconfig.json
```

### `lib/giphy.ts`

Single function `fetchRandomGif()`:

- Picks `rating` randomly between `"g"` and `"r"` (`Math.random() < 0.5`).
- Calls `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&rating=${rating}`.
- Uses `cache: "no-store"` on the fetch so every call hits Giphy fresh.
- Returns `{ url, rating }`, taking `url` from `data.data.images.original.url` in Giphy's response.
- Throws a typed error if `GIPHY_API_KEY` is missing, or if the Giphy response is not OK / lacks expected fields. Callers translate this into their own error response.

### `app/api/random-gif/route.ts`

- `GET` handler calls `fetchRandomGif()`.
- Success: `200` with JSON body `{ url: string, rating: "g" | "r" }`.
- Failure: `500` with JSON body `{ error: string }`.
- No auth, no rate limiting.

### `app/page.tsx`

- Server Component. Calls `fetchRandomGif()` directly (no internal HTTP round-trip to its own API route).
- Renders the GIF centered via `<img src={url} />`, responsive sizing (e.g. `max-width: 100%; height: auto`), no other page chrome.
- On failure, renders plain text: "No se pudo cargar el gif 😕".
- Because it's a Server Component with no caching, every page load/refresh fetches a new random GIF.

## Configuration

- `GIPHY_API_KEY` read from environment (`.env.local`, gitignored). `.env.local.example` documents the variable name with a placeholder value.
- No other configuration surface.

## Error handling

| Scenario | API response | Page behavior |
|---|---|---|
| `GIPHY_API_KEY` missing | `500 { error }` | Shows fallback text |
| Giphy API error / non-2xx | `500 { error }` | Shows fallback text |
| Giphy response missing expected fields | `500 { error }` | Shows fallback text |

## Testing

Manual verification only, given scope:
- `npm run dev`, visit `/` repeatedly — confirm GIF changes and rating varies between g/r over several loads.
- Hit `GET /api/random-gif` repeatedly (browser or curl) — confirm same behavior via JSON.
- Temporarily unset `GIPHY_API_KEY` — confirm graceful error on both page and endpoint.
