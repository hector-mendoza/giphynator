import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
