import { useState, useRef } from "react";
import {
  Button,
  Column,
  Heading,
  Icon,
  Link,
  Paragraph,
  Row,
  UnorderedList,
} from "@amsterdam/design-system-react";
import {
  ChevronDownIcon,
  LinkExternalIcon,
} from "@amsterdam/design-system-react-icons";

import { StatusLegend } from "@/components";
import type { CalculationResult } from "@/types/CalculationResult";
import styles from "./ResultsCard.module.css";
import {
  getLastPartFromSlash,
  getScoreReasonLabel,
  getStatusType,
  roundToWholeNumber,
} from "./results.helpers";

type Props = {
  result: CalculationResult;
  index: number;
};

export function ResultsCard({ result, index }: Props) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const detailsRef = useRef<HTMLDivElement>(null);
  const statusType = getStatusType(result.is_mogelijk, index);
  const scoreReasonLabel = getScoreReasonLabel(index);
  const showCosts =
    result.kosten_per_woning_per_jaar_laag > 0 &&
    result.kosten_per_woning_per_jaar_hoog > 0;
  const isDynamicResult = (result?.score ?? 0) > 0;

  return (
    <Column className={styles.card} gap="small">
      <Row align="between" wrap>
        <StatusLegend label={result.naam} type={statusType} />
        {isDynamicResult && (
          <Button
            icon={<ChevronDownIcon />}
            variant="tertiary"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className={styles.toggleButton}
          >
            {isOpen ? "Sluiten" : "Lees meer"}
          </Button>
        )}
      </Row>

      <Paragraph className="ams-mb-m">{result.beschrijving}</Paragraph>

      {isDynamicResult && (
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
            {showCosts && (
              <div className="ams-mb-l">
                <Heading level={4}>Kostenindicatie</Heading>
                <Paragraph>
                  Tussen de €{" "}
                  {roundToWholeNumber(result.kosten_per_woning_per_jaar_laag)}{" "}
                  en de €{" "}
                  {roundToWholeNumber(result.kosten_per_woning_per_jaar_hoog)}{" "}
                  per woning per jaar.
                </Paragraph>
              </div>
            )}
            {result.beschrijving_url && (
              <div className="ams-mb-l">
                <Heading level={4}>Meer informatie</Heading>
                <Paragraph>
                  <Link
                    href={result.beschrijving_url}
                    rel="external noopener"
                    target="_blank"
                  >
                    <span className={styles.linkIcon}>
                      <Icon svg={LinkExternalIcon} />{" "}
                      {getLastPartFromSlash(result.beschrijving_url)} | Duurzaam
                      Wonen Amsterdam
                    </span>
                  </Link>
                </Paragraph>
              </div>
            )}
            {result.redenen_niet_mogelijk?.length > 0 && (
              <div className="ams-mb-l">
                <Heading level={4}>
                  Deze techniek is niet mogelijk vanwege:
                </Heading>
                <UnorderedList>
                  {result.redenen_niet_mogelijk.map((reden, i) => (
                    <UnorderedList.Item key={i}>{reden}</UnorderedList.Item>
                  ))}
                </UnorderedList>
              </div>
            )}
            {result.redenen_score?.length > 0 && (
              <div>
                <Heading level={4}>{scoreReasonLabel}</Heading>
                <UnorderedList>
                  {result.redenen_score.map((reden, i) => (
                    <UnorderedList.Item key={i}>{reden}</UnorderedList.Item>
                  ))}
                </UnorderedList>
              </div>
            )}
          </div>
        </div>
      )}
    </Column>
  );
}

export default ResultsCard;
