import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import { DEFAULT_SPAN, DEFAULT_OPTIONS_BOOLEAN } from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsTooltip } from "@/components";

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
          <AdsTooltip
            label="Wat is het gebruiksoppervlak (GO) van het hele gebouw (m²)?"
            content="U kunt het gebruiksoppervlak van alle woningen vinden op bagviewer.kadaster.nl"
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
          <AdsTooltip
            label="Mechanische ventilatie aanwezig?"
            content="Dit is een systeem dat automatisch binnenlucht afvoert uit ruimtes zoals de keuken, badkamer en het toilet. Verse lucht komt meestal binnen via roosters of ramen, maar kan ook via de mechanische ventilatie worden aangevoerd."
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
          <SelectControl<FormValues>
            label="Vloerverwarming aanwezig?"
            name="vloerverwarmingAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsTooltip
            label="Heeft u dubbel glas?"
            content="Klik op 'Ja' als meer dan 80% van het gebouw dubbel glas of beter heeft."
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
          <TextInputControl<FormValues>
            label="Hoeveel m² ruimte is er in de woningen beschikbaar voor installaties (per woning)?"
            name="beschikbareRuimteInWoningM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsTooltip
            label="Hoeveel m² ruimte is er in het gebouw beschikbaar voor gedeelde installaties?"
            content="Het gaat om collectieve technische ruimtes op de begane grond."
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
          <AdsTooltip
            label="Hoeveel m² ruimte is er buiten (op een plat dak of in de tuin) beschikbaar voor gedeelde installaties?"
            content="Het gaat om ruimte voor buitenunits zoals die van warmtepompen. De oppervlakte moet aaneengesloten zijn."
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteBuitenM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsTooltip
            label="Is er een WTW-installatie aanwezig?"
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
