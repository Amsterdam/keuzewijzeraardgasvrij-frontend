import { Heading } from "@amsterdam/design-system-react";

import styles from "./StatusLegend.module.css";

type StatusType = "success" | "warning" | "error";

type StatusLegendProps = {
  label: string;
  type: StatusType;
};

export function StatusLegend({ label, type }: StatusLegendProps) {
  return (
    <div className={styles.item}>
      <span className={`${styles.bullet} ${styles[type]}`} />
      <Heading level={4}>{label}</Heading>
    </div>
  );
}
