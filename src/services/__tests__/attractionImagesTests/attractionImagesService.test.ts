import { describe, it, expect, vi } from "vitest";
import fetchAttractionImage from "@/services/attractionImages/attractionImagesService";

describe("fetchAttractionImage", () => {
  it("should return a photo URL on a successful fetch", async () => {
    const mockApiResponse = { photoUri: "https://example.com/photo.png" };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await fetchAttractionImage("photoID123");

    expect(result).toBe("https://example.com/photo.png");
  });

  it("should throw an error if the API response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    await expect(fetchAttractionImage("photoID123")).rejects.toThrow(
      "Not Found"
    );
  });

  it("should throw an error if the fetch call fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Failure"));

    await expect(fetchAttractionImage("photoID123")).rejects.toThrow(
      "Network Failure"
    );
  });
});
