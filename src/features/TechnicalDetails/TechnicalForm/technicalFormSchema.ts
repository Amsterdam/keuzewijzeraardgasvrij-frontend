import { z } from "zod";

export const technicalFormSchema = z.object({
  bouwjaar: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Bouwjaar is verplicht."
          : "Voer een geldig getal in voor het bouwjaar.",
    })
    .min(1500, { error: "Het bouwjaar is niet geldig." })
    .max(new Date().getFullYear(), {
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

  huidigSysteem: z.enum(["collectief", "individueel"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef het huidige systeem aan."
        : "Ongeldige waarde voor huidige systeem.",
  }),

  dubbelGlas: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of er dubbel glas aanwezig is."
        : "Ongeldige waarde voor dubbel glas.",
  }),

  beschikbareRuimteInWoningM2: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "De beschikbare ruimte in de woning is verplicht."
          : "Voer een geldig getal in voor de beschikbare ruimte in de woning.",
    })
    .min(0, {
      error: "De beschikbare ruimte in de woning moet 0 of groter zijn.",
    }),

  beschikbareCollectieveRuimteBinnenM2: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "De beschikbare collectieve ruimte binnen is verplicht."
          : "Voer een geldig getal in voor de beschikbare collectieve ruimte binnen.",
    })
    .min(0, {
      error: "De beschikbare collectieve ruimte binnen moet 0 of groter zijn.",
    }),

  beschikbareCollectieveRuimteBuitenM2: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "De beschikbare collectieve ruimte buiten is verplicht."
          : "Voer een geldig getal in voor de beschikbare collectieve ruimte buiten.",
    })
    .min(0, {
      error: "De beschikbare collectieve ruimte buiten moet 0 of groter zijn.",
    }),

  jaarVervangen: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "Het jaar voor het vervangen van het huidige warmsysteem is verplicht."
          : "Voer een geldig getal in voor het jaar van het vervangen van het huidige warmsysteem.",
    })
    .min(new Date().getFullYear(), {
      error:
        "Het jaar voor het vervangen van het huidige warmsysteem is niet geldig.",
    })
    .max(new Date().getFullYear() + 50, {
      error:
        "Het jaar voor het vervangen van het huidige warmsysteem ligt te ver in de toekomst.",
    }),

  wtwAanwezig: z.enum(["true", "false"], {
    error: (iss) =>
      iss.input === undefined
        ? "Geef aan of er een WTW-installatie aanwezig is."
        : "Ongeldige waarde voor WTW-installatie aanwezig.",
  }),

  buurtcode: z.string().optional(),
});

export type FormValues = z.input<typeof technicalFormSchema>;
