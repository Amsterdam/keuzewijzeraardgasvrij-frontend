import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  ROOF_TYPES,
} from "./formConstants";
import type { FormValues } from "./technicalFormSchema";

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
        className="no-padding-inline"
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
            label="Bruto vloeroppervlak (BVO m²)"
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
            label="Inpandige berging aanwezig?"
            name="inpandigeBergingAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
      </Grid>
    </>
  );
}
