import { useEffect, useState } from "react";
import {
  ActionGroup,
  Button,
  Column,
  Grid,
  Heading,
  Paragraph,
  Row,
} from "@amsterdam/design-system-react";
import { DownloadIcon } from "@amsterdam/design-system-react-icons";

import { DEFAULT_CONTENT_SPAN } from "@/constants";
import { StatusLegend } from "@/components";
import IsolatieDialog from "./IsolatieDialog/IsolatieDialog";
import ResultsCard from "./ResultsCard/ResultsCard";
import { staticResults } from "./results.static";
import type { CalculationResult } from "@/types/CalculationResult";
import type { FormValues } from "@/features/TechnicalDetails/TechnicalForm/technicalFormSchema";

type Props = {
  results?: CalculationResult[];
  formValues?: Partial<FormValues>;
};

export default function ResultsView({ results = [], formValues }: Props) {
  const orderedResults = [...results, ...staticResults];
  const [isIsolatiePopupDismissed, setIsIsolatiePopupDismissed] =
    useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const shouldShowIsolatiePopup = Boolean(
    results?.some((result) => result.isolatie_popup),
  );

  useEffect(() => {
    setIsIsolatiePopupDismissed(false);
  }, [results]);

  const dismissIsolatieDialog = () => {
    setIsIsolatiePopupDismissed(true);
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const { downloadResultsPdf } = await import("./pdf/downloadResultsPdf");
      await downloadResultsPdf(orderedResults, formValues);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloadingPdf(false);
    }
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
          <Row align="between" wrap gap="x-large" className="ams-mb-xl">
            <Row wrap gap="x-large">
              <StatusLegend label="Best beoordeeld" type="success" />
              <StatusLegend label="Gemiddeld beoordeeld" type="warning" />
              <StatusLegend label="Niet mogelijk" type="error" />
            </Row>
            <ActionGroup>
              <Button
                variant="secondary"
                icon={<DownloadIcon />}
                iconBefore
                disabled={isDownloadingPdf}
                onClick={handleDownloadPdf}
              >
                {isDownloadingPdf ? "PDF wordt gemaakt..." : "Download als pdf"}
              </Button>
            </ActionGroup>
          </Row>

          {results.map((result, index) => (
            <ResultsCard key={index} index={index} result={result} />
          ))}
          <Column
            gap="x-small"
            style={{
              border: " 1px solid var(--ams-color-text)",
              padding: "var(--ams-space-m)",
            }}
          >
            <Heading level={2}>Nooit mogelijk</Heading>
            <Paragraph className="ams-mb-m">
              Deze warmtesystemen zijn nooit mogelijk. Ze zijn niet geschikt als
              individuele verwarmingsoplossing voor gebouwen of voldoen niet aan
              de uitgangspunten voor duurzame warmtevoorziening. Daarom worden
              ze altijd uitgesloten van het advies.
            </Paragraph>
            {staticResults.map((result, index) => (
              <ResultsCard key={index} index={index} result={result} />
            ))}
          </Column>
        </Grid.Cell>
      </Grid>
    </>
  );
}
