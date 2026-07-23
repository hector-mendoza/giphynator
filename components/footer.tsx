export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center text-sm text-muted-foreground">
        <p>
          Built with Next.js, the Giphy API, and questionable life choices.
        </p>
        <p>
          <a
            href="https://github.com/hector-mendoza/giphynator"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground"
          >
            Source on GitHub
          </a>
          {" · "}
          <a
            href="/api/random-gif"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground"
          >
            /api/random-gif
          </a>
        </p>
      </div>
    </footer>
  );
}
