import {
  Heading,
  Paragraph,
  Row,
  LinkList,
} from "@amsterdam/design-system-react";
import { ChevronBackwardIcon } from "@amsterdam/design-system-react-icons";
import styles from "./Steps.module.css";

export type StepItem = {
  title: string;
  percentage?: number;
};

export type StepsProps = {
  steps: StepItem[];
  currentStep: number;
  onPrevious?: () => void;
};

export function Steps({ steps, currentStep, onPrevious }: StepsProps) {
  const totalSteps = steps.length;

  const hasCustomPercentages = steps.some(
    (step) => step.percentage !== undefined,
  );

  const normalizedSteps = steps.map((step) => ({
    ...step,
    percentage: hasCustomPercentages
      ? (step.percentage ?? 0)
      : 100 / totalSteps,
  }));

  const progress = normalizedSteps
    .slice(0, currentStep)
    .reduce((acc, step) => acc + (step.percentage || 0), 0);

  // Laatste stap: geen heading & progress
  const isLastStep = currentStep === totalSteps;

  return (
    <>
      {!isLastStep && (
        <>
          <Row alignVertical="center" gap="large">
            <Heading level={3} className={styles.heading}>
              Stap {currentStep} van {totalSteps}
            </Heading>

            <Paragraph>{steps[currentStep - 1]?.title}</Paragraph>
          </Row>

          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}

      {/* Vorige stap alleen als huidige stap > 1 */}
      {currentStep > 1 && onPrevious && (
        <LinkList className={styles.previousLink}>
          <LinkList.Link
            href="#"
            icon={ChevronBackwardIcon}
            onClick={(e) => {
              e.preventDefault();
              onPrevious();
            }}
          >
            Vorige stap
          </LinkList.Link>
        </LinkList>
      )}
    </>
  );
}
