# 🎲 Giphynator

![party parrot](https://media1.giphy.com/media/v1.Y2lkPTdmYjIzZTZhM2M2NWg5cW00cTI0dnoxM3F0dHRvMXFmamt5NmhoODFtbHg2ODVsdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3q2zVr6cu95nF6O4/giphy.gif)

You visit a website. A random GIF appears. Sometimes it's tame. Sometimes it's a little spicier. That's the whole app.

## What it does

- Open [giphynator.vercel.app](https://giphynator.vercel.app/) → get a random GIF, centered, no clutter.
- Every visit rolls the dice between Giphy's `g` (safe) and `r` (Giphy's spiciest tier — still no actual explicit content, Giphy doesn't host that) ratings.
- Refresh for a new one. That's the feature.

![typing fast](https://media4.giphy.com/media/v1.Y2lkPTdmYjIzZTZhMHJwbHpzb3QwdzljZDFhNXBhdDBuYXFndnRxNDhjMHFvd200a244aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13GIgrGdslD9oQ/giphy.gif)

*Me building this over an afternoon.*

## API

Want the GIF without the HTML? There's an endpoint for that:

```bash
curl https://giphynator.vercel.app/api/random-gif
```

```json
{ "url": "https://media.giphy.com/...", "rating": "g" }
```

## Running it locally

```bash
npm install
cp .env.local.example .env.local   # add your own GIPHY_API_KEY
npm run dev
```

Open `http://localhost:3000` and start refreshing like it owes you money.

![high five](https://media2.giphy.com/media/v1.Y2lkPTdmYjIzZTZhZHBpYmxiOG5qcnRidmVoendlOHduc2lieWtkYXoyb3pjZXZkeWZveiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wrzf9P70YWLJK/giphy.gif)

*You, after it works on the first try.*

## Stack

Next.js (App Router) + TypeScript + Vitest + the Giphy API + questionable life choices.
