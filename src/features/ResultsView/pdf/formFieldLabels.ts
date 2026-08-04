import type { FormValues } from "@/features/TechnicalDetails/TechnicalForm/technicalFormSchema";

type FieldFormat = "text" | "boolean" | "huidigSysteem";

type FieldDefinition = {
  key: keyof FormValues;
  label: string;
  format?: FieldFormat;
};

type FieldSection = {
  title: string;
  fields: FieldDefinition[];
};

export const FORM_FIELD_SECTIONS: FieldSection[] = [
  {
    title: "Bouwkundige gegevens",
    fields: [
      { key: "bouwjaar", label: "Bouwjaar" },
      {
        key: "brutoVloeroppervlak",
        label: "Bruto vloeroppervlak (BVO) van het hele gebouw (m²)",
      },
      { key: "aantalWoningen", label: "Aantal woningen in VvE" },
      {
        key: "mechanischeVentilatieAanwezig",
        label: "Is er mechanische ventilatie?",
        format: "boolean",
      },
      {
        key: "vloerverwarmingAanwezig",
        label: "Is er vloerverwarming?",
        format: "boolean",
      },
      {
        key: "dubbelGlas",
        label: "Heeft het gebouw dubbel glas?",
        format: "boolean",
      },
      {
        key: "beschikbareRuimteInWoningM2",
        label: "Beschikbare ruimte in elke woning voor installaties (m²)",
      },
      {
        key: "beschikbareCollectieveRuimteBinnenM2",
        label:
          "Beschikbare ruimte in het gebouw voor gedeelde installaties (m²)",
      },
      {
        key: "beschikbareCollectieveRuimteTuinM2",
        label: "Beschikbaar tuinoppervlak (m²)",
      },
      {
        key: "beschikbareCollectieveRuimteDakM2",
        label: "Beschikbare ruimte op het dak voor gedeelde installaties (m²)",
      },
      {
        key: "wtwAanwezig",
        label: "Is er een warmte-terugwin-installatie (WTW)?",
        format: "boolean",
      },
    ],
  },
  {
    title: "Energetische gegevens",
    fields: [
      {
        key: "tapwaterOpGas",
        label: "Wordt het water in het gebouw verwarmd met gas?",
        format: "boolean",
      },
      {
        key: "kokenOpGas",
        label: "Wordt er in het gebouw gekookt met gas?",
        format: "boolean",
      },
      {
        key: "gasverbruikVveTotaal",
        label: "Totaal gasverbruik van de VvE (m³)",
      },
      {
        key: "huidigSysteem",
        label: "Wat is het huidige systeem?",
        format: "huidigSysteem",
      },
    ],
  },
  {
    title: "Wensen",
    fields: [
      {
        key: "jaarVervangen",
        label: "In welk jaar wordt het warmtesysteem vervangen?",
      },
      {
        key: "wensTotKoelen",
        label: "Moet het nieuwe warmtesysteem ook kunnen koelen?",
        format: "boolean",
      },
    ],
  },
  {
    title: "Locatie",
    fields: [{ key: "buurtcode", label: "Buurtcode" }],
  },
];

const HUIDIG_SYSTEEM_LABELS: Record<string, string> = {
  collectief: "Collectief",
  individueel: "Individueel",
};

const EMPTY_VALUE = "-";

export function formatFieldValue(value: unknown, format?: FieldFormat): string {
  if (value === undefined || value === null || value === "") {
    return EMPTY_VALUE;
  }

  switch (format) {
    case "boolean":
      return value === "true" || value === true ? "Ja" : "Nee";
    case "huidigSysteem":
      return HUIDIG_SYSTEEM_LABELS[String(value)] ?? String(value);
    default:
      return String(value);
  }
}
