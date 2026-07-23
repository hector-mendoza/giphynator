import Link from "next/link";

const links = [
  { href: "#docs", label: "Docs" },
  { href: "#devs", label: "For Devs" },
  { href: "https://github.com/hector-mendoza/giphynator", label: "GitHub" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="text-xl">🎲</span>
          Giphynator
        </Link>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-foreground"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
