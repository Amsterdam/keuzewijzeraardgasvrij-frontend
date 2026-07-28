import { useEffect, useState } from "react";
import { Grid, Heading, Paragraph, Row } from "@amsterdam/design-system-react";

import { DEFAULT_CONTENT_SPAN } from "@/constants";
import { StatusLegend } from "@/components";
import IsolatieDialog from "./IsolatieDialog/IsolatieDialog";
import ResultsCard from "./ResultsCard/ResultsCard";
import { staticResults } from "./results.static";
import type { CalculationResult } from "@/types/CalculationResult";

type Props = {
  results?: CalculationResult[];
};

export default function ResultsView({ results }: Props) {
  const orderedResults = [...(results ?? []), ...staticResults];
  const [isIsolatiePopupDismissed, setIsIsolatiePopupDismissed] =
    useState(false);
  const shouldShowIsolatiePopup = Boolean(
    results?.some((result) => result.isolatie_popup),
  );

  useEffect(() => {
    setIsIsolatiePopupDismissed(false);
  }, [results]);

  const dismissIsolatieDialog = () => {
    setIsIsolatiePopupDismissed(true);
  };

  return (
    <>
      <IsolatieDialog
        isOpen={shouldShowIsolatiePopup && !isIsolatiePopupDismissed}
        onDismiss={dismissIsolatieDialog}
      />
      <Grid className="no-padding-inline">
        <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
          <Heading level={2} className="ams-mb-m">
            Adviezen voor warmtesystemen
          </Heading>
          <Paragraph className="ams-mb-l">
            Op basis van uw gegevens ziet u hieronder welke warmtesystemen het
            beste bij uw gebouw passen. Bovenaan wat het beste past, onderaan
            wat het minst past. Klik met uw muis op een systeem voor meer
            uitleg. De kleuren betekenen: best beoordeeld (groen), gemiddeld
            beoordeeld (oranje) en niet mogelijk (rood). In sommige situaties
            zijn de best beoordeelde warmtesystemen niet mogelijk.
          </Paragraph>
          <Row wrap gap="x-large" className="ams-mb-xl">
            <StatusLegend label="Best beoordeeld" type="success" />
            <StatusLegend label="Gemiddeld beoordeeld" type="warning" />
            <StatusLegend label="Niet mogelijk" type="error" />
          </Row>
          {orderedResults.map((result, index) => (
            <ResultsCard key={index} index={index} result={result} />
          ))}
        </Grid.Cell>
      </Grid>
    </>
  );
}
