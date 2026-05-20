import { useEffect, useRef, useState } from "react";
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

import { StatusLegend, TooltipTrigger } from "@/components";
import type { CalculationResult } from "@/types/CalculationResult";
import styles from "./ResultsCard.module.css";
import {
  getScoreReasonLabel,
  getStatusType,
  roundToWholeNumber,
} from "./results.helpers";

type Props = {
  result: CalculationResult;
  index: number;
};

const TOOLTIP_KOSTENINDICATIE =
  "Dit zijn de energiekosten, aanschafkosten, installatiekosten en onderhoudskosten, verdeeld over het aantal woningen en omgerekend naar een gemiddelde per jaar. Inflatie is hierbij niet meegenomen. De bedragen dienen als indicatie om de verschillende technieken met elkaar te vergelijken.";

export function ResultsCard({ result, index }: Props) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const detailsRef = useRef<HTMLDivElement>(null);
  const detailsId = `results-card-details-${index}`;

  // isDynamicResult: result has a score, meaning it is not a static result
  // with missing properties like redenen_score and kosten.
  const isDynamicResult = (result.score ?? 0) > 0;

  const showCosts =
    result.kosten_per_woning_per_jaar_laag > 0 &&
    result.kosten_per_woning_per_jaar_hoog > 0;

  const statusType = getStatusType(result.is_mogelijk, index);
  const scoreReasonLabel = getScoreReasonLabel(index);

  // Keep --details-height in sync with actual content height,
  // including after the initial mount when ref is first available.
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      el.style.setProperty("--details-height", `${el.scrollHeight}px`);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Column className={styles.card} gap="small">
      <Row align="between" wrap>
        <StatusLegend label={result.naam} type={statusType} />
        {isDynamicResult && (
          <Button
            icon={<ChevronDownIcon />}
            variant="tertiary"
            aria-expanded={isOpen}
            aria-controls={detailsId}
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
          id={detailsId}
          className={`${styles.details} ${isOpen ? styles.detailsOpen : ""}`}
          ref={detailsRef}
        >
          <div className={styles.detailsInner}>
            {showCosts && (
              <div className="ams-mb-l">
                <div className={styles.headingWithTooltip}>
                  <Heading level={4}>Kostenindicatie</Heading>
                  <TooltipTrigger
                    label="Kostenindicatie"
                    content={TOOLTIP_KOSTENINDICATIE}
                  />
                </div>
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
                      {result.beschrijving_url_title || result.beschrijving_url}
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
                  {result.redenen_niet_mogelijk.map((reden) => (
                    <UnorderedList.Item key={reden}>{reden}</UnorderedList.Item>
                  ))}
                </UnorderedList>
              </div>
            )}

            {result.redenen_score?.length > 0 && (
              <div>
                <Heading level={4}>{scoreReasonLabel}</Heading>
                <UnorderedList>
                  {result.redenen_score.map((reden) => (
                    <UnorderedList.Item key={reden}>{reden}</UnorderedList.Item>
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
