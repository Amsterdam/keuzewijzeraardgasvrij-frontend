// LoadingAdvice.tsx
import { Paragraph, Row } from "@amsterdam/design-system-react";
import styles from "./LoadingAdvice.module.css";

export function LoadingAdvice() {
  return (
    <div>
      <Row alignVertical="center" className={styles.row}>
        <div className={styles.spinner} />
        <Paragraph className={styles.title}>Een moment geduld...</Paragraph>
      </Row>

      <Paragraph>
        Op basis van jouw antwoorden genereren wij nu een reeks aan adviezen.
      </Paragraph>
    </div>
  );
}
