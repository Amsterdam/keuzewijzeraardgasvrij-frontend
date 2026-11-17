import { Heading, Grid } from "@amsterdam/design-system-react";
import { SelectControl, TextInputControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN_UNKNOWN,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsLabelWithTooltip, TooltipBlocks } from "@/components";
import { FIELD_TOOLTIPS } from "../fieldTooltips";

export function TechnicalFormWishes() {
  return (
    <>
      <Heading level={3}>Wensen</Heading>
      <Grid
        paddingBottom="x-large"
        paddingTop="large"
        gapVertical="large"
        className="no-padding-inline align-items-end"
      >
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="In welk jaar wilt u uw warmtesysteem vervangen?"
            content={<TooltipBlocks content={FIELD_TOOLTIPS.jaarVervangen} />}
          />
          <TextInputControl<FormValues>
            name="jaarVervangen"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Moet het nieuwe warmtesysteem ook kunnen koelen?"
            name="wensTotKoelen"
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
