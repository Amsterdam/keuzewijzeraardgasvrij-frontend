import type { GridCellProps } from "@amsterdam/design-system-react";

export const DEFAULT_SPAN: GridCellProps["span"] = {
  narrow: 4,
  medium: 4,
  wide: 4,
};

export const DEFAULT_OPTIONS_BOOLEAN = [
  { value: "", label: "Maak een keuze" },
  { value: "true", label: "Ja" },
  { value: "false", label: "Nee" },
];

export const DEFAULT_OPTIONS_BOOLEAN_UNKNOWN = [
  ...DEFAULT_OPTIONS_BOOLEAN,
  { value: "false", label: "Weet ik niet" },
];

export const SYSTEM_TYPES = [
  { value: "", label: "Maak een keuze" },
  { value: "collectief", label: "Collectief" },
  { value: "individueel", label: "Individueel" },
];
