import Link from "next/link";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#devs", label: "API" },
  { href: "https://github.com/hector-mendoza/giphynator", label: "GitHub", external: true },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-foreground"
        >
          Giphynator
        </Link>
        <ul className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
          {links.map((link) => (
            <li key={link.href}>
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <a href={link.href} className="transition-colors hover:text-foreground">
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
