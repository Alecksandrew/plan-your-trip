import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import TouristAttractionCard from "../ItinerarySection/TouristAttractionCard";

describe("TouristAttractionCard", () => {
  
  afterEach(() => {
    cleanup();
  })
  
    it("should always show the title of the attraction", () => {
    const props = {
      title: "Pão de Açúcar",
      description: "Bondinho até o topo",
      openingHours: "8–18h",
      photos: ["foto1.jpg"],
    };

    render(<TouristAttractionCard {...props} />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Pão de Açúcar",
    });

    expect(heading).toBeInTheDocument();
  });

  it("it should always shows at least one image of the attraction", () => {
    const props = {
      title: "Pão de Açúcar",
      description: "Bondinho até o topo",
      openingHours: "8–18h",
      photos: ["foto1.jpg"],
    };

    render(<TouristAttractionCard {...props} />);

    const images = screen.getAllByRole("img");

    expect(images.length).toBeGreaterThanOrEqual(1);
    expect(images[0]).toHaveAttribute("src", "foto1.jpg");
    expect(images[0]).toHaveAttribute(
      "alt",
      expect.stringContaining("Pão de Açúcar")
    );
  });

  it("should render without crashing if photos array is empty", () => {
    const props = {
      title: "Pão de Açúcar",
      description: "Bondinho até o topo",
      openingHours: "8–18h",
      photos: [],
    };

    render(<TouristAttractionCard {...props} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Pão de Açúcar/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Bondinho até o topo/i)).toBeInTheDocument();
  });
});
