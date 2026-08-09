import Link from "next/link";

const links = [
  { href: "#how", label: "How it works", shortLabel: "How" },
  { href: "#devs", label: "API", shortLabel: "API" },
  {
    href: "https://github.com/hector-mendoza/giphynator",
    label: "GitHub",
    shortLabel: "GitHub",
    external: true,
  },
];

const linkClassName =
  "comic-outline comic-shadow-sm block rounded-full bg-background px-2 py-1.5 text-center text-[11px] font-bold leading-tight text-foreground transition-transform hover:-translate-y-0.5 sm:inline-block sm:px-3 sm:py-1.5 sm:text-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-surface">
      <nav className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <Link
          href="/"
          className="comic-heading flex shrink-0 items-center gap-2 text-xl text-foreground sm:text-2xl"
        >
          <span aria-hidden className="text-2xl leading-none sm:text-3xl">
            🎲
          </span>
          Giphynator
        </Link>
        <ul className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2">
          {links.map((link) => (
            <li key={link.href} className="min-w-0">
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  className={linkClassName}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sm:hidden">{link.shortLabel}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              ) : (
                <a href={link.href} className={linkClassName}>
                  <span className="sm:hidden">{link.shortLabel}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
