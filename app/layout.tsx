import { Unbounded, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Giphynator — a random GIF and nothing else",
  description:
    "One button, one random GIF from Giphy's g→r range. Open source, with a tiny API for developers who want the GIF without the HTML.",
  metadataBase: new URL("https://giphynator.vercel.app"),
  openGraph: {
    title: "Giphynator",
    description: "A random GIF appears. That's the whole app.",
    url: "https://giphynator.vercel.app",
    siteName: "Giphynator",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
