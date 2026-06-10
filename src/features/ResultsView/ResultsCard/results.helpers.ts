import type { CalculationResult } from "@/types/CalculationResult";

const GOOD_SCORE_THRESHOLD = 7.5;

export function getStatusType(
  is_mogelijk: CalculationResult["is_mogelijk"],
  score: number | undefined,
): "success" | "warning" | "error" {
  const safeScore = score ?? 0;

  if (!is_mogelijk) {
    return "error";
  } else if (safeScore > GOOD_SCORE_THRESHOLD) {
    return "success";
  } else {
    return "warning";
  }
}

export function roundToWholeNumber(value: number): number {
  return Math.round(value);
}
