import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusLegend } from "./StatusLegend";

describe("StatusLegend", () => {
  it("renders the given label", () => {
    render(<StatusLegend label="Goed mogelijk" type="success" />);

    expect(
      screen.getByRole("heading", { name: "Goed mogelijk" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["success", "success"],
    ["warning", "warning"],
    ["error", "error"],
  ] as const)(
    "applies the %s status class to the bullet",
    (type, expectedClass) => {
      const { container } = render(<StatusLegend label="Label" type={type} />);
      const bullet = container.querySelector("span");

      expect(bullet?.className).toContain(expectedClass);
    },
  );
});
