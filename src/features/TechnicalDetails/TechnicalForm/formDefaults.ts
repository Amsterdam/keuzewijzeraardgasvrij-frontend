import type { FormValues } from "./technicalFormSchema";

export function defaultFormValues(): FormValues {
  return {
    bouwjaar: 0,
    brutoVloeroppervlak: 0,
    aantalWoningen: 0,
    mechanischeVentilatieAanwezig: "false",
    vloerverwarmingAanwezig: "false",
    inpandigeBergingAanwezig: "false",
    ruimteOpHetDakAanwezig: "false",
    typeDak: "plat_dak",
    tapwaterOpGas: "false",
    kokenOpGas: "false",
    gasverbruikVveTotaal: 0,
    elektriciteitsverbruikPerWoning: 0,
    elektriciteitsverbruikVveTotaal: 0,
    gecontracteerdVermogen: 0,
    huidigeWarmtesysteem: "cv_ketel",
    volledigGasLoos: "false",
    wensTotKoelen: "false",
  };
}

export function generateDummyData(): FormValues {
  const aantalWoningen = Math.floor(Math.random() * 99) + 2; // Random number between 2 and 100
  const vloerOppervlakPerWoning = Math.floor(Math.random() * 120) + 30; // Random number between 30 and 150
  const brutoVloeroppervlak = vloerOppervlakPerWoning * aantalWoningen; // Total floor area
  const gasverbruikPerWoning = Math.floor(Math.random() * 2500) + 1000; // Random number between 1000 and 3500
  const gasverbruikVveTotaal =
    gasverbruikPerWoning * aantalWoningen + Math.floor(Math.random() * 10000); // Total gas consumption with some random variation
  const elektriciteitsverbruikPerWoning =
    Math.floor(Math.random() * 4500) + 1500; // Random number between 1500 and 6000

  return {
    bouwjaar: 1950 + Math.floor(Math.random() * 70),
    brutoVloeroppervlak: brutoVloeroppervlak,
    aantalWoningen: aantalWoningen,
    mechanischeVentilatieAanwezig: Math.random() > 0.5 ? "true" : "false",
    vloerverwarmingAanwezig: Math.random() > 0.5 ? "true" : "false",
    inpandigeBergingAanwezig: Math.random() > 0.5 ? "true" : "false",
    ruimteOpHetDakAanwezig: Math.random() > 0.5 ? "true" : "false",
    typeDak: Math.random() > 0.5 ? "plat_dak" : "schuin_dak",
    tapwaterOpGas: Math.random() > 0.5 ? "true" : "false",
    kokenOpGas: Math.random() > 0.5 ? "true" : "false",
    gasverbruikVveTotaal: gasverbruikVveTotaal,
    elektriciteitsverbruikPerWoning: elektriciteitsverbruikPerWoning,
    elektriciteitsverbruikVveTotaal:
      elektriciteitsverbruikPerWoning * aantalWoningen +
      Math.floor(Math.random() * 10000), // Total electricity consumption with some random variation
    gecontracteerdVermogen: Math.floor(Math.random() * 50) + 10,
    huidigeWarmtesysteem: Math.random() > 0.5 ? "cv_ketel" : "warmtepomp",
    volledigGasLoos: Math.random() > 0.5 ? "true" : "false",
    wensTotKoelen: Math.random() > 0.5 ? "true" : "false",
  };
}
