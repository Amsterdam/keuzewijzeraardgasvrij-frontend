import { type ReactNode } from "react";
import { Label } from "@amsterdam/design-system-react";
import { TooltipTrigger } from "./TooltipTrigger";
import styles from "./AdsLabelWithTooltip.module.css";

type Props = {
  label: string;
  content: ReactNode;
};

export function AdsLabelWithTooltip({ label, content }: Props) {
  return (
    <span className={styles.wrapper}>
      <Label>{label}</Label>
      <TooltipTrigger label={label} content={content} />
    </span>
  );
}
