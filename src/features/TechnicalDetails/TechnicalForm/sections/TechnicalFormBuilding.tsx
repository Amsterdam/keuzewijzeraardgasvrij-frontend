import { Heading, Grid, Link } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import { DEFAULT_SPAN, DEFAULT_OPTIONS_BOOLEAN } from "../formConstants";
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
            label="Hoeveel m² ruimte is er in elke woning voor installaties?"
            content="Bijvoorbeeld voor een warmtepomp. Deze past soms op de plek van de huidige cv-ketel."
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
            content="Het gaat om collectieve technische ruimtes voor bijvoorbeeld een collectieve warmtewisselaar."
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
            label="Hoeveel m² tuinoppervlak is er in totaal?"
            content="Het gaat om de beschikbare ruimte voor bijvoorbeeld het boren van bodemlussen."
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
            label="Hoeveel m² ruimte is er op het dak beschikbaar voor gedeelde installaties?"
            content="Het gaat om ruimte op een plat dak voor gedeelde installaties. De oppervlakte moet aaneengesloten zijn."
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
            label="Is er een warmte-terugwin-installatie (WTW)?"
            content="Dit is een systeem dat warmte uit afgevoerde lucht hergebruikt om binnenkomende lucht voor te verwarmen. Hierdoor gaat minder warmte verloren en wordt energie bespaard."
          />
          <SelectControl<FormValues>
            name="wtwAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
      </Grid>
    </>
  );
}
