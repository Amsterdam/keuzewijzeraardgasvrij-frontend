import { useState } from "react";
import {
  Grid,
  SearchField,
  Paragraph,
  Label,
  LinkList,
  Alert,
} from "@amsterdam/design-system-react";
import { usePdokAddressSearch } from "@/api/pdok/pdokHooks";

function AddressSearch() {
  const [query, setQuery] = useState("");
  const { results, loading, error } = usePdokAddressSearch(query, true);

  const showResultsInfo = !loading && query.length >= 3;

  return (
    <Grid gapVertical="large" className="ams-mb-xl">
      <Grid.Cell span={{ narrow: 4, medium: 6, wide: 7 }}>
        <Label htmlFor="search-box" className="ams-mb-s">
          Zoek uw adres
        </Label>
        <SearchField className="ams-mb-m" onSubmit={(e) => e.preventDefault()}>
          <SearchField.Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bijv. Amstel 1, Amsterdam"
            id="search-box"
          />
          <SearchField.Button />
        </SearchField>

        {loading && <Paragraph>Zoeken...</Paragraph>}
        {error && (
          <Alert heading="Niet gelukt" headingLevel={2} severity="error">
            <Paragraph>
              Wegens een technische fout kon het adres niet worden opgezocht.
              Probeer het over een paar minuten opnieuw.
            </Paragraph>
          </Alert>
        )}

        {showResultsInfo && (
          <Paragraph className="ams-mb-m">
            <strong>{results.length}</strong>{" "}
            {results.length === 1 ? "adres" : "adressen"} gevonden voor ‘{query}
            ’{results.length >= 10 && " (maximaal 10 getoond)"}
          </Paragraph>
        )}

        {results.length > 0 && (
          <LinkList>
            {results.map((r) => (
              <LinkList.Link key={r.nummeraanduiding_id} href="#">
                {r.weergavenaam}
              </LinkList.Link>
            ))}
          </LinkList>
        )}
      </Grid.Cell>
    </Grid>
  );
}

export default AddressSearch;
