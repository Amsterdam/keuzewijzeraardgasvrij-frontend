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
import {
  getStatusType,
  roundToWholeNumber,
} from "../ResultsCard/results.helpers";

type Props = {
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
    fieldRow: {
      flexDirection: "row",
      paddingVertical: 3,
      borderBottomWidth: 0.5,
      borderBottomColor: "#e0e0e0",
    },
    fieldLabel: {
      width: "80%",
    },
    fieldValue: {
      ...bold,
      width: "20%",
    },
    card: {
      borderWidth: 1,
      borderColor: "#d9d9d9",
      borderRadius: 2,
      padding: 12,
      marginBottom: 10,
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
      marginBottom: 5,
      lineHeight: 1.1,
    },
    detailHeading: {
      ...bold,
      marginTop: 6,
      marginBottom: 2,
    },
    listItem: {
      flexDirection: "row",
      marginBottom: 10,
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

function FormFieldsSection({
  formValues,
  styles,
}: {
  formValues: Partial<FormValues> | undefined;
  styles: Styles;
}) {
  return (
    <View>
      <Text style={styles.sectionHeading}>Ingevoerde gegevens</Text>
      {FORM_FIELD_SECTIONS.map((section) => (
        <View key={section.title} wrap={false}>
          <Text style={styles.fieldSectionHeading}>{section.title}</Text>
          {section.fields.map((field) => (
            <View key={String(field.key)} style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <Text style={styles.fieldValue}>
                {formatFieldValue(formValues?.[field.key], field.format)}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function ResultCard({
  result,
  styles,
}: {
  result: CalculationResult;
  styles: Styles;
}) {
  const statusType = getStatusType(result.is_mogelijk, result.score);
  const isDynamicResult = (result.score ?? 0) > 0;
  const showCosts =
    result.kosten_per_woning_per_jaar_laag > 0 &&
    result.kosten_per_woning_per_jaar_hoog > 0;
  const tuinTekst =
    result.past_in_tuin === true
      ? "De bodembron past waarschijnlijk in de tuin."
      : result.past_in_tuin === false
        ? "De bodembron past waarschijnlijk niet in de tuin. In sommige gevallen is het mogelijk om de bodembron in de openbare ruimte te plaatsen. Hiervoor kunnen extra kosten en vergunningen nodig zijn. Deze kosten zijn hieronder niet meegerekend."
        : null;

  return (
    <View style={styles.card} wrap={false}>
      <View style={styles.cardHeaderRow}>
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

          {result.warmteprogramma_tekst && (
            <>
              <Text style={styles.detailHeading}>Transitievisie warmte</Text>
              <Text style={styles.paragraph}>
                {result.warmteprogramma_tekst}
              </Text>
            </>
          )}

          {showCosts && (
            <>
              <Text style={styles.detailHeading}>Kostenindicatie</Text>
              <Text style={styles.paragraph}>
                Tussen de €{" "}
                {roundToWholeNumber(result.kosten_per_woning_per_jaar_laag)} en
                de €{" "}
                {roundToWholeNumber(result.kosten_per_woning_per_jaar_hoog)} per
                woning per jaar.
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
        <Text style={styles.title}>Adviezen voor warmtesystemen</Text>
        <Text style={styles.subtitle}>Gegenereerd op {generatedOn}</Text>

        <FormFieldsSection formValues={formValues} styles={styles} />

        <Text style={styles.sectionHeading} break>
          Adviezen
        </Text>
        {results.map((result, index) => (
          <ResultCard
            key={`${result.naam}-${index}`}
            result={result}
            styles={styles}
          />
        ))}

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
