import { useId, type ReactNode } from "react";
import { Icon } from "@amsterdam/design-system-react";
import { InfoIcon } from "@amsterdam/design-system-react-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import styles from "./TooltipTrigger.module.css";

type Props = {
  label: string;
  content: ReactNode;
};

export function TooltipTrigger({ label, content }: Props) {
  const id = useId();
  const anchorId = `tooltip-anchor-${id}`;

  return (
    <>
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
    </>
  );
}
