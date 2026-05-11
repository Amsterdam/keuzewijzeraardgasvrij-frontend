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

export const ROOF_TYPES = [
  { value: "", label: "Maak een keuze" },
  { value: "plat_dak", label: "Plat dak" },
  { value: "schuin_dak", label: "Schuin dak" },
];

export const HEATING_TYPES = [
  { value: "", label: "Maak een keuze" },
  { value: "cv_ketel", label: "CV-ketel" },
  { value: "warmtepomp", label: "Warmtepomp" },
];
