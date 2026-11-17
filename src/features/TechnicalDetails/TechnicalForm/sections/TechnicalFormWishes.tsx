import { Heading, Grid } from "@amsterdam/design-system-react";
import { SelectControl, TextInputControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN_UNKNOWN,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsLabelWithTooltip } from "@/components";

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
            content="Denk bijvoorbeeld aan het jaar waarin groot onderhoud gepland staat, zoals het vervangen van de cv-ketels of de rookgasafvoerkanalen. Weet u het nog niet? Vul dan een schatting in. Het jaartal bepaalt of er rekening gehouden kan worden met plannen van de gemeente, en hoeveel tijd u heeft om u voor te bereiden."
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
