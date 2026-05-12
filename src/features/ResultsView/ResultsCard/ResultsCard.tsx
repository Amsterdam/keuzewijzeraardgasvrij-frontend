import {
  Column,
  Heading,
  Paragraph,
  UnorderedList,
} from "@amsterdam/design-system-react";

import { StatusLegend } from "@/components";
import type { CalculationResult } from "@/types/CalculationResult";
import styles from "./ResultsCard.module.css";

type Props = {
  result: CalculationResult;
  index: number;
};

function roundToWholeNumber(value: number): number {
  return Math.round(value);
}

export function ResultsCard({ result, index }: Props) {
  const statusType = index < 3 ? "success" : index < 6 ? "warning" : "error";

  return (
    <Column className={styles.card} gap="small">
      <StatusLegend label={result.naam} type={statusType} />
      <Paragraph className="ams-mb-m">{result.beschrijving}</Paragraph>
      <Heading level={4}>Kostenindicatie</Heading>
      <Paragraph className="ams-mb-m">
        € {roundToWholeNumber(result.kosten_per_woning_per_jaar)} per jaar per
        woning
      </Paragraph>
      {result.redenen.length > 0 && (
        <>
          <Heading level={4}>Deze techniek is niet mogelijk vanwege:</Heading>
          <UnorderedList>
            {result.redenen.map((reden, index) => (
              <UnorderedList.Item key={index}>{reden}</UnorderedList.Item>
            ))}
          </UnorderedList>
        </>
      )}
    </Column>
  );
}

export default ResultsCard;
