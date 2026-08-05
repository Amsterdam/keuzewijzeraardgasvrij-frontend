import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CalculationResult } from "@/types/CalculationResult";
import { ResultsCard } from "./ResultsCard";

// jsdom does not implement ResizeObserver, but ResultsCard observes its
// details element on mount to keep --details-height in sync.
class ResizeObserverStub {
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverStub);
});

function createResult(overrides: Partial<CalculationResult> = {}) {
  return {
    naam: "Warmtepomp",
    beschrijving: "Een individuele warmtepomp.",
    is_mogelijk: true,
    redenen_niet_mogelijk: [],
    redenen_score: [],
    kosten_per_woning_per_jaar_laag: 0,
    kosten_per_woning_per_jaar_hoog: 0,
    ...overrides,
  } satisfies CalculationResult;
}

describe("ResultsCard", () => {
  it("renders the result name as a heading", () => {
    render(<ResultsCard result={createResult()} index={0} />);

    expect(
      screen.getByRole("heading", { name: "Warmtepomp" }),
    ).toBeInTheDocument();
  });

  it("does not show a toggle button for a static result without a score", () => {
    render(<ResultsCard result={createResult()} index={1} />);

    expect(
      screen.queryByRole("button", { name: /lees meer|sluiten/i }),
    ).not.toBeInTheDocument();
  });

  it("shows a toggle button for a dynamic result with a score", () => {
    render(<ResultsCard result={createResult({ score: 8 })} index={1} />);

    expect(
      screen.getByRole("button", { name: "Lees meer" }),
    ).toBeInTheDocument();
  });

  it("starts open for the first card and closed for the rest", () => {
    render(<ResultsCard result={createResult({ score: 8 })} index={0} />);
    expect(screen.getByRole("button", { name: "Sluiten" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("toggles open and closed when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<ResultsCard result={createResult({ score: 8 })} index={1} />);

    const button = screen.getByRole("button", { name: "Lees meer" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(screen.getByRole("button", { name: "Sluiten" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Sluiten" }));
    expect(screen.getByRole("button", { name: "Lees meer" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it.each([
    [true, /waarschijnlijk in de tuin/],
    [false, /waarschijnlijk niet in de tuin/],
  ] as const)(
    "shows the matching tuintekst when past_in_tuin is %s",
    (pastInTuin, expectedText) => {
      render(
        <ResultsCard
          result={createResult({ score: 8, past_in_tuin: pastInTuin })}
          index={0}
        />,
      );

      expect(screen.getByText(expectedText)).toBeInTheDocument();
    },
  );

  it("shows no tuintekst when past_in_tuin is null", () => {
    render(
      <ResultsCard
        result={createResult({ score: 8, past_in_tuin: null })}
        index={0}
      />,
    );

    expect(screen.queryByText(/de tuin/)).not.toBeInTheDocument();
  });

  it("shows a cost indication when both cost fields are positive", () => {
    render(
      <ResultsCard
        result={createResult({
          score: 8,
          kosten_per_woning_per_jaar_laag: 1200,
          kosten_per_woning_per_jaar_hoog: 1800,
        })}
        index={0}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Kostenindicatie" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/€ 1200/)).toBeInTheDocument();
    expect(screen.getByText(/€ 1800/)).toBeInTheDocument();
  });

  it("hides the cost indication when a cost field is zero", () => {
    render(<ResultsCard result={createResult({ score: 8 })} index={0} />);

    expect(
      screen.queryByRole("heading", { name: "Kostenindicatie" }),
    ).not.toBeInTheDocument();
  });

  it("lists redenen_niet_mogelijk when present", () => {
    render(
      <ResultsCard
        result={createResult({
          score: 8,
          redenen_niet_mogelijk: ["Geen ruimte voor installatie"],
        })}
        index={0}
      />,
    );

    expect(
      screen.getByText("Geen ruimte voor installatie"),
    ).toBeInTheDocument();
  });

  it("lists redenen_score when present", () => {
    render(
      <ResultsCard
        result={createResult({
          score: 8,
          redenen_score: ["Lage energiekosten"],
        })}
        index={0}
      />,
    );

    expect(screen.getByText("Lage energiekosten")).toBeInTheDocument();
  });
});
