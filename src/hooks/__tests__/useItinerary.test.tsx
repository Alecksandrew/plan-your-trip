import React from "react";
import {render, screen} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest"
import { renderHook } from "@testing-library/react";

//custom hook
import useItinerary from "../useItinerary";

import {initialStateItinerary } from "../useItinerary";


describe("Custom hook useItinerary", () => {

 it("it should return all initial values correctly", () => {
    const { result } = renderHook(() => useItinerary());

    expect(result.current.itinerary).toEqual(initialStateItinerary);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.progress).toBe("100%");
 })

 it("it should return final values correctly", () => {




 })
    

}) 