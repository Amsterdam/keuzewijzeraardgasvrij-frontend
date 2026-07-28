import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "./ApiClient";

describe("ApiClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("performs a GET request against baseUrl + url", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ hello: "world" }), {
        status: 200,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient({ baseUrl: "https://example.com" });
    const result = await client.get<{ hello: string }>("/foo");

    expect(result).toEqual({ hello: "world" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/foo",
      expect.objectContaining({ method: "GET", body: undefined }),
    );
  });

  it("sends a JSON body and content-type header on POST", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient({ baseUrl: "https://example.com" });
    await client.post("/foo", { a: 1 });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ a: 1 }));
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("merges default headers with per-request headers", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient({
      baseUrl: "https://example.com",
      headers: { Authorization: "Bearer token" },
    });
    await client.get("/foo", { headers: { "X-Test": "1" } });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers).toEqual({
      Authorization: "Bearer token",
      "X-Test": "1",
    });
  });

  it("throws an error with the status and body text when the response is not ok", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("Not Found", { status: 404 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient({ baseUrl: "https://example.com" });

    await expect(client.get("/missing")).rejects.toThrow("HTTP 404: Not Found");
  });
});
