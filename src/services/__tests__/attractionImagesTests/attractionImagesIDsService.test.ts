import { describe, it, expect, vi } from "vitest";
import fetchAttractionImagesIDs from "@/services/attractionImages/attractionImagesIDsService";

describe("fetchAttractionImagesIDs", () => {
  it("should return photo IDs on a successful fetch", async () => {
    const mockApiResponse = {
      places: [{ photos: [{ name: "id1" }, { name: "id2" }] }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await fetchAttractionImagesIDs("Eiffel Tower");

    expect(result).toEqual(mockApiResponse);
  });

  it("should throw an error if the API response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    await expect(
      fetchAttractionImagesIDs("Place That Does Not Exist")
    ).rejects.toThrow("Not Found");
  });

  it("should throw an error if the fetch call fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error());

    await expect(fetchAttractionImagesIDs("Eiffel Tower")).rejects.toThrow();
  });
});
