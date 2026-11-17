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
import {
  NOOIT_MOGELIJK_HEADING,
  NOOIT_MOGELIJK_INTRO,
  RESULTS_HEADING,
  RESULTS_INTRO,
  STATUS_LEGEND_LABELS,
} from "./results.texts";
import type { FormValues } from "@/features/TechnicalDetails/TechnicalForm/technicalFormSchema";

type Props = {
  results?: CalculationResult[];
  formValues?: Partial<FormValues>;
};

export default function ResultsView({ results = [], formValues }: Props) {
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
      await downloadResultsPdf(results, formValues);
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
            {RESULTS_HEADING}
          </Heading>
          <Paragraph className="ams-mb-l">{RESULTS_INTRO}</Paragraph>
          <Row align="between" wrap gap="x-large" className="ams-mb-xl">
            <Row wrap gap="x-large">
              <StatusLegend
                label={STATUS_LEGEND_LABELS.success}
                type="success"
              />
              <StatusLegend
                label={STATUS_LEGEND_LABELS.warning}
                type="warning"
              />
              <StatusLegend label={STATUS_LEGEND_LABELS.error} type="error" />
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
            <Heading level={2}>{NOOIT_MOGELIJK_HEADING}</Heading>
            <Paragraph className="ams-mb-m">{NOOIT_MOGELIJK_INTRO}</Paragraph>
            {staticResults.map((result, index) => (
              <ResultsCard key={index} index={index} result={result} />
            ))}
          </Column>
        </Grid.Cell>
      </Grid>
    </>
  );
}
