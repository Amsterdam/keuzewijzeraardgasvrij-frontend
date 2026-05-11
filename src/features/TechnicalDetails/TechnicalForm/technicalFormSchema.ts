import { z } from "zod";

export const technicalFormSchema = z.object({
  bouwjaar: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Bouwjaar is verplicht."
          : "Voer een geldig getal in voor het bouwjaar.",
    })
    .gte(1500, { error: "Het bouwjaar is niet geldig." })
    .lte(new Date().getFullYear(), {
      error: "Het bouwjaar kan niet in de toekomst liggen.",
    }),

  brutoVloeroppervlak: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Bruto vloeroppervlak is verplicht."
          : "Voer een geldig getal in voor het bruto vloeroppervlak.",
    })
    .min(1, { error: "Het bruto vloeroppervlak moet groter dan 0 zijn." }),

  aantalWoningen: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Aantal woningen is verplicht."
          : "Voer een geldig getal in voor het aantal woningen.",
    })
    .min(1, { error: "De VvE moet minimaal 1 woning hebben." }),

  mechanischeVentilatieAanwezig: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of mechanische ventilatie aanwezig is."
        : "Ongeldige waarde voor mechanische ventilatie.",
  }),
  vloerverwarmingAanwezig: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of vloerverwarming aanwezig is."
        : "Ongeldige waarde voor vloerverwarming.",
  }),
  inpandigeBergingAanwezig: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of inpandige berging aanwezig is."
        : "Ongeldige waarde voor inpandige berging.",
  }),
  ruimteOpHetDakAanwezig: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of er ruimte op het dak aanwezig is."
        : "Ongeldige waarde voor ruimte op het dak.",
  }),

  typeDak: z.enum(["plat_dak", "schuin_dak"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef het type dak aan."
        : "Ongeldige waarde voor type dak.",
  }),

  tapwaterOpGas: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of tapwater op gas is."
        : "Ongeldige waarde voor tapwater op gas.",
  }),

  kokenOpGas: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of er op gas wordt gekookt."
        : "Ongeldige waarde voor koken op gas.",
  }),

  gasverbruikVveTotaal: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Het totale gasverbruik van de VvE is verplicht."
          : "Voer een geldig getal in voor het totale gasverbruik van de VvE.",
    })
    .min(1, {
      error: "Het totale gasverbruik van de VvE moet groter dan 0 zijn.",
    }),

  elektriciteitsverbruikPerWoning: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Het elektriciteitsverbruik per woning is verplicht."
          : "Voer een geldig getal in voor het elektriciteitsverbruik per woning.",
    })
    .min(1, {
      error: "Het elektriciteitsverbruik per woning moet groter dan 0 zijn.",
    }),
  elektriciteitsverbruikVveTotaal: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Het totale elektriciteitsverbruik van de VvE is verplicht."
          : "Voer een geldig getal in voor het totale elektriciteitsverbruik van de VvE.",
    })
    .min(1, {
      error:
        "Het totale elektriciteitsverbruik van de VvE moet groter dan 0 zijn.",
    }),

  gecontracteerdVermogen: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Het gecontracteerde vermogen is verplicht."
          : "Voer een geldig getal in voor het gecontracteerde vermogen.",
    })
    .min(1, { error: "Het gecontracteerde vermogen moet groter dan 0 zijn." }),

  huidigeWarmtesysteem: z.enum(["cv_ketel", "warmtepomp"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef het huidige warmtesysteem aan."
        : "Ongeldige waarde voor huidige warmtesysteem.",
  }),

  volledigGasLoos: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of het volledig gasloos is."
        : "Ongeldige waarde voor volledig gasloos.",
  }),
  wensTotKoelen: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of er een wens tot koelen is."
        : "Ongeldige waarde voor wens tot koelen.",
  }),
});

export type FormValues = z.input<typeof technicalFormSchema>;
