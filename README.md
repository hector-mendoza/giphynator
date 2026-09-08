# Giphynator

**One page. One random GIF. Zero friction.**

Giphynator is a minimal, production-ready experience that delivers a fresh GIF from Giphy on every visit. No accounts, no search, no clutter — just a centered image and a refresh when you want another roll.

Live at **[giphynator.vercel.app](https://giphynator.vercel.app)**

---

## Overview

Each request hits the Giphy Random API and returns a single GIF. Rating is chosen at random between **G** (general audience) and **R** (Giphy’s highest allowed tier — still within platform guidelines, no explicit content).

| | |
|---|---|
| **Experience** | Full-screen landing with instant GIF delivery |
| **Refresh** | One click for a new random result |
| **API** | JSON and direct image endpoints for integrations |
| **Stack** | Next.js 14 · TypeScript · Tailwind CSS · Vitest |

---

## Quick start

```bash
git clone https://github.com/hector-mendoza/giphynator.git
cd giphynator
npm install
cp .env.local.example .env.local
```

Add your [Giphy API key](https://developers.giphy.com/) to `.env.local`:

```env
GIPHY_API_KEY=your-giphy-api-key-here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API

Two endpoints for programmatic access — embed in apps, bots, READMEs, or webhooks without rendering the full page.

### `GET /api/random-gif`

Returns JSON with the GIF URL and rating.

```bash
curl https://giphynator.vercel.app/api/random-gif
```

```json
{
  "url": "https://media.giphy.com/media/.../giphy.gif",
  "rating": "g"
}
```

### `GET /api/random-gif/image`

Redirects (`302`) directly to the GIF file on Giphy’s CDN.

```bash
curl -L https://giphynator.vercel.app/api/random-gif/image
```

Use as an `<img src>` URL, Slack webhook image, or any context that expects a direct media link.

---

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm test` | Run Vitest unit tests |

---

## Architecture

```
app/
├── page.tsx                 # Landing page — fetches and displays a random GIF
├── api/random-gif/          # JSON endpoint
└── api/random-gif/image/    # Redirect endpoint

lib/
└── giphy.ts                 # Giphy Random API client
```

The core logic lives in a single module (`lib/giphy.ts`): pick a rating, call Giphy’s random endpoint, return the original image URL. Both API routes and the homepage share this function.

---

## License

Open source. Fork it, extend it, ship your own version.
