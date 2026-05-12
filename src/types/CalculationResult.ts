export type CalculationResult = {
  naam: string;
  beschrijving: string;
  tco: number;
  score: number;
  is_mogelijk: boolean;
  redenen: string[];
  kosten_per_woning_per_jaar: number;
};

export type CalculationResults = CalculationResult[];
