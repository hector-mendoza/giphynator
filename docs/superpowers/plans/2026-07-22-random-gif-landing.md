# Random GIF Landing + API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal Next.js app where visiting `/` shows a random Giphy GIF (rating alternates randomly between `g` and `r`), and `GET /api/random-gif` exposes the same random GIF as JSON.

**Architecture:** Next.js App Router (TypeScript). A single shared function `fetchRandomGif()` in `lib/giphy.ts` calls the Giphy random-GIF API with a randomly chosen rating; both the page (Server Component) and the API route call this function directly. No database, no client-side state, no caching layer.

**Tech Stack:** Next.js 14, React 18, TypeScript, Vitest (unit tests for `lib/giphy.ts`).

## Global Constraints

- `GIPHY_API_KEY` must be read from environment only — never hardcoded, never committed. (spec: Configuration)
- Every GIF request/page load must be fresh — no caching of the Giphy response. (spec: Goals)
- Rating alternates randomly between `"g"` and `"r"` only — no other ratings. (spec: Architecture — `lib/giphy.ts`)
- No auth, no rate limiting, no "new gif" button, no persistence. (spec: Non-goals)
- API success shape: `200 { url: string, rating: "g" | "r" }`. API error shape: `500 { error: string }`. (spec: `app/api/random-gif/route.ts`)
- Page failure fallback text: exactly `"No se pudo cargar el gif 😕"`. (spec: `app/page.tsx`)

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.mjs`
- Create: `.gitignore`
- Create: `.env.local.example`
- Create: `app/layout.tsx`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: a runnable Next.js project (`npm run dev` serves on port 3000) and a runnable test command (`npm test`).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "giphynator",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.5",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next-env.d.ts`**

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 4: Create `next.config.mjs`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.giphy.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules/
.next/
.env.local
*.log
```

- [ ] **Step 6: Create `.env.local.example`**

```
GIPHY_API_KEY=your-giphy-api-key-here
```

- [ ] **Step 7: Create `app/layout.tsx`**

```tsx
export const metadata = {
  title: "Giphynator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 9: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.mjs .gitignore .env.local.example app/layout.tsx vitest.config.ts
git commit -m "chore: scaffold Next.js project"
```

---

### Task 2: `lib/giphy.ts` — shared random GIF fetch logic

**Files:**
- Create: `lib/giphy.ts`
- Test: `lib/giphy.test.ts`

**Interfaces:**
- Consumes: `process.env.GIPHY_API_KEY`, global `fetch`.
- Produces: `fetchRandomGif(): Promise<{ url: string; rating: "g" | "r" }>` — throws `Error` on missing key or bad/failed Giphy response. This is the function Task 3 (API route) and Task 4 (page) both call.

- [ ] **Step 1: Write the failing tests**

```typescript
// lib/giphy.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchRandomGif } from "./giphy";

describe("fetchRandomGif", () => {
  const originalEnv = process.env.GIPHY_API_KEY;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.GIPHY_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env.GIPHY_API_KEY = originalEnv;
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("throws if GIPHY_API_KEY is missing", async () => {
    delete process.env.GIPHY_API_KEY;
    await expect(fetchRandomGif()).rejects.toThrow(/GIPHY_API_KEY/);
  });

  it("returns url and rating on success", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { images: { original: { url: "https://media.giphy.com/foo.gif" } } },
      }),
    }) as unknown as typeof fetch;

    const result = await fetchRandomGif();

    expect(result.url).toBe("https://media.giphy.com/foo.gif");
    expect(["g", "r"]).toContain(result.rating);
  });

  it("calls Giphy with the chosen rating and no-store cache", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { images: { original: { url: "https://media.giphy.com/foo.gif" } } },
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await fetchRandomGif();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [calledUrl, calledOptions] = fetchMock.mock.calls[0];
    expect(String(calledUrl)).toContain(`rating=${result.rating}`);
    expect(String(calledUrl)).toContain("api_key=test-key");
    expect(calledOptions).toMatchObject({ cache: "no-store" });
  });

  it("throws if Giphy responds with non-OK status", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    await expect(fetchRandomGif()).rejects.toThrow(/Giphy/);
  });

  it("throws if Giphy response is missing the expected url field", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    }) as unknown as typeof fetch;

    await expect(fetchRandomGif()).rejects.toThrow(/Giphy/);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `lib/giphy.ts` does not exist / `fetchRandomGif` is not defined.

- [ ] **Step 3: Write the implementation**

```typescript
// lib/giphy.ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 5 tests in `lib/giphy.test.ts` green.

- [ ] **Step 5: Commit**

```bash
git add lib/giphy.ts lib/giphy.test.ts
git commit -m "feat: add fetchRandomGif shared logic"
```

---

### Task 3: `GET /api/random-gif` route

**Files:**
- Create: `app/api/random-gif/route.ts`

**Interfaces:**
- Consumes: `fetchRandomGif()` from `lib/giphy.ts` (Task 2).
- Produces: HTTP `GET /api/random-gif` — `200 { url: string, rating: "g" | "r" }` on success, `500 { error: string }` on failure.

- [ ] **Step 1: Write the implementation**

```typescript
// app/api/random-gif/route.ts
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
```

- [ ] **Step 2: Manually verify success path**

Run: `npm run dev` (in one terminal, with `GIPHY_API_KEY` set in `.env.local`)
Run: `curl -i http://localhost:3000/api/random-gif` (in another terminal)
Expected: HTTP `200`, JSON body with `url` (a `https://media.giphy.com/...` link) and `rating` (`"g"` or `"r"`). Repeat 5-6 times — confirm both ratings appear across calls.

- [ ] **Step 3: Manually verify failure path**

Temporarily rename `.env.local` (e.g. `mv .env.local .env.local.bak`), restart `npm run dev`, then:
Run: `curl -i http://localhost:3000/api/random-gif`
Expected: HTTP `500`, JSON body `{ "error": "GIPHY_API_KEY is not set" }`.
Restore the key: `mv .env.local.bak .env.local` and restart `npm run dev`.

- [ ] **Step 4: Commit**

```bash
git add app/api/random-gif/route.ts
git commit -m "feat: add GET /api/random-gif endpoint"
```

---

### Task 4: `/` landing page

**Files:**
- Create: `app/page.tsx`

**Interfaces:**
- Consumes: `fetchRandomGif()` from `lib/giphy.ts` (Task 2).
- Produces: the `/` route — renders a centered GIF on success, or the fallback text `"No se pudo cargar el gif 😕"` on failure.

- [ ] **Step 1: Write the implementation**

```tsx
// app/page.tsx
import { fetchRandomGif } from "@/lib/giphy";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const { url } = await fetchRandomGif();
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt="Random gif"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </main>
    );
  } catch {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>No se pudo cargar el gif 😕</p>
      </main>
    );
  }
}
```

- [ ] **Step 2: Manually verify success path**

Run: `npm run dev` (with `GIPHY_API_KEY` set in `.env.local`)
Open `http://localhost:3000/` in a browser, reload 5-6 times.
Expected: a GIF centered on the page each time; over multiple reloads you see both tame and more explicit results (rating varies), confirming the random alternation.

- [ ] **Step 3: Manually verify failure path**

Temporarily rename `.env.local` (e.g. `mv .env.local .env.local.bak`), restart `npm run dev`, reload `http://localhost:3000/`.
Expected: page shows only the text "No se pudo cargar el gif 😕".
Restore the key: `mv .env.local.bak .env.local` and restart `npm run dev`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add random gif landing page"
```
