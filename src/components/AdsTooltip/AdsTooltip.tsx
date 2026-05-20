import { useId, type ReactNode } from "react";
import { Icon, Label } from "@amsterdam/design-system-react";
import { InfoIcon } from "@amsterdam/design-system-react-icons";
import styles from "./AdsTooltip.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

type AdsTooltipProps = {
  label: string;
  content: ReactNode;
};

export function AdsTooltip({ label, content }: AdsTooltipProps) {
  const id = useId();
  const anchorId = `tooltip-anchor-${id}`;

  return (
    <span className={styles.wrapper}>
      <Label>
        <span aria-describedby={anchorId}>{label}</span>
      </Label>

      <button
        id={anchorId}
        type="button"
        className={styles.triggerButton}
        aria-label={`Meer informatie over ${label}`}
        data-tooltip-id={id}
      >
        <Icon svg={InfoIcon} size="heading-2" className={styles.icon} />
      </button>

      <ReactTooltip
        id={id}
        role="tooltip"
        place="top"
        clickable
        openOnClick
        globalCloseEvents={{ escape: true, clickOutsideAnchor: true }}
        variant="light"
        className={styles.tooltip}
        classNameArrow={styles.tooltipArrow}
        render={() => content}
      />
    </span>
  );
}
