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
