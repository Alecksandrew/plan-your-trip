import calculateDaysOffset from "@/utils/calculateDaysOffset";
import { describe, render, screen, it, expect } from "vitest";


describe("function calculateDaysOffset", () => {
  
    const today = new Date('2025-07-18T12:00:00Z');
  
    it("should return the correct days offset", () => {
        expect(calculateDaysOffset("20/07/2025")).toBe(2);
    });
    

  it("should return a negative number for a past date", () => {
    expect(calculateDaysOffset("10/07/2025")).toBe(-8);
  });

  });