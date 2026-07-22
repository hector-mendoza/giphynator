import { fetchRandomGif } from "@/lib/giphy";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const { url } = await fetchRandomGif();
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt="Random gif"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </main>
    );
  } catch {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>No se pudo cargar el gif 😕</p>
      </main>
    );
  }
}
