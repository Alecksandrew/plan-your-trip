import { describe, it, expect, vi } from "vitest";
import fetchAttractionImage from "@/services/attractionImages/attractionImagesService";
import { mockedAttractionImagesURL } from "../__mocks__/attractionImagesServiceMock";

describe("fetchAttractionImage", () => {
  it("should return a photo URL on a successful fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockedAttractionImagesURL),
    });

    const result = await fetchAttractionImage("photoID123");

    expect(result).toBe(mockedAttractionImagesURL.photoUri);
  });

  it("should throw an error if the API response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    const result = await fetchAttractionImage("photoID123");

    await expect(result).toBe("@/assets/placeholder-image.png");
  });

  it("should throw an error if the fetch call fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Failure"));

    const result = await fetchAttractionImage("photoID123");

    await expect(result).toBe("@/assets/placeholder-image.png");
  });
});
