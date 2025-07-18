import filterAttractionImagesIDs from "@/utils/filterAttractionImagesIDs";
import { describe, it, expect } from "vitest";

describe("function filterAttractionImagesIDs", () => {
  const mockBackendResponse = {
    places: [
      {
        photos: [
          { name: "photo_id_1" },
          { name: "photo_id_2" },
          { name: "photo_id_3" },
          { name: "photo_id_4" },
          { name: "photo_id_5" },
        ],
      },
    ],
  };

  it("should filter the correct amount of images", () => {
    const result = filterAttractionImagesIDs(mockBackendResponse, 3);

    expect(result).toEqual(["photo_id_1", "photo_id_2", "photo_id_3"]);
  });

  it("should handle well even if there are less IDs than will be sliced", () => {
    const result = filterAttractionImagesIDs(mockBackendResponse, 10);

    expect(result).toEqual([
      "photo_id_1",
      "photo_id_2",
      "photo_id_3",
      "photo_id_4",
      "photo_id_5",
    ]);
  });

  it("should return an empty array if there are no photos available", () => {
    const noPhotos = {
      places: [{ photos: [] }],
    };
    const result = filterAttractionImagesIDs(noPhotos, 5);

    expect(result).toEqual([]);
  });

  it("it should return a empty array if name property is undefined", () => {
    const mockBackendResponseNoName = {
      places: [
        {
          photos: [],
        },
      ],
    };

    const result = filterAttractionImagesIDs(mockBackendResponseNoName, 5);

    expect(result).toEqual([]);
  });

  it("it should return a empty array if photos property is undefined", () => {
    const mockBackendResponseNoPhotos = {
      places: [{}],
    };

    const result = filterAttractionImagesIDs(mockBackendResponseNoPhotos, 5);

    expect(result).toEqual([]);
  });

  it("it should return a empty array if places property is undefined", () => {
    const mockBackendResponseNoPlaces = {};

    const result = filterAttractionImagesIDs(mockBackendResponseNoPlaces, 5);

    expect(result).toEqual([]);
  });
});
