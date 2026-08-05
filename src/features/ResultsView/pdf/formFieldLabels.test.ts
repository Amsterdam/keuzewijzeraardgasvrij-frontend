import { describe, expect, it } from "vitest";
import { formatFieldValue } from "./formFieldLabels";

describe("formatFieldValue", () => {
  it.each([undefined, null, ""])(
    "returns a dash for empty value %p",
    (value) => {
      expect(formatFieldValue(value)).toBe("-");
    },
  );

  it("formats a plain value as a string", () => {
    expect(formatFieldValue(1992)).toBe("1992");
    expect(formatFieldValue("VvE Zuid")).toBe("VvE Zuid");
  });

  it.each([
    [true, "Ja"],
    ["true", "Ja"],
    [false, "Nee"],
    ["false", "Nee"],
    ["anything-else", "Nee"],
  ] as const)("formats boolean value %p as %s", (value, expected) => {
    expect(formatFieldValue(value, "boolean")).toBe(expected);
  });

  it.each([
    ["collectief", "Collectief"],
    ["individueel", "Individueel"],
  ] as const)("maps huidigSysteem value %p to %s", (value, expected) => {
    expect(formatFieldValue(value, "huidigSysteem")).toBe(expected);
  });

  it("falls back to the raw value for an unknown huidigSysteem", () => {
    expect(formatFieldValue("onbekend", "huidigSysteem")).toBe("onbekend");
  });
});
