import type { CalculationResult } from "@/types/CalculationResult";

/**
 * Texts of the results page.
 * Used by the website and by the PDF export.
 */
export const RESULTS_HEADING = "Adviezen voor warmtesystemen";

export const RESULTS_INTRO =
  "Op basis van uw gegevens ziet u hieronder welke warmtesystemen het beste bij uw gebouw passen. Bovenaan wat het beste past, onderaan wat het minst past. Klik met uw muis op een systeem voor meer uitleg. De kleuren betekenen: best beoordeeld (groen), gemiddeld beoordeeld (oranje) en niet mogelijk (rood). In sommige situaties zijn de best beoordeelde warmtesystemen niet mogelijk.";

export const STATUS_LEGEND_LABELS = {
  success: "Best beoordeeld",
  warning: "Gemiddeld beoordeeld",
  error: "Niet mogelijk",
} as const;

export const NOOIT_MOGELIJK_HEADING = "Nooit mogelijk";

export const NOOIT_MOGELIJK_INTRO =
  "Deze warmtesystemen zijn nooit mogelijk. Ze zijn niet geschikt als individuele verwarmingsoplossing voor gebouwen of voldoen niet aan de uitgangspunten voor duurzame warmtevoorziening. Daarom worden ze altijd uitgesloten van het advies.";

/** Sentences shown after the cost range in the Kostenindicatie section. */
export const KOSTENINDICATIE_TOELICHTING =
  "Dit is een schatting om systemen met elkaar te vergelijken. Hierin zitten energie, aanschaf, installatie en onderhoud. Inflatie en aanpassingen aan het gebouw zitten er niet in. Die kosten komen er nog bij en kunnen hoog zijn.";

export function getTuinTekst(result: CalculationResult): string | null {
  if (result.past_in_tuin === true) {
    return "De bodembron past waarschijnlijk in de tuin.";
  }
  if (result.past_in_tuin === false) {
    return "De bodembron past waarschijnlijk niet in de tuin. In sommige gevallen is het mogelijk om de bodembron in de openbare ruimte te plaatsen. Hiervoor kunnen extra kosten en vergunningen nodig zijn. Deze kosten zijn hieronder niet meegerekend.";
  }
  return null;
}
