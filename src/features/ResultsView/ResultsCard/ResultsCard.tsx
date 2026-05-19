import { useState, useRef } from "react";
import {
  Button,
  Column,
  Heading,
  Paragraph,
  Row,
  UnorderedList,
} from "@amsterdam/design-system-react";
import { ChevronDownIcon } from "@amsterdam/design-system-react-icons";

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

function getStatusType(
  redenen: CalculationResult["redenen"],
  index: number,
): "success" | "warning" | "error" {
  if (redenen.length > 0) {
    return "error";
  } else if (index < 3) {
    return "success";
  } else if (index < 6) {
    return "warning";
  } else {
    return "error";
  }
}

export function ResultsCard({ result, index }: Props) {
  const statusType = getStatusType(result.redenen, index);
  const [isOpen, setIsOpen] = useState(index === 0);
  const detailsRef = useRef<HTMLDivElement>(null);

  return (
    <Column className={styles.card} gap="small">
      <Row align="between" wrap>
        <StatusLegend label={result.naam} type={statusType} />
        <Button
          icon={<ChevronDownIcon />}
          variant="tertiary"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.toggleButton}
        >
          {isOpen ? "Sluiten" : "Lees meer"}
        </Button>
      </Row>

      <Paragraph className="ams-mb-m">{result.beschrijving}</Paragraph>

      <div
        className={`${styles.details} ${isOpen ? styles.detailsOpen : ""}`}
        ref={detailsRef}
        style={
          {
            "--details-height": detailsRef.current
              ? `${detailsRef.current.scrollHeight}px`
              : "0px",
          } as React.CSSProperties
        }
      >
        <div className={styles.detailsInner}>
          <Heading level={4}>Kostenindicatie</Heading>
          <Paragraph className="ams-mb-m">
            € {roundToWholeNumber(result.kosten_per_woning_per_jaar)} per jaar
            per woning
          </Paragraph>
          {result.redenen.length > 0 && (
            <>
              <Heading level={4}>
                Deze techniek is niet mogelijk vanwege:
              </Heading>
              <UnorderedList>
                {result.redenen.map((reden, i) => (
                  <UnorderedList.Item key={i}>{reden}</UnorderedList.Item>
                ))}
              </UnorderedList>
            </>
          )}
        </div>
      </div>
    </Column>
  );
}

export default ResultsCard;
