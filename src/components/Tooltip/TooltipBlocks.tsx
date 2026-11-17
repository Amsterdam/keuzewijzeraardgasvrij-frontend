import { Fragment } from "react";
import { Link } from "@amsterdam/design-system-react";

import type { InlineSegment, TooltipContent } from "@/content/tooltipContent";

function InlineSegments({ segments }: { segments: InlineSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          <Fragment key={index}>{segment}</Fragment>
        ) : (
          <Link
            key={index}
            href={segment.href}
            rel="external noopener"
            target="_blank"
          >
            {segment.text}
          </Link>
        ),
      )}
    </>
  );
}

/** Renders structured tooltip content as HTML for the website. */
export function TooltipBlocks({ content }: { content: TooltipContent }) {
  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <Fragment key={index}>
                {index > 0 && <br />}
                <strong>{block.text}</strong>
              </Fragment>
            );
          case "paragraph":
            return (
              <div key={index}>
                <InlineSegments segments={block.content} />
              </div>
            );
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <InlineSegments segments={item} />
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
