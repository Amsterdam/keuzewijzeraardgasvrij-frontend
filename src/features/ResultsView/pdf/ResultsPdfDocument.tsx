import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { CalculationResult } from "@/types/CalculationResult";
import type { FormValues } from "@/features/TechnicalDetails/TechnicalForm/technicalFormSchema";
import { FORM_FIELD_SECTIONS, formatFieldValue } from "./formFieldLabels";
import { AMSTERDAM_SANS_FONT_FAMILY, FALLBACK_FONT_FAMILY } from "./pdfFonts";
import { PdfLogo } from "./PdfLogo";
import {
  getStatusType,
  roundToWholeNumber,
} from "../ResultsCard/results.helpers";
import { staticResults } from "../results.static";
import {
  getTuinTekst,
  KOSTENINDICATIE_TOELICHTING,
  NOOIT_MOGELIJK_HEADING,
  NOOIT_MOGELIJK_INTRO,
  RESULTS_HEADING,
  RESULTS_INTRO,
  STATUS_LEGEND_LABELS,
} from "../results.texts";
import {
  WELCOME_INTRO_PARAGRAPHS,
  WELCOME_LET_OP,
  WELCOME_UITKOMST_HEADING,
  WELCOME_UITKOMST_PARAGRAPHS,
} from "@/components/WelcomeSection/welcomeTexts";
import { getFieldTooltip } from "@/features/TechnicalDetails/TechnicalForm/fieldTooltips";
import type { InlineSegment, TooltipContent } from "@/content/tooltipContent";

type Props = {
  /** Calculated results; the static "nooit mogelijk" results are added by the document itself. */
  results: CalculationResult[];
  formValues: Partial<FormValues> | undefined;
  /** Defaults to Amsterdam Sans; pass FALLBACK_FONT_FAMILY if it failed to load. */
  fontFamily?: string;
};

const STATUS_COLORS: Record<"success" | "warning" | "error", string> = {
  success: "#4caf50",
  warning: "#f5a623",
  error: "#e53935",
};

function createStyles(fontFamily: string) {
  // The standard PDF font "Helvetica" has no separate weight axis: bold
  // text needs the distinct "Helvetica-Bold" base font. Custom fonts like
  // Amsterdam Sans register their weights under one family name instead.
  const isStandardFont = fontFamily === FALLBACK_FONT_FAMILY;
  const bold = isStandardFont
    ? { fontFamily: "Helvetica-Bold" }
    : { fontFamily, fontWeight: "bold" as const };

  return StyleSheet.create({
    page: {
      paddingHorizontal: 40,
      paddingVertical: 36,
      fontSize: 12,
      fontFamily,
      color: "#1a1a1a",
    },
    logo: {
      marginBottom: 24,
    },
    title: {
      ...bold,
      fontSize: 18,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 10,
      color: "#5a5a5a",
      marginBottom: 20,
    },
    sectionHeading: {
      ...bold,
      fontSize: 14,
      marginTop: 16,
      marginBottom: 8,
    },
    fieldSectionHeading: {
      ...bold,
      marginTop: 10,
      marginBottom: 4,
    },
    field: {
      paddingVertical: 6,
      borderBottomWidth: 0.5,
      borderBottomColor: "#e0e0e0",
    },
    fieldRow: {
      flexDirection: "row",
    },
    fieldLabel: {
      width: "80%",
    },
    fieldValue: {
      ...bold,
      width: "20%",
    },
    // Rendered below the label row (not inside it): react-pdf measures text
    // in nested flex rows unreliably, which made the lines overlap.
    fieldNote: {
      paddingRight: 100,
    },
    card: {
      borderWidth: 1,
      borderColor: "#d9d9d9",
      borderRadius: 2,
      padding: 12,
      marginBottom: 12,
    },
    cardHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    statusBullet: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      marginRight: 6,
    },
    cardTitle: {
      ...bold,
    },
    paragraph: {
      marginBottom: 8,
      lineHeight: 1.05,
    },
    detailHeading: {
      ...bold,
      marginTop: 6,
      marginBottom: 2,
    },
    listItem: {
      flexDirection: "row",
      marginBottom: 8,
      marginLeft: 12,
    },
    listItemBullet: {
      marginRight: 8,
    },
    listItemText: {
      flex: 1,
    },
    link: {
      color: "#005EA2",
      textDecoration: "underline",
    },
    note: {
      fontSize: 10,
      color: "#5a5a5a",
      marginTop: 2,
    },
    noteHeading: {
      ...bold,
      fontSize: 10,
      color: "#5a5a5a",
      marginTop: 4,
    },
    noteListItem: {
      flexDirection: "row",
      marginLeft: 8,
    },
    legendRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 40,
      right: 40,
      fontSize: 10,
      color: "#8a8a8a",
      textAlign: "center",
    },
  });
}

