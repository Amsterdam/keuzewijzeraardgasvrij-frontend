import { Heading, Grid, Link } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  DEFAULT_OPTIONS_BOOLEAN_UNKNOWN,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsLabelWithTooltip } from "@/components";

export function TechnicalFormBuilding() {
  return (
    <>
      <Heading level={3}>Bouwkundige gegevens</Heading>
      <Grid
        paddingBottom="x-large"
        paddingTop="large"
        gapVertical="large"
        className="no-padding-inline align-items-end"
      >
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Bouwjaar"
            name="bouwjaar"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Wat is het bruto vloeroppervlak (BVO) van het hele gebouw (m²)?"
            content={
              <div>
                U vindt het gebruiksoppervlak van alle woningen op{" "}
                <Link
                  href="https://bagviewer.kadaster.nl/"
                  rel="external noopener"
                  target="_blank"
                >
                  bagviewer.kadaster.nl
                </Link>
                . Vermenigvuldig dit met een factor van 1,2 om hier BVO van te
                maken.
              </div>
            }
          />
          <TextInputControl<FormValues>
            name="brutoVloeroppervlak"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Aantal woningen in VvE"
            name="aantalWoningen"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Is er mechanische ventilatie?"
            content="Dit is een systeem dat automatisch binnenlucht afvoert uit ruimtes zoals de keuken, badkamer en het toilet. Verse lucht komt binnen via roosters of ramen, of via de mechanische ventilatie."
          />
          <SelectControl<FormValues>
            name="mechanischeVentilatieAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Is er vloerverwarming?"
            content='Klik op "Ja" als meer dan 50% van het gebouw vloerverwarming heeft.'
          />
          <SelectControl<FormValues>
            name="vloerverwarmingAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Heeft het gebouw dubbel glas?"
            content='Klik op "Ja" als meer dan 80% van het gebouw dubbel glas of beter heeft, bijvoorbeeld HR++ glas. Controleer dit met de randen tussen de glasplaten. Zit hier een metalen of zwarte strip, dan is het dubbel glas of isolatieglas, vul in dit geval “Ja” in. Zit dit er niet en zit er één dunne glasplaat in het kozijn? Dan gaat het om enkel glas en vul dan "Nee" in.'
          />
          <SelectControl<FormValues>
            name="dubbelGlas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² ruimte is er in elke woning voor het plaatsen van installaties?"
            content="Denk aan ruimte in de woningen voor bijvoorbeeld een warmtepomp of afleverset van een warmtenet. Deze past soms op de plek van de huidige cv-ketel, maar kan ook meer ruimte nodig hebben. Weet u dit niet voor elke woning apart? Geef dan een gemiddelde inschatting over alle woningen in het gebouw."
          />
          <TextInputControl<FormValues>
            name="beschikbareRuimteInWoningM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² ruimte is er in het gebouw voor gedeelde installaties?"
            content="Denk aan gemeenschappelijke (technische) ruimtes die niet bij een individuele woning horen, zoals een berging, kelder of stookruimte. Deze ruimte kan gebruikt worden voor bijvoorbeeld een collectieve warmtepomp of een gezamenlijke afleverset."
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteBinnenM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>

        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² ruimte is er buiten het gebouw voor gedeelde installaties?"
            content="Het gaat om ruimte in de tuin, op het dak of aan de gevel voor apparatuur die buiten staat, bijvoorbeeld collectieve buitenunits van warmtepompen. Deze oppervlakte moet aaneengesloten zijn: losse kleine plekjes bij elkaar opgeteld tellen niet mee."
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteDakM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² grond is er buiten het gebouw om bodemlussen te boren?"
            content="Het gaat om beschikbare eigen grond rond het gebouw waarin geboord kan worden, bijvoorbeeld voor bodemlussen. Dit kan tuin zijn of ander onbebouwd terrein."
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteTuinM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Is er een warmte-terugwin-installatie (WTW)?"
            content="Dit is een systeem dat warmte uit afgevoerde lucht hergebruikt om binnenkomende lucht voor te verwarmen. Hierdoor gaat minder warmte verloren en wordt energie bespaard."
          />
          <SelectControl<FormValues>
            name="wtwAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN_UNKNOWN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
      </Grid>
    </>
  );
}
