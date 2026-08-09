import Link from "next/link";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#devs", label: "API" },
  { href: "https://github.com/hector-mendoza/giphynator", label: "GitHub", external: true },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-surface">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="comic-heading flex items-center gap-2 text-2xl text-foreground"
        >
          <span aria-hidden className="text-3xl leading-none">
            🎲
          </span>
          Giphynator
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-2 text-xs font-bold sm:text-sm">
          {links.map((link) => (
            <li key={link.href}>
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  className="comic-outline comic-shadow-sm rounded-full bg-background px-3 py-1.5 text-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  className="comic-outline comic-shadow-sm rounded-full bg-background px-3 py-1.5 text-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
