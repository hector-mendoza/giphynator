import { fetchRandomGif } from "@/lib/giphy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RatingBadge } from "@/components/rating-badge";
import { RefreshButton } from "@/components/refresh-button";
import { ComicSquiggle, ComicStar } from "@/components/comic-decor";

export const dynamic = "force-dynamic";

async function GifHero() {
  try {
    const { url, rating } = await fetchRandomGif();
    return (
      <figure className="animate-fade-up relative w-full max-w-xl">
        <ComicStar className="absolute -left-4 -top-6 h-8 w-8 text-burst motion-reduce:animate-none animate-float" />
        <ComicStar className="absolute -right-3 top-8 h-6 w-6 text-primary motion-reduce:animate-none animate-float [animation-delay:1s]" />
        <div className="sticker-frame overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Random GIF from Giphy"
            className="block w-full"
            width={480}
            height={270}
          />
        </div>
        <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <RatingBadge rating={rating} />
          <p className="max-w-xs text-sm font-semibold text-muted-foreground">
            Every refresh flips a coin between G and R ratings.
          </p>
        </figcaption>
      </figure>
    );
  } catch {
    return (
      <div className="sticker-frame-alt flex w-full max-w-xl flex-col items-center gap-4 px-8 py-16 text-center">
        <p className="comic-heading text-3xl">Couldn&apos;t load a GIF!</p>
        <p className="text-sm font-semibold text-muted-foreground">
          Giphy might be down, or the API key is missing locally.
        </p>
        <RefreshButton />
      </div>
    );
  }
}

const steps = [
  {
    n: "1",
    title: "Fresh on every load",
    body: "The homepage fetches a new GIF from Giphy with no caching between requests.",
    burst: false,
  },
  {
    n: "2",
    title: "G or R, coin flip",
    body: "Each request randomly picks Giphy's safest tier or its spiciest allowed rating.",
    burst: true,
  },
  {
    n: "3",
    title: "Open source",
    body: "Small Next.js app you can fork and ship.",
    burst: false,
    link: { href: "https://github.com/hector-mendoza/giphynator", label: "View the repo" },
  },
];

export default async function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative mx-auto flex max-w-3xl flex-col items-start gap-8 overflow-hidden px-5 pb-20 pt-12">
          <ComicStar className="pointer-events-none absolute right-8 top-24 h-5 w-5 text-burst-pink opacity-80" />

          <div className="max-w-lg">
            <p className="comic-heading mb-3 text-xl text-accent">POW! BAM! GIF!</p>
            <h1 className="comic-heading text-balance text-5xl leading-none sm:text-6xl">
              One page.
              <br />
              One random GIF.
            </h1>
            <ComicSquiggle className="mt-4 h-5 w-40 text-primary" />
            <p className="mt-4 max-w-md text-pretty text-base font-semibold leading-relaxed text-muted-foreground">
              Giphynator hits Giphy on every load and shows whatever comes back. No search bar,
              no categories, no account. Just chaos.
            </p>
          </div>

          <GifHero />

          <RefreshButton />
        </section>

        <section id="how" className="border-y-[3px] border-foreground bg-muted">
          <div className="mx-auto max-w-3xl px-5 py-16">
            <h2 className="comic-heading text-4xl">How it works</h2>
            <p className="mt-2 max-w-lg text-pretty font-semibold text-muted-foreground">
              Three steps. The whole app fits in an afternoon of reading.
            </p>

            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n} className="comic-panel flex flex-col gap-3 p-5">
                  <span
                    className={`comic-burst ${step.burst ? "comic-burst-pink" : ""}`}
                  >
                    {step.n}
                  </span>
                  <p className="comic-heading text-xl leading-tight">{step.title}</p>
                  <p className="text-sm font-semibold leading-relaxed text-muted-foreground">
                    {step.body}
                    {step.link ? (
                      <>
                        {" "}
                        <a
                          href={step.link.href}
                          className="font-bold text-accent underline decoration-foreground decoration-wavy underline-offset-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {step.link.label}
                        </a>
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="devs" className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="comic-heading text-4xl">For developers</h2>
          <p className="mt-2 max-w-lg text-pretty font-semibold text-muted-foreground">
            Skip the HTML. Two endpoints return JSON or redirect straight to the GIF bytes.
          </p>

          <div className="mt-8 space-y-6">
            <div className="comic-panel p-5">
              <p className="mb-3 font-mono text-sm font-bold text-accent">
                GET /api/random-gif
              </p>
              <pre className="code-block border-0 bg-background text-foreground shadow-none">
{`curl https://giphynator.vercel.app/api/random-gif

{
  "url": "https://media.giphy.com/...",
  "rating": "g"
}`}
              </pre>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                Returns JSON with the GIF URL and rating. Handy for bots, widgets, or anything that
                wants to handle the file itself.
              </p>
            </div>

            <div className="comic-panel p-5">
              <p className="mb-3 font-mono text-sm font-bold text-accent">
                GET /api/random-gif/image
              </p>
              <pre className="code-block border-0 bg-background text-foreground shadow-none">
{`curl -L https://giphynator.vercel.app/api/random-gif/image
# → 302 redirect to media.giphy.com/...gif`}
              </pre>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                Redirects to the GIF file. Drop the URL in an{" "}
                <code className="comic-outline rounded-md bg-burst px-1.5 py-0.5 font-mono text-xs font-bold text-foreground">
                  &lt;img src&gt;
                </code>
                , a README, or a Slack webhook.
              </p>
            </div>

            <div className="comic-panel p-5">
              <p className="comic-heading text-2xl">Run locally</p>
              <pre className="code-block mt-3 border-0 bg-background p-0 text-xs shadow-none">
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
