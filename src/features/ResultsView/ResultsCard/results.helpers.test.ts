import { describe, expect, it } from "vitest";
import { getStatusType, roundToWholeNumber } from "./results.helpers";

describe("getStatusType", () => {
  it("returns error when not mogelijk, regardless of score", () => {
    expect(getStatusType(false, 10)).toBe("error");
    expect(getStatusType(false, undefined)).toBe("error");
  });

  it("returns success when mogelijk and score is above the threshold", () => {
    expect(getStatusType(true, 8)).toBe("success");
  });

  it("returns warning when mogelijk and score is at or below the threshold", () => {
    expect(getStatusType(true, 7.5)).toBe("warning");
    expect(getStatusType(true, 0)).toBe("warning");
  });

  it("treats an undefined score as 0 when mogelijk", () => {
    expect(getStatusType(true, undefined)).toBe("warning");
  });
});

describe("roundToWholeNumber", () => {
  it("rounds to the nearest whole number", () => {
    expect(roundToWholeNumber(1.4)).toBe(1);
    expect(roundToWholeNumber(1.5)).toBe(2);
    expect(roundToWholeNumber(-1.5)).toBe(-1);
  });
});
