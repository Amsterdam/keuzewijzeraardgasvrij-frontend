import { Grid, Paragraph } from "@amsterdam/design-system-react";
import TechnicalForm from "./TechnicalForm/TechnicalForm";
import { DEFAULT_CONTENT_SPAN } from "@/constants";
import type { CalculationResults } from "@/types/CalculationResult";

type Props = {
  address?: BAGPdokAddress;
  onNext: (result: CalculationResults) => void;
};

export default function TechnicalDetails({ address, onNext }: Props) {
  return (
    <>
      <Grid className="no-padding-inline">
        <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
          <Paragraph className="ams-mb-m">
            Op basis van <strong>{address?.weergavenaam}</strong> hebben wij een
            aantal gegevens opgehaald. Controleer deze gegevens en vul ze aan
            waar nodig.
          </Paragraph>
        </Grid.Cell>
      </Grid>
      <TechnicalForm onNext={onNext} address={address} />
    </>
  );
}
