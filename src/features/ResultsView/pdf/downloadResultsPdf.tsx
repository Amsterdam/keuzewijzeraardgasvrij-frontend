import type { ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";

import type { CalculationResult } from "@/types/CalculationResult";
import type { FormValues } from "@/features/TechnicalDetails/TechnicalForm/technicalFormSchema";

export async function downloadResultsPdf(
  results: CalculationResult[],
  formValues: Partial<FormValues> | undefined,
) {
  const [
    { pdf },
    { ResultsPdfDocument },
    { loadAmsterdamSansFont, FALLBACK_FONT_FAMILY },
  ] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./ResultsPdfDocument"),
    import("./pdfFonts"),
  ]);

  // Amsterdam Sans is the house font, but PDF generation must still succeed
  // if it fails to load (e.g. offline), falling back to the built-in
  // Helvetica font rather than breaking the download.
  let fontFamily: string | undefined;
  try {
    await loadAmsterdamSansFont();
  } catch (error) {
    console.error("Amsterdam Sans font failed to load, using fallback:", error);
    fontFamily = FALLBACK_FONT_FAMILY;
  }

  const pdfDocument = (
    <ResultsPdfDocument
      results={results}
      formValues={formValues}
      fontFamily={fontFamily}
    />
  ) as unknown as ReactElement<DocumentProps>;

  const blob = await pdf(pdfDocument).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "keuzewijzer-aardgasvrij-resultaten.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
