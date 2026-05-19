import type { CalculationResult } from "@/types/CalculationResult";

export const staticResults: CalculationResult[] = [
  {
    naam: "Elektrische ketels",
    beschrijving:
      "Elektrische ketels zijn geen geschikte optie omdat ze een aanzienlijke vergroting van de individuele elektriciteitsaansluiting vereisen. Dit brengt hoge kosten en een grotere belasting van het elektriciteitsnet met zich mee. Daarnaast voldoen elektrische ketels niet aan het in het Besluit Bouwwerken Leefomgeving (BBL) vastgestelde minimale rendementseis van 1,45 voor warmteopwekking. Dit maakt ze ongeschikt als duurzame en efficiënte oplossing.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
  {
    naam: "Infraroodpanelen",
    beschrijving:
      "Infraroodpanelen hebben een grotere elektriciteitsvraag en een laag rendement. Bovendien zijn infraroodpanelen alleen effectief als plaatselijke of bijverwarming. Ze zijn niet geschikt als hoofdverwarming voor woningen.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
  {
    naam: "Waterstofketels",
    beschrijving:
      "Het grootschalig inzetten van waterstof voor woningverwarming is op dit moment niet realistisch of haalbaar. De productie en distributie van waterstof zijn niet voldoende ontwikkeld om woningen te voorzien van warmte. ",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
  {
    naam: "Geothermie",
    beschrijving:
      "Geothermie is alleen rendabel op wijk- of stadsniveau en vereist ingrijpende boringen en samenwerking met veel verschillende stakeholders. Dit brengt hoge kosten en complexe processen met zich mee.",
    is_mogelijk: false,
    kosten_per_woning_per_jaar_hoog: 0,
    kosten_per_woning_per_jaar_laag: 0,
    redenen_niet_mogelijk: [],
    redenen_score: [],
  },
];
