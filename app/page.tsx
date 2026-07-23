import { fetchRandomGif } from "@/lib/giphy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { AnimatedSpan, Terminal } from "@/components/magicui/terminal";

export const dynamic = "force-dynamic";

async function Gif() {
  try {
    const { url, rating } = await fetchRandomGif();
    return (
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <BorderBeam duration={8} size={250} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="Random gif" className="w-full" />
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-mono uppercase tracking-wide text-muted-foreground backdrop-blur-sm">
          rating: {rating}
        </span>
      </div>
    );
  } catch {
    return (
      <div className="flex w-full max-w-lg items-center justify-center rounded-2xl border border-white/10 bg-black/30 p-16 text-center text-muted-foreground">
        Couldn&apos;t load a gif right now 😕
      </div>
    );
  }
}

export default async function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative flex flex-col items-center gap-8 overflow-hidden px-6 pb-24 pt-16 text-center">
          <DotPattern />
          <AnimatedGradientText>
            🎲 refresh for chaos — every visit is a new gif
          </AnimatedGradientText>
          <h1 className="max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            One button.
            <br />
            One random GIF.
          </h1>
          <p className="max-w-md text-balance text-muted-foreground">
            Giphynator rolls the dice across Giphy&apos;s <code className="font-mono text-foreground">g</code> and{" "}
            <code className="font-mono text-foreground">r</code> ratings and hands you whatever it lands on. No
            search bar, no clutter, no explanations.
          </p>

          <Gif />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/">
              <ShimmerButton>Refresh for another gif</ShimmerButton>
            </a>
            <a
              href="#devs"
              className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              I&apos;m a developer 👀
            </a>
          </div>
        </section>

        {/* Docs */}
        <section id="docs" className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three moving parts. That&apos;s the entire product.
            </p>
          </div>
          <BentoGrid>
            <BentoCard
              name="Random on every load"
              description="The homepage fetches a fresh gif from Giphy server-side on every request — no caching, no repeats between refreshes."
              icon={<span className="text-2xl">🔁</span>}
            />
            <BentoCard
              name="g→r rating roll"
              description="Each request flips a coin between Giphy's safest tier (g) and its spiciest (r) — still nothing explicit, Giphy doesn't host that."
              icon={<span className="text-2xl">🎯</span>}
            />
            <BentoCard
              name="Open source"
              description="The whole thing is a small Next.js app you can read end to end in an afternoon. Fork it, break it, ship your own version."
              icon={<span className="text-2xl">📦</span>}
              href="https://github.com/hector-mendoza/giphynator"
              cta="View source"
            />
          </BentoGrid>
        </section>

        {/* For devs */}
        <section id="devs" className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">For the curious devs 👀</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Want the gif without the HTML? There are two endpoints. No auth, no rate-limit headers to
              parse, no SDK required.
            </p>
          </div>

          <Terminal className="max-w-xl">
            <AnimatedSpan delay={0} className="text-muted-foreground">
              <span>$ curl https://giphynator.vercel.app/api/random-gif</span>
            </AnimatedSpan>
            <AnimatedSpan delay={300} className="text-green-400">
              <span>{"{"}</span>
            </AnimatedSpan>
            <AnimatedSpan delay={450} className="pl-4 text-green-400">
              <span>&quot;url&quot;: &quot;https://media.giphy.com/...&quot;,</span>
            </AnimatedSpan>
            <AnimatedSpan delay={600} className="pl-4 text-green-400">
              <span>&quot;rating&quot;: &quot;g&quot;</span>
            </AnimatedSpan>
            <AnimatedSpan delay={750} className="text-green-400">
              <span>{"}"}</span>
            </AnimatedSpan>
            <AnimatedSpan delay={1000} className="mt-4 text-muted-foreground">
              <span># or redirect straight to the image bytes</span>
            </AnimatedSpan>
            <AnimatedSpan delay={1150} className="text-muted-foreground">
              <span>$ curl -L https://giphynator.vercel.app/api/random-gif/image</span>
            </AnimatedSpan>
            <AnimatedSpan delay={1400} className="text-purple-300">
              <span>↳ 302 → media.giphy.com/...gif</span>
            </AnimatedSpan>
          </Terminal>

          <div className="grid w-full gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-sm text-purple-300">GET /api/random-gif</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Returns JSON: <code className="text-foreground">{`{ url, rating }`}</code>. Good for bots,
                widgets, or anything that wants to decide what to do with the gif itself.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-sm text-purple-300">GET /api/random-gif/image</p>
              <p className="mt-2 text-sm text-muted-foreground">
                302-redirects straight to the gif file. Drop it in an{" "}
                <code className="text-foreground">&lt;img src&gt;</code>, a README, or a Slack webhook.
              </p>
            </div>
          </div>

          <div className="w-full max-w-xl rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">Run it locally</p>
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
{`npm install
cp .env.local.example .env.local   # add your GIPHY_API_KEY
npm run dev`}
            </pre>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