type Styles = ReturnType<typeof createStyles>;

function InlineSegments({
  segments,
  styles,
}: {
  segments: InlineSegment[];
  styles: Styles;
}) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <Link key={index} src={segment.href} style={styles.link}>
            {segment.text}
          </Link>
        ),
      )}
    </>
  );
}

/** PDF counterpart of the website's TooltipBlocks ("info knop" texts). */
function TooltipNote({
  content,
  styles,
}: {
  content: TooltipContent;
  styles: Styles;
}) {
  return (
    <View>
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <Text key={index} style={styles.noteHeading}>
                {block.text}
              </Text>
            );
          case "paragraph":
            return (
              <Text key={index} style={styles.note}>
                <InlineSegments segments={block.content} styles={styles} />
              </Text>
            );
          case "list":
            return (
              <View key={index}>
                {block.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.noteListItem}>
                    <Text style={[styles.note, styles.listItemBullet]}>•</Text>
                    <Text style={[styles.note, styles.listItemText]}>
                      <InlineSegments segments={item} styles={styles} />
                    </Text>
                  </View>
                ))}
              </View>
            );
        }
      })}
    </View>
  );
}

function IntroSection({ styles }: { styles: Styles }) {
  return (
    <View>
      {WELCOME_INTRO_PARAGRAPHS.map((text) => (
        <Text key={text} style={styles.paragraph}>
          {text}
        </Text>
      ))}
      <Text style={styles.fieldSectionHeading} minPresenceAhead={40}>
        {WELCOME_UITKOMST_HEADING}
      </Text>
      {WELCOME_UITKOMST_PARAGRAPHS.map((text) => (
        <Text key={text} style={styles.paragraph}>
          {text}
        </Text>
      ))}
      <Text style={styles.paragraph}>
        <Text style={styles.cardTitle}>{WELCOME_LET_OP.label}</Text>{" "}
        {WELCOME_LET_OP.text}
      </Text>
    </View>
  );
}

