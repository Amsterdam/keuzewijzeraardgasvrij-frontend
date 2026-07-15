import { useEffect, useRef } from "react";
import {
  ActionGroup,
  Button,
  Dialog,
  Paragraph,
} from "@amsterdam/design-system-react";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

const ISOLATIE_INFO_URL =
  "https://duurzaamwonen.amsterdam/vve/nieuws/isoleren-met-uw-vve";

export function IsolatieDialog({ isOpen, onDismiss }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const requestClose = () => {
    dialogRef.current?.close();
  };

  const openIsolatieInfo = () => {
    window.open(ISOLATIE_INFO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog
      ref={dialogRef}
      footer={
        <ActionGroup>
          <Button onClick={openIsolatieInfo} type="button">
            Meer informatie over isoleren
          </Button>
          <Button onClick={requestClose} variant="secondary">
            Sluiten
          </Button>
        </ActionGroup>
      }
      heading="Isolatie"
      id="isolatie-dialog"
      onCancel={onDismiss}
      onClose={onDismiss}
    >
      <form id="isolatie-dialog-form" method="dialog">
        <Paragraph>
          Op basis van het huidige gasverbruik lijkt het erop dat het gebouw
          niet goed geisoleerd is. De keuzewijzer Aardgasvrij werkt minder goed
          voor slecht geisoleerde woningen.
        </Paragraph>
      </form>
    </Dialog>
  );
}

export default IsolatieDialog;
