export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 text-sm text-muted-foreground">
        <p className="text-pretty">
          Built with Next.js and the Giphy API. Fork it, break it, ship your own version.
        </p>
        <p>
          <a
            href="https://github.com/hector-mendoza/giphynator"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
          >
            Source on GitHub
          </a>
          <span className="mx-2 text-border">·</span>
          <a
            href="/api/random-gif"
            className="font-mono text-accent underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            /api/random-gif
          </a>
        </p>
      </div>
    </footer>
  );
}
