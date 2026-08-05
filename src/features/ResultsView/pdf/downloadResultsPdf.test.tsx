import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";
import type { CalculationResult } from "@/types/CalculationResult";

const toBlobMock = vi.fn();
const pdfMock = vi.fn<
  (document: ReactElement) => { toBlob: typeof toBlobMock }
>(() => ({ toBlob: toBlobMock }));
const loadAmsterdamSansFontMock = vi.fn();
const ResultsPdfDocumentMock = vi.fn(() => null);

vi.mock("@react-pdf/renderer", () => ({
  pdf: pdfMock,
}));

vi.mock("./ResultsPdfDocument", () => ({
  ResultsPdfDocument: ResultsPdfDocumentMock,
}));

vi.mock("./pdfFonts", () => ({
  loadAmsterdamSansFont: loadAmsterdamSansFontMock,
  FALLBACK_FONT_FAMILY: "Helvetica",
}));

const { downloadResultsPdf } = await import("./downloadResultsPdf");

const results: CalculationResult[] = [
  {
    naam: "Warmtepomp",
    beschrijving: "Een individuele warmtepomp.",
    is_mogelijk: true,
    redenen_niet_mogelijk: [],
    redenen_score: [],
    kosten_per_woning_per_jaar_laag: 0,
    kosten_per_woning_per_jaar_hoog: 0,
  },
];

// jsdom does not implement URL.createObjectURL / revokeObjectURL.
const createObjectURLMock = vi.fn(() => "blob:mock-url");
const revokeObjectURLMock = vi.fn();

describe("downloadResultsPdf", () => {
  const fakeBlob = { type: "application/pdf" } as unknown as Blob;
  let clickSpy: ReturnType<typeof vi.spyOn>;
  let appendChildSpy: ReturnType<typeof vi.spyOn>;
  let removeChildSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    toBlobMock.mockReset().mockResolvedValue(fakeBlob);
    loadAmsterdamSansFontMock.mockReset().mockResolvedValue(undefined);
    pdfMock.mockClear();
    ResultsPdfDocumentMock.mockClear();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (URL as any).createObjectURL = createObjectURLMock.mockClear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (URL as any).revokeObjectURL = revokeObjectURLMock.mockClear();

    clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    appendChildSpy = vi.spyOn(document.body, "appendChild");
    removeChildSpy = vi.spyOn(document.body, "removeChild");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (URL as any).createObjectURL;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (URL as any).revokeObjectURL;
  });

  it("renders the PDF with Amsterdam Sans and triggers a download", async () => {
    await downloadResultsPdf(results, undefined);

    expect(loadAmsterdamSansFontMock).toHaveBeenCalled();

    const pdfDocumentArg = pdfMock.mock.calls[0][0] as ReactElement & {
      props: { fontFamily?: string };
    };
    expect(pdfDocumentArg.type).toBe(ResultsPdfDocumentMock);
    expect(pdfDocumentArg.props.fontFamily).toBeUndefined();

    expect(createObjectURLMock).toHaveBeenCalledWith(fakeBlob);

    const link = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(link.tagName).toBe("A");
    expect(link.href).toBe("blob:mock-url");
    expect(link.download).toBe("keuzewijzer-aardgasvrij-resultaten.pdf");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledWith(link);
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:mock-url");
  });

  it("falls back to the fallback font and still downloads when the font fails to load", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    loadAmsterdamSansFontMock.mockRejectedValue(new Error("offline"));

    await downloadResultsPdf(results, undefined);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Amsterdam Sans font failed to load, using fallback:",
      expect.any(Error),
    );

    const pdfDocumentArg = pdfMock.mock.calls[0][0] as ReactElement & {
      props: { fontFamily?: string };
    };
    expect(pdfDocumentArg.props.fontFamily).toBe("Helvetica");

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("passes the given results and form values through to the document", async () => {
    const formValues = { bouwjaar: "1990" };

    await downloadResultsPdf(results, formValues);

    const pdfDocumentArg = pdfMock.mock.calls[0][0] as ReactElement & {
      props: { results: unknown; formValues: unknown };
    };
    expect(pdfDocumentArg.props.results).toBe(results);
    expect(pdfDocumentArg.props.formValues).toBe(formValues);
  });
});
