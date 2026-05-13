import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import { DEFAULT_SPAN, DEFAULT_OPTIONS_BOOLEAN } from "../formConstants";
import type { FormValues } from "../technicalFormSchema";

type Props = {
  isLoading: boolean;
};

export function TechnicalFormBuilding({ isLoading }: Props) {
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
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Wat is het gebruiksoppervlak (GO) van het hele gebouw (m²)?"
            name="brutoVloeroppervlak"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Aantal woningen in VvE"
            name="aantalWoningen"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Mechanische ventilatie aanwezig?"
            name="mechanischeVentilatieAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            disabled={isLoading}
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
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Heeft u dubbel glas?"
            name="dubbelGlas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            disabled={isLoading}
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
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Hoeveel m² ruimte is er in het gebouw beschikbaar voor gedeelde installaties?"
            name="beschikbareCollectieveRuimteBinnenM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Hoeveel m² ruimte is er buiten (op een plat dak of in de tuin) beschikbaar voor gedeelde installaties?"
            name="beschikbareCollectieveRuimteBuitenM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Is er een WTW-installatie aanwezig?"
            name="wtwAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
      </Grid>
    </>
  );
}
