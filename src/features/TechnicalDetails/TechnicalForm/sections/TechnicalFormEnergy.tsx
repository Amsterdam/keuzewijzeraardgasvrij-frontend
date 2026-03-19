import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  HEATING_TYPES,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";

type Props = {
  isLoading: boolean;
};

export function TechnicalFormEnergy({ isLoading }: Props) {
  return (
    <>
      <Heading level={3}>Energetische gegevens</Heading>
      <Grid
        paddingBottom="x-large"
        paddingTop="large"
        gapVertical="large"
        className="no-padding-inline"
      >
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Tapwater op gas?"
            name="tapwaterOpGas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Gasverbruik 1 woning (m³)"
            name="gasverbruikPerWoning"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Gasverbruik VvE totaal (m³)"
            name="gasverbruikVveTotaal"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Elektriciteitsverbruik 1 woning (kWh)"
            name="elektriciteitsverbruikPerWoning"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Elektriciteitsverbruik VvE totaal (kWh)"
            name="elektriciteitsverbruikVveTotaal"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <TextInputControl<FormValues>
            label="Gecontracteerd vermogen (GTV, kW)"
            name="gecontracteerdVermogen"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Huidige warmtesysteem"
            name="huidigeWarmtesysteem"
            options={HEATING_TYPES}
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
