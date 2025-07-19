import { describe, it, expect, vi } from "vitest";
import getAttractionImages from "@/services/attractionImages/getAttractionImagesService";

import fetchAttractionImage from "@/services/attractionImages/attractionImagesService";
import fetchAttractionImagesIDs from "@/services/attractionImages/attractionImagesIDsService";
import filterAttractionImagesIDs from "@/utils/filterAttractionImagesIDs";

import { mockedAttractionImagesIDs } from "../__mocks__/attractionsImagesIDsMock";
import { mockedAttractionImagesURL } from "../__mocks__/attractionImagesServiceMock";

vi.mock("@/services/attractionImages/attractionImagesIDsService");
vi.mock("@/services/attractionImages/attractionImagesService");

describe("function getAttractionImages", () => {
  it("should return an array of image URLs on success", async () => {
    vi.mocked(fetchAttractionImagesIDs).mockResolvedValue(
      mockedAttractionImagesIDs
    );
    vi.mocked(fetchAttractionImage).mockResolvedValue(
      mockedAttractionImagesURL.photoUri
    );

    const result = await getAttractionImages("Torre Eiffel", 3);

    expect(result).toEqual([
      "https://example.com/photo.png",
      "https://example.com/photo.png",
      "https://example.com/photo.png",
    ]);
  });

  it("should return the placeholder image if no photo IDs are found", async () => {
    vi.mocked(fetchAttractionImagesIDs).mockResolvedValue(null);

    const result = await getAttractionImages("Unknown place", 3);

    expect(result).toEqual(["@/assets/placeholder-image.png"]);
  });

  it("should return the placeholder image if fetching IDs fails", async () => {
    vi.mocked(fetchAttractionImagesIDs).mockRejectedValue(
      new Error("API Error")
    );

    const result = await getAttractionImages("Torre Eiffel", 3);

    expect(result).toEqual(["@/assets/placeholder-image.png"]);
  });

  it("should return the placeholder image if fetching a final image fails", async () => {
    vi.mocked(fetchAttractionImagesIDs).mockResolvedValue(
      mockedAttractionImagesIDs
    );

    vi.mocked(fetchAttractionImage).mockResolvedValue(
      "@/assets/placeholder-image.png"
    );

    const result = await getAttractionImages("Torre Eiffel", 3);

    expect(result).toEqual([
      "@/assets/placeholder-image.png",
      "@/assets/placeholder-image.png",
      "@/assets/placeholder-image.png",
    ]);
  });
});
