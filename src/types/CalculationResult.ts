export type Ruimtevraag = {
  installatieruimte_in_woning: number;
  installatieruimte_in_gebouw: number;
  installatieruimte_buiten: number;
};

export type CalculationResult = {
  naam: string;
  beschrijving: string;
  warmteprogramma_tekst?: string;
  isolatie_popup?: boolean;
  past_in_tuin?: boolean | null;
  omgevingsvergunning?: string;
  beschrijving_url?: string;
  beschrijving_url_title?: string;
  tco?: number;
  score?: number;
  ruimtevraag?: Ruimtevraag;
  is_mogelijk: boolean;
  redenen_niet_mogelijk: string[];
  kosten_per_woning_per_jaar?: number;
  redenen_score: string[];
  kosten_per_woning_per_jaar_laag: number;
  kosten_per_woning_per_jaar_hoog: number;
};
