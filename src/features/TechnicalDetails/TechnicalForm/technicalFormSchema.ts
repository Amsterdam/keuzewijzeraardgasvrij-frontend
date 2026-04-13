import { z } from "zod";

// Enum for strings "true" / "false"
const booleanStringEnum = z.enum(["true", "false"]);

export const technicalFormSchema = z.object({
  bouwjaar: z.coerce
    .number()
    .min(1500, "Het bouwjaar is niet geldig.")
    .max(
      new Date().getFullYear(),
      "Het bouwjaar kan niet in de toekomst liggen.",
    ),

  brutoVloeroppervlak: z.coerce
    .number()
    .min(1, "Het bruto vloeroppervlak moet groter dan 0 zijn."),

  aantalWoningen: z.coerce
    .number()
    .min(1, "De VvE moet minimaal 1 woning hebben."),

  mechanischeVentilatieAanwezig: booleanStringEnum,
  vloerverwarmingAanwezig: booleanStringEnum,
  inpandigeBergingAanwezig: booleanStringEnum,
  ruimteOpHetDakAanwezig: booleanStringEnum,

  typeDak: z.enum(["plat_dak", "schuin_dak"]),

  tapwaterOpGas: booleanStringEnum,

  kokenOpGas: booleanStringEnum,

  gasverbruikVveTotaal: z.coerce
    .number()
    .min(1, "Het totale gasverbruik van de VvE moet groter dan 0 zijn."),

  elektriciteitsverbruikPerWoning: z.coerce
    .number()
    .min(1, "Het elektriciteitsverbruik per woning moet groter dan 0 zijn."),
  elektriciteitsverbruikVveTotaal: z.coerce
    .number()
    .min(
      1,
      "Het totale elektriciteitsverbruik van de VvE moet groter dan 0 zijn.",
    ),

  gecontracteerdVermogen: z.coerce
    .number()
    .min(1, "Het gecontracteerde vermogen moet groter dan 0 zijn."),

  huidigeWarmtesysteem: z.enum(["cv_ketel", "warmtepomp"]),

  volledigGasLoos: booleanStringEnum,
  wensTotKoelen: booleanStringEnum,
});

export type FormValues = z.input<typeof technicalFormSchema>;