function FormFieldsSection({
  formValues,
  styles,
}: {
  formValues: Partial<FormValues> | undefined;
  styles: Styles;
}) {
  return (
    <View break>
      <Text style={styles.sectionHeading}>Ingevoerde gegevens</Text>
      {FORM_FIELD_SECTIONS.map((section) => (
        <View key={section.title}>
          <Text style={styles.fieldSectionHeading} minPresenceAhead={40}>
            {section.title}
          </Text>
          {section.fields.map((field) => {
            const tooltip = getFieldTooltip(field.key);
            return (
              <View key={String(field.key)} style={styles.field} wrap={false}>
                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.fieldValue}>
                    {formatFieldValue(formValues?.[field.key], field.format)}
                  </Text>
                </View>
                {tooltip && (
                  <View style={styles.fieldNote}>
                    <TooltipNote content={tooltip} styles={styles} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

function ResultCard({
  result,
  styles,
  breakBefore,
}: {
  result: CalculationResult;
  styles: Styles;
  breakBefore: boolean;
}) {
  const statusType = getStatusType(result.is_mogelijk, result.score);
  const isDynamicResult = (result.score ?? 0) > 0;
  const showCosts =
    result.kosten_per_woning_per_jaar_laag > 0 &&
    result.kosten_per_woning_per_jaar_hoog > 0;
  const tuinTekst = getTuinTekst(result);

  return (
    <View style={styles.card} wrap break={breakBefore}>
      <View style={styles.cardHeaderRow} wrap={false}>
        <View
          style={[
            styles.statusBullet,
            { backgroundColor: STATUS_COLORS[statusType] },
          ]}
        />
        <Text style={styles.cardTitle}>{result.naam}</Text>
      </View>

      <Text style={styles.paragraph}>{result.beschrijving}</Text>

      {isDynamicResult && (
        <>
          {tuinTekst && <Text style={styles.paragraph}>{tuinTekst}</Text>}

          {result.omgevingsvergunning && (
            <Text style={styles.paragraph}>{result.omgevingsvergunning}</Text>
          )}

          {/* {result.warmteprogramma_tekst && (
            <>
              <Text style={styles.detailHeading}>Transitievisie warmte</Text>
              <Text style={styles.paragraph}>
                {result.warmteprogramma_tekst}
              </Text>
            </>
          )} */}

          {showCosts && (
            <>
              <Text style={styles.detailHeading}>Kostenindicatie</Text>
              <Text style={styles.paragraph}>
                Tussen de €{" "}
                {roundToWholeNumber(result.kosten_per_woning_per_jaar_laag)} en
                de €{" "}
                {roundToWholeNumber(result.kosten_per_woning_per_jaar_hoog)} per
                woning per jaar. {KOSTENINDICATIE_TOELICHTING}
              </Text>
            </>
          )}

          {result.ruimtevraag && (
            <>
              <Text style={styles.detailHeading}>Verwachte ruimtevraag</Text>
              <Text style={styles.paragraph}>
                Installatieruimte in woning:{" "}
                {result.ruimtevraag.installatieruimte_in_woning} m²
              </Text>
              <Text style={styles.paragraph}>
                Installatieruimte in gebouw:{" "}
                {result.ruimtevraag.installatieruimte_in_gebouw} m²
              </Text>
            </>
          )}

          {result.beschrijving_url && (
            <>
              <Text style={styles.detailHeading}>
                Meer informatie en vervolgstappen
              </Text>
              <Link
                style={[styles.paragraph, styles.link]}
                src={result.beschrijving_url}
              >
                {result.beschrijving_url_title || result.beschrijving_url}
              </Link>
            </>
          )}

          {result.redenen_niet_mogelijk?.length > 0 && (
            <>
              <Text style={styles.detailHeading}>
                Deze techniek is niet mogelijk vanwege:
              </Text>
              {result.redenen_niet_mogelijk.map((reden) => (
                <View key={reden} style={styles.listItem}>
                  <Text style={styles.listItemBullet}>•</Text>
                  <Text style={styles.listItemText}>{reden}</Text>
                </View>
              ))}
            </>
          )}

          {result.redenen_score?.length > 0 && (
            <>
              <Text style={styles.detailHeading}>
                Eigenschappen ten opzichte van de andere technieken
              </Text>
              {result.redenen_score.map((reden) => (
                <View key={reden} style={styles.listItem}>
                  <Text style={styles.listItemBullet}>•</Text>
                  <Text style={styles.listItemText}>{reden}</Text>
                </View>
              ))}
            </>
          )}
        </>
      )}
    </View>
  );
}

export function ResultsPdfDocument({
  results,
  formValues,
  fontFamily = AMSTERDAM_SANS_FONT_FAMILY,
}: Props) {
  const styles = createStyles(fontFamily);
  const generatedOn = new Date().toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document title="Keuzewijzer Aardgasvrij - Resultaten">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.logo}>
          <PdfLogo height={32} />
        </View>
        <Text style={styles.title}>{RESULTS_HEADING}</Text>
        <Text style={styles.subtitle}>Gegenereerd op {generatedOn}</Text>

        <IntroSection styles={styles} />

        <FormFieldsSection formValues={formValues} styles={styles} />

        <Text style={styles.sectionHeading} break>
          Adviezen
        </Text>
        <Text style={styles.paragraph}>{RESULTS_INTRO}</Text>
        <View style={styles.legendRow}>
          {(["success", "warning", "error"] as const).map((type) => (
            <View key={type} style={styles.legendItem}>
              <View
                style={[
                  styles.statusBullet,
                  { backgroundColor: STATUS_COLORS[type] },
                ]}
              />
              <Text>{STATUS_LEGEND_LABELS[type]}</Text>
            </View>
          ))}
        </View>
        {results.map((result, index) => (
          <ResultCard
            key={`${result.naam}-${index}`}
            result={result}
            styles={styles}
            breakBefore={index > 0}
          />
        ))}

        <View break>
          <Text style={styles.sectionHeading}>{NOOIT_MOGELIJK_HEADING}</Text>
          <Text style={styles.paragraph}>{NOOIT_MOGELIJK_INTRO}</Text>
          {staticResults.map((result) => (
            <ResultCard
              key={result.naam}
              result={result}
              styles={styles}
              breakBefore={false}
            />
          ))}
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} van ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

export default ResultsPdfDocument;
