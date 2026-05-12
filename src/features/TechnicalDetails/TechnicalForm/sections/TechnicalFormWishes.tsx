import { Heading, Grid } from "@amsterdam/design-system-react";
import { SelectControl, TextInputControl } from "@amsterdam/ee-ads-rhf";
import { DEFAULT_SPAN, DEFAULT_OPTIONS_BOOLEAN } from "../formConstants";
import type { FormValues } from "../technicalFormSchema";

type Props = {
  isLoading: boolean;
};

export function TechnicalFormWishes({ isLoading }: Props) {
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
          <TextInputControl<FormValues>
            label="In welk jaar wilt u uw warmtesysteem vervangen?"
            name="jaarVervangen"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            disabled={isLoading}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Volledig gasloos"
            name="volledigGasLoos"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            disabled={isLoading}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Wens tot koelen"
            name="wensTotKoelen"
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
