import { fetchRandomGif } from "@/lib/giphy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RatingBadge } from "@/components/rating-badge";
import { RefreshButton } from "@/components/refresh-button";

export const dynamic = "force-dynamic";

async function GifHero() {
  try {
    const { url, rating } = await fetchRandomGif();
    return (
      <figure className="animate-fade-up w-full max-w-xl">
        <div className="sticker-frame overflow-hidden rounded-xl border-2 border-foreground bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Random GIF from Giphy"
            className="block w-full"
            width={480}
            height={270}
          />
        </div>
        <figcaption className="mt-4 flex items-center justify-between gap-4">
          <RatingBadge rating={rating} />
          <p className="text-sm text-muted-foreground">
            Every refresh picks between G and R ratings.
          </p>
        </figcaption>
      </figure>
    );
  } catch {
    return (
      <div className="sticker-frame-alt flex w-full max-w-xl flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-8 py-16 text-center">
        <p className="font-display text-lg font-semibold">Couldn&apos;t load a GIF</p>
        <p className="text-sm text-muted-foreground">
          Giphy might be down, or the API key is missing locally.
        </p>
        <RefreshButton />
      </div>
    );
  }
}

export default async function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="mx-auto flex max-w-3xl flex-col items-start gap-8 px-5 pb-20 pt-14">
          <div className="max-w-lg">
            <h1 className="font-display text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              One page.
              <br />
              One random GIF.
            </h1>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              Giphynator hits Giphy on every load and shows whatever comes back. No search bar,
              no categories, no account.
            </p>
          </div>

          <GifHero />

          <RefreshButton />
        </section>

        <section id="how" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-16">
            <h2 className="font-display text-2xl font-bold tracking-tight">How it works</h2>
            <p className="mt-2 max-w-lg text-pretty text-muted-foreground">
              Three steps, all server-side. The whole app fits in an afternoon of reading.
            </p>

            <ol className="mt-10 grid gap-8 sm:grid-cols-3">
              <li className="flex flex-col gap-2">
                <span className="font-display text-3xl font-extrabold text-primary">1</span>
                <p className="font-semibold text-foreground">Fresh on every load</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The homepage fetches a new GIF from Giphy with no caching between requests.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-display text-3xl font-extrabold text-primary">2</span>
                <p className="font-semibold text-foreground">G or R, coin flip</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Each request randomly picks Giphy&apos;s safest tier or its spiciest allowed rating.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-display text-3xl font-extrabold text-primary">3</span>
                <p className="font-semibold text-foreground">Open source</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Small Next.js app you can fork and ship.{" "}
                  <a
                    href="https://github.com/hector-mendoza/giphynator"
                    className="font-medium text-accent underline decoration-border underline-offset-2 hover:decoration-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the repo
                  </a>
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section id="devs" className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight">For developers</h2>
          <p className="mt-2 max-w-lg text-pretty text-muted-foreground">
            Skip the HTML. Two endpoints return JSON or redirect straight to the GIF bytes.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-2 font-mono text-sm font-medium text-accent">
                GET /api/random-gif
              </p>
              <pre className="code-block text-foreground">
{`curl https://giphynator.vercel.app/api/random-gif

{
  "url": "https://media.giphy.com/...",
  "rating": "g"
}`}
              </pre>
              <p className="mt-2 text-sm text-muted-foreground">
                Returns JSON with the GIF URL and rating. Handy for bots, widgets, or anything that
                wants to handle the file itself.
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-sm font-medium text-accent">
                GET /api/random-gif/image
              </p>
              <pre className="code-block text-foreground">
{`curl -L https://giphynator.vercel.app/api/random-gif/image
# → 302 redirect to media.giphy.com/...gif`}
              </pre>
              <p className="mt-2 text-sm text-muted-foreground">
                Redirects to the GIF file. Drop the URL in an{" "}
                <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-foreground">
                  &lt;img src&gt;
                </code>
                , a README, or a Slack webhook.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="font-semibold text-foreground">Run locally</p>
              <pre className="code-block mt-3 border-0 bg-background p-0 text-xs">
{`npm install
cp .env.local.example .env.local   # add your GIPHY_API_KEY
npm run dev`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
