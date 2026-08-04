import { Font } from "@react-pdf/renderer";

// TTF, converted from @amsterdam/design-system-assets' WOFF2 files.
// react-pdf's font subsetter (fontkit) has a bug reconstructing compound
// glyphs (accented letters, "m²", ...) from WOFF2's glyf transform, which
// throws "RangeError: Offset is outside the bounds of the DataView" when
// embedding. Plain TTF glyf data doesn't go through that reconstruction
// and isn't affected.
import amsterdamSansRegular from "@/assets/fonts/AmsterdamSans-Regular.ttf?url";
import amsterdamSansItalic from "@/assets/fonts/AmsterdamSans-Italic.ttf?url";
import amsterdamSansBold from "@/assets/fonts/AmsterdamSans-Bold.ttf?url";
import amsterdamSansBoldItalic from "@/assets/fonts/AmsterdamSans-BoldItalic.ttf?url";

export const AMSTERDAM_SANS_FONT_FAMILY = "Amsterdam Sans";
export const FALLBACK_FONT_FAMILY = "Helvetica";

let registerPromise: Promise<void> | undefined;

/**
 * Registers the Amsterdam Sans font with react-pdf and waits until it has
 * actually loaded, so callers can fall back to the built-in Helvetica font
 * (see FALLBACK_FONT_FAMILY) if loading fails.
 */
export function loadAmsterdamSansFont(): Promise<void> {
  if (!registerPromise) {
    Font.register({
      family: AMSTERDAM_SANS_FONT_FAMILY,
      fonts: [
        {
          src: amsterdamSansRegular,
          fontWeight: "normal",
          fontStyle: "normal",
        },
        { src: amsterdamSansBold, fontWeight: "bold", fontStyle: "normal" },
        { src: amsterdamSansItalic, fontWeight: "normal", fontStyle: "italic" },
        {
          src: amsterdamSansBoldItalic,
          fontWeight: "bold",
          fontStyle: "italic",
        },
      ],
    });
    registerPromise = Font.load({
      fontFamily: AMSTERDAM_SANS_FONT_FAMILY,
      fontWeight: "normal",
      fontStyle: "normal",
    }).catch((error: unknown) => {
      // Allow a later retry (e.g. after the network issue is resolved)
      // instead of permanently caching the failure.
      registerPromise = undefined;
      throw error;
    });
  }
  return registerPromise;
}
