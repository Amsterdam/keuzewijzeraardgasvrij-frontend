import type { CalculationResult } from "@/types/CalculationResult";

export const staticResults: CalculationResult[] = [
  {
    naam: "Elektrische ketels",
    beschrijving:
      "Elektrische ketels zijn geen goede optie. Ze vragen veel stroom, waardoor de elektriciteitsaansluiting duurder wordt. Ook voldoen ze niet aan de wettelijke eisen voor duurzame verwarming.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
  {
    naam: "Infraroodpanelen",
    beschrijving:
      "Infraroodpanelen gebruiken veel stroom en zijn niet geschikt als hoofdverwarming. Ze werken alleen als bijverwarming.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
  {
    naam: "Waterstofketels",
    beschrijving:
      "Waterstof is nog niet geschikt voor woningverwarming. Er is te weinig waterstof beschikbaar en de infrastructuur is er nog niet.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
  {
    naam: "Geothermie",
    beschrijving:
      "Geothermie is alleen geschikt voor hele wijken of steden. Het is duur en ingewikkeld om aan te leggen.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
];
