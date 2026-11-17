import { Path, Svg } from "@react-pdf/renderer";

// The same logo the website header shows. react-pdf can't embed an SVG
// file directly, so its <path> elements are redrawn with react-pdf's own
// Svg primitives, which keeps the logo sharp at any zoom level.
import logoSvg from "@amsterdam/design-system-assets/logo/amsterdam-logo.svg?raw";

const LOGO_VIEWBOX = /viewBox="([^"]+)"/.exec(logoSvg)?.[1] ?? "0 0 115.855 40";
const [, , LOGO_WIDTH, LOGO_HEIGHT] = LOGO_VIEWBOX.split(/\s+/).map(Number);

const LOGO_PATHS = (logoSvg.match(/<path\b[^>]*>/g) ?? []).map((tag) => ({
  d: /\sd="([^"]+)"/.exec(tag)?.[1] ?? "",
  fill: /\sfill="([^"]+)"/.exec(tag)?.[1] ?? "#EC0000",
}));

export function PdfLogo({ height }: { height: number }) {
  return (
    <Svg
      viewBox={LOGO_VIEWBOX}
      style={{ height, width: (height * LOGO_WIDTH) / LOGO_HEIGHT }}
    >
      {LOGO_PATHS.map((path, index) => (
        <Path key={index} d={path.d} fill={path.fill} />
      ))}
    </Svg>
  );
}
