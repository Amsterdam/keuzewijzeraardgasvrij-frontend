import type { CalculationResult } from "@/types/CalculationResult";

const TOP_RANK_LIMIT = 3;
const MID_RANK_LIMIT = 6;

export function getStatusType(
  is_mogelijk: CalculationResult["is_mogelijk"],
  index: number,
): "success" | "warning" | "error" {
  if (!is_mogelijk) {
    return "error";
  } else if (index < TOP_RANK_LIMIT) {
    return "success";
  } else if (index < MID_RANK_LIMIT) {
    return "warning";
  } else {
    return "error";
  }
}

export function getScoreReasonLabel(index: number): string {
  if (index < TOP_RANK_LIMIT) {
    return "Deze techniek scoort goed vanwege:";
  } else if (index < MID_RANK_LIMIT) {
    return "Deze techniek scoort gemiddeld vanwege:";
  } else {
    return "Deze techniek scoort slecht vanwege:";
  }
}

export function roundToWholeNumber(value: number): number {
  return Math.round(value);
}

export function getLastPartFromSlash(url: string): string {
  const parts = url.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1] || "";

  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
}
