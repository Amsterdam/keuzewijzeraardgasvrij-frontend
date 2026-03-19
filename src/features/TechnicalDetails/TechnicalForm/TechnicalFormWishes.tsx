import { Heading, Grid } from "@amsterdam/design-system-react";
import { SelectControl } from "@amsterdam/ee-ads-rhf";
import { DEFAULT_SPAN, DEFAULT_OPTIONS_BOOLEAN } from "./formConstants";
import type { FormValues } from "./technicalFormSchema";

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
        className="no-padding-inline"
      >
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
