import { Grid, Heading, Paragraph, Row } from "@amsterdam/design-system-react";

import { DEFAULT_CONTENT_SPAN } from "@/constants";
import { StatusLegend } from "@/components";
import ResultsCard from "./ResultsCard/ResultsCard";
import { staticResults } from "./results.static";
import type { CalculationResult } from "@/types/CalculationResult";

type Props = {
  results?: CalculationResult[];
};

export default function ResultsView({ results }: Props) {
  const orderedResults = [...(results ?? []), ...staticResults];
  return (
    <>
      <Grid className="no-padding-inline">
        <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
          <Heading level={2} className="ams-mb-m">
            Adviezen voor warmtesystemen
          </Heading>
          <Paragraph className="ams-mb-l">
            Hieronder staan van boven naar beneden verschillende warmtesystemen
            gerangschikt op basis van uw input. Bovenaan het meest aansluitend
            en onderaan het minst. Beweeg met uw muis over de oplossing heen
            voor meer informatie en uitleg. De kleuren geven het volgende aan:
          </Paragraph>
          <Row wrap gap="x-large" className="ams-mb-xl">
            <StatusLegend label="Aanbevolen keuze" type="success" />
            <StatusLegend label="Mogelijke keuze" type="warning" />
            <StatusLegend label="Keuze niet mogelijk" type="error" />
          </Row>
          {orderedResults.map((result, index) => (
            <ResultsCard key={index} index={index} result={result} />
          ))}
        </Grid.Cell>
      </Grid>
    </>
  );
}
