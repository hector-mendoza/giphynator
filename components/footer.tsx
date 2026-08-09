export function Footer() {
  return (
    <footer className="border-t-[3px] border-foreground bg-surface py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 text-sm font-semibold text-muted-foreground">
        <p className="text-pretty">
          Built with Next.js and the Giphy API. Fork it, break it, ship your own version.
        </p>
        <p>
          <a
            href="https://github.com/hector-mendoza/giphynator"
            target="_blank"
            rel="noreferrer"
            className="comic-heading text-lg text-accent underline decoration-foreground decoration-wavy underline-offset-4"
          >
            Source on GitHub
          </a>
          <span className="mx-2">·</span>
          <a
            href="/api/random-gif"
            className="font-mono font-bold text-accent underline decoration-foreground decoration-wavy underline-offset-4"
          >
            /api/random-gif
          </a>
        </p>
      </div>
    </footer>
  );
}
