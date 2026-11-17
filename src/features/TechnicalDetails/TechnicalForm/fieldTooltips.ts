import { plainTooltip, type TooltipContent } from "@/content/tooltipContent";
import type { FormValues } from "./technicalFormSchema";

/**
 * Info-knop texts for the technical form fields.
 * Used by the form itself and by the PDF export.
 */
export const FIELD_TOOLTIPS = {
  brutoVloeroppervlak: [
    {
      type: "paragraph",
      content: [
        "U vindt het gebruiksoppervlak van alle woningen op ",
        {
          text: "bagviewer.kadaster.nl",
          href: "https://bagviewer.kadaster.nl/",
        },
        ". Vermenigvuldig dit met een factor van 1,2 om hier BVO van te maken.",
      ],
    },
  ],
  mechanischeVentilatieAanwezig: plainTooltip(
    "Dit is een systeem dat automatisch binnenlucht afvoert uit ruimtes zoals de keuken, badkamer en het toilet. Verse lucht komt binnen via roosters of ramen, of via de mechanische ventilatie.",
  ),
  vloerverwarmingAanwezig: plainTooltip(
    'Klik op "Ja" als meer dan 50% van het gebouw vloerverwarming heeft.',
  ),
  dubbelGlas: plainTooltip(
    'Klik op "Ja" als meer dan 80% van het gebouw dubbel glas of beter heeft, bijvoorbeeld HR++ glas. Controleer dit met de randen tussen de glasplaten. Zit hier een metalen of zwarte strip, dan is het dubbel glas of isolatieglas, vul in dit geval “Ja” in. Zit dit er niet en zit er één dunne glasplaat in het kozijn? Dan gaat het om enkel glas en vul dan "Nee" in.',
  ),
  beschikbareRuimteInWoningM2: plainTooltip(
    "Denk aan ruimte in de woningen voor bijvoorbeeld een warmtepomp of afleverset van een warmtenet. Deze past soms op de plek van de huidige cv-ketel, maar kan ook meer ruimte nodig hebben. Weet u dit niet voor elke woning apart? Geef dan een gemiddelde inschatting over alle woningen in het gebouw.",
  ),
  beschikbareCollectieveRuimteBinnenM2: plainTooltip(
    "Denk aan gemeenschappelijke (technische) ruimtes die niet bij een individuele woning horen, zoals een berging, kelder of stookruimte. Deze ruimte kan gebruikt worden voor bijvoorbeeld een collectieve warmtepomp of een gezamenlijke afleverset.",
  ),
  beschikbareCollectieveRuimteDakM2: plainTooltip(
    "Het gaat om ruimte in de tuin, op het dak of aan de gevel voor apparatuur die buiten staat, bijvoorbeeld collectieve buitenunits van warmtepompen. Deze oppervlakte moet aaneengesloten zijn: losse kleine plekjes bij elkaar opgeteld tellen niet mee.",
  ),
  beschikbareCollectieveRuimteTuinM2: plainTooltip(
    "Het gaat om beschikbare eigen grond rond het gebouw waarin geboord kan worden, bijvoorbeeld voor bodemlussen. Dit kan tuin zijn of ander onbebouwd terrein.",
  ),
  wtwAanwezig: plainTooltip(
    "Dit is een systeem dat warmte uit afgevoerde lucht hergebruikt om binnenkomende lucht voor te verwarmen. Hierdoor gaat minder warmte verloren en wordt energie bespaard.",
  ),
  kokenOpGas: plainTooltip(
    'Klik op "Ja" als meer dan 50% van het gebouw kookt met gas.',
  ),
  gasverbruikVveTotaal: [
    {
      type: "paragraph",
      content: ["U kunt dit op meerdere manieren vinden:"],
    },
    {
      type: "list",
      items: [
        [
          "Op de eindejaarsafrekening van het gebouw (bij een collectief systeem).",
        ],
        [
          "U kunt alle eindejaarsafrekeningen van de bewoners optellen (bij individuele systemen).",
        ],
        [
          "U kunt het gemiddelde gasverbruik per woning van uw postcode vermenigvuldigen met het aantal woningen. Zie hiervoor de ",
          {
            text: "website van Liander",
            href: "https://www.liander.nl/over-ons/open-data#verbruiksdata-kleinverbruikaansluitingen",
          },
          ' en download het bestand "Kleinverbruikgegevens" van het vorige jaar. Het gemiddelde gasverbruik per woning staat in kolom "SJA GEMIDDELD".',
        ],
      ],
    },
  ],
  huidigSysteem: [
    { type: "heading", text: "Individueel warmtesysteem" },
    {
      type: "paragraph",
      content: [
        "Elke woning of ruimte heeft een eigen verwarmingsinstallatie. Elke bewoner regelt en betaalt de gasrekening zelfstandig bij de leverancier.",
      ],
    },
    { type: "heading", text: "Collectief warmtesysteem" },
    {
      type: "paragraph",
      content: [
        "Meerdere woningen of ruimtes delen één centrale verwarmingsinstallatie. De warmte wordt centraal opgewekt en verdeeld binnen het gebouw.",
      ],
    },
  ],
  jaarVervangen: plainTooltip(
    "Denk bijvoorbeeld aan het jaar waarin groot onderhoud gepland staat, zoals het vervangen van de cv-ketels of de rookgasafvoerkanalen. Weet u het nog niet? Vul dan een schatting in. Het jaartal bepaalt of er rekening gehouden kan worden met plannen van de gemeente, en hoeveel tijd u heeft om u voor te bereiden.",
  ),
} satisfies Partial<Record<keyof FormValues, TooltipContent>>;

export function getFieldTooltip(
  key: keyof FormValues,
): TooltipContent | undefined {
  return (FIELD_TOOLTIPS as Partial<Record<keyof FormValues, TooltipContent>>)[
    key
  ];
}
