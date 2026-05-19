export type CalculationResult = {
  naam: string;
  beschrijving: string;
  tco?: number;
  score?: number;
  is_mogelijk: boolean;
  redenen_niet_mogelijk: string[];
  kosten_per_woning_per_jaar?: number;
  redenen_score: string[];
  kosten_per_woning_per_jaar_laag: number;
  kosten_per_woning_per_jaar_hoog: number;
};
