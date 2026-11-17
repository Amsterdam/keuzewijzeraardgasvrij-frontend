import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  SYSTEM_TYPES,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsLabelWithTooltip, TooltipBlocks } from "@/components";
import { FIELD_TOOLTIPS } from "../fieldTooltips";

export function TechnicalFormEnergy() {
  return (
    <>
      <Heading level={3}>Energetische gegevens</Heading>
      <Grid
        paddingBottom="x-large"
        paddingTop="large"
        gapVertical="large"
        className="no-padding-inline align-items-end"
      >
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Wordt het water in het gebouw verwarmd met gas?"
            name="tapwaterOpGas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Wordt er in het gebouw gekookt met gas?"
            content={<TooltipBlocks content={FIELD_TOOLTIPS.kokenOpGas} />}
          />
          <SelectControl<FormValues>
            name="kokenOpGas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Totaal gasverbruik van de VvE (m³)"
            content={
              <TooltipBlocks content={FIELD_TOOLTIPS.gasverbruikVveTotaal} />
            }
          />
          <TextInputControl<FormValues>
            name="gasverbruikVveTotaal"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoe wordt het gebouw nu verwarmd?"
            content={<TooltipBlocks content={FIELD_TOOLTIPS.huidigSysteem} />}
          />
          <SelectControl<FormValues>
            name="huidigSysteem"
            options={SYSTEM_TYPES}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
      </Grid>
    </>
  );
}
