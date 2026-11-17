/**
 * Structured tooltip ("info knop") content.
 *
 * Tooltip texts are shown on the website and printed in the PDF export.
 * Keeping them as plain data (instead of JSX) lets both renderers share
 * a single source, so the two can never drift apart.
 */

/** A piece of inline text: plain text or a link. */
export type InlineSegment = string | { text: string; href: string };

export type TooltipBlock =
  | { type: "paragraph"; content: InlineSegment[] }
  | { type: "heading"; text: string }
  | { type: "list"; items: InlineSegment[][] };

export type TooltipContent = TooltipBlock[];

/** Shorthand for the common case: a tooltip that is one plain paragraph. */
export function plainTooltip(text: string): TooltipContent {
  return [{ type: "paragraph", content: [text] }];
}
