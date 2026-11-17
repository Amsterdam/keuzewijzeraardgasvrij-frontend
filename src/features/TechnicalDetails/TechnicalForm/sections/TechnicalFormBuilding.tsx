import { Heading, Grid } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  DEFAULT_OPTIONS_BOOLEAN_UNKNOWN,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsLabelWithTooltip, TooltipBlocks } from "@/components";
import { FIELD_TOOLTIPS } from "../fieldTooltips";

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
          <AdsLabelWithTooltip
            label="Wat is het bruto vloeroppervlak (BVO) van het hele gebouw (m²)?"
            content={
              <TooltipBlocks content={FIELD_TOOLTIPS.brutoVloeroppervlak} />
            }
          />
          <TextInputControl<FormValues>
            name="brutoVloeroppervlak"
            pattern="[0-9.,]*"
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
          <AdsLabelWithTooltip
            label="Is er mechanische ventilatie?"
            content={
              <TooltipBlocks
                content={FIELD_TOOLTIPS.mechanischeVentilatieAanwezig}
              />
            }
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
          <AdsLabelWithTooltip
            label="Is er vloerverwarming?"
            content={
              <TooltipBlocks content={FIELD_TOOLTIPS.vloerverwarmingAanwezig} />
            }
          />
          <SelectControl<FormValues>
            name="vloerverwarmingAanwezig"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Heeft het gebouw dubbel glas?"
            content={<TooltipBlocks content={FIELD_TOOLTIPS.dubbelGlas} />}
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
          <AdsLabelWithTooltip
            label="Hoeveel m² ruimte is er in elke woning voor het plaatsen van installaties?"
            content={
              <TooltipBlocks
                content={FIELD_TOOLTIPS.beschikbareRuimteInWoningM2}
              />
            }
          />
          <TextInputControl<FormValues>
            name="beschikbareRuimteInWoningM2"
            pattern="[0-9.,]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² ruimte is er in het gebouw voor gedeelde installaties?"
            content={
              <TooltipBlocks
                content={FIELD_TOOLTIPS.beschikbareCollectieveRuimteBinnenM2}
              />
            }
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteBinnenM2"
            pattern="[0-9.,]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>

        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² ruimte is er buiten het gebouw voor gedeelde installaties?"
            content={
              <TooltipBlocks
                content={FIELD_TOOLTIPS.beschikbareCollectieveRuimteDakM2}
              />
            }
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteDakM2"
            pattern="[0-9.,]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Hoeveel m² grond is er buiten het gebouw om bodemlussen te boren?"
            content={
              <TooltipBlocks
                content={FIELD_TOOLTIPS.beschikbareCollectieveRuimteTuinM2}
              />
            }
          />
          <TextInputControl<FormValues>
            name="beschikbareCollectieveRuimteTuinM2"
            pattern="[0-9.,]*"
            registerOptions={{ required: true }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Is er een warmte-terugwin-installatie (WTW)?"
            content={<TooltipBlocks content={FIELD_TOOLTIPS.wtwAanwezig} />}
          />
          <SelectControl<FormValues>
            name="wtwAanwezig"
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
