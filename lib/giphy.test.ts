import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchRandomGif } from "./giphy";

describe("fetchRandomGif", () => {
  const originalEnv = process.env.GIPHY_API_KEY;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.GIPHY_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env.GIPHY_API_KEY = originalEnv;
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("throws if GIPHY_API_KEY is missing", async () => {
    delete process.env.GIPHY_API_KEY;
    await expect(fetchRandomGif()).rejects.toThrow(/GIPHY_API_KEY/);
  });

  it("returns url and rating on success", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { images: { original: { url: "https://media.giphy.com/foo.gif" } } },
      }),
    }) as unknown as typeof fetch;

    const result = await fetchRandomGif();

    expect(result.url).toBe("https://media.giphy.com/foo.gif");
    expect(["g", "r"]).toContain(result.rating);
  });

  it("calls Giphy with the chosen rating and no-store cache", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { images: { original: { url: "https://media.giphy.com/foo.gif" } } },
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await fetchRandomGif();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [calledUrl, calledOptions] = fetchMock.mock.calls[0];
    expect(String(calledUrl)).toContain(`rating=${result.rating}`);
    expect(String(calledUrl)).toContain("api_key=test-key");
    expect(calledOptions).toMatchObject({ cache: "no-store" });
  });

  it("throws if Giphy responds with non-OK status", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    await expect(fetchRandomGif()).rejects.toThrow(/Giphy/);
  });

  it("throws if Giphy response is missing the expected url field", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    }) as unknown as typeof fetch;

    await expect(fetchRandomGif()).rejects.toThrow(/Giphy/);
  });
});
