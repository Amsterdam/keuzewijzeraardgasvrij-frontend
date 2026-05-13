import type { FormValues } from "./technicalFormSchema";

export function defaultFormValues(): Partial<FormValues> {
  return {};
}

export function generateDummyData(): FormValues {
  const aantalWoningen = Math.floor(Math.random() * 99) + 2; // Random number between 2 and 100
  const vloerOppervlakPerWoning = Math.floor(Math.random() * 120) + 30; // Random number between 30 and 150
  const brutoVloeroppervlak = vloerOppervlakPerWoning * aantalWoningen; // Total floor area
  const gasverbruikPerWoning = Math.floor(Math.random() * 2500) + 1000; // Random number between 1000 and 3500
  const gasverbruikVveTotaal =
    gasverbruikPerWoning * aantalWoningen + Math.floor(Math.random() * 10000); // Total gas consumption with some random variation

  return {
    bouwjaar: 1950 + Math.floor(Math.random() * 70),
    brutoVloeroppervlak: brutoVloeroppervlak,
    aantalWoningen: aantalWoningen,
    mechanischeVentilatieAanwezig: Math.random() > 0.5 ? "true" : "false",
    vloerverwarmingAanwezig: Math.random() > 0.5 ? "true" : "false",
    tapwaterOpGas: Math.random() > 0.5 ? "true" : "false",
    kokenOpGas: Math.random() > 0.5 ? "true" : "false",
    gasverbruikVveTotaal: gasverbruikVveTotaal,
    wensTotKoelen: Math.random() > 0.5 ? "true" : "false",
    huidigSysteem: Math.random() > 0.5 ? "collectief" : "individueel",
    dubbelGlas: Math.random() > 0.5 ? "true" : "false",
    beschikbareRuimteInWoningM2: Math.floor(Math.random() * 11),
    beschikbareCollectieveRuimteBinnenM2: Math.floor(Math.random() * 51),
    beschikbareCollectieveRuimteBuitenM2: Math.floor(Math.random() * 51),
    jaarVervangen: new Date().getFullYear() + Math.floor(Math.random() * 21),
    wtwAanwezig: Math.random() > 0.5 ? "true" : "false",
  };
}
