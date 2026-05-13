import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  ROOF_TYPES,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";

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
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Bruto vloeroppervlak (BVO m²)"
            name="brutoVloeroppervlak"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
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
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Mechanische ventilatie aanwezig?"
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
          <SelectControl<FormValues>
            label="Inpandige berging aanwezig?"
            name="inpandigeBergingAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Ruimte op het dak aanwezig?"
            name="ruimteOpHetDakAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Type dak"
            name="typeDak"
            options={ROOF_TYPES}
            registerOptions={{ required: true }}
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
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Hoeveel beschikbare ruimte heeft u in uw woning (m²)?"
            name="beschikbareRuimteInWoningM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Hoeveel beschikbare collectieve ruimte heeft u binnen (m²)?"
            name="beschikbareCollectieveRuimteBinnenM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Hoeveel beschikbare collectieve ruimte heeft u buiten (m²)?"
            name="beschikbareCollectieveRuimteBuitenM2"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Is er een WTW-installatie aanwezig?"
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
