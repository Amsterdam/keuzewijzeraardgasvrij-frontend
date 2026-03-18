import { useState } from "react";
import {
  SearchField,
  Paragraph,
  Label,
  LinkList,
  Alert,
} from "@amsterdam/design-system-react";

import { usePdokAddressSearch } from "@/api/pdok/pdokHooks";
import { QueryParamLink } from "@/components";

type Props = {
  onNext: () => void;
};

function AddressSearch({ onNext }: Props) {
  const [query, setQuery] = useState("");
  const { results, loading, error } = usePdokAddressSearch(query, true);

  const showResultsInfo = !loading && query.length >= 3;

  return (
    <>
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
          {results.length === 1 ? "adres" : "adressen"} gevonden voor ‘{query}’
          {results.length >= 10 && " (maximaal 10 getoond)"}
        </Paragraph>
      )}

      {results.length > 0 && (
        <LinkList>
          {results.map((r) => (
            <QueryParamLink
              paramKey="id"
              key={r.nummeraanduiding_id}
              value={r.nummeraanduiding_id}
              onClick={onNext}
            >
              {r.weergavenaam}
            </QueryParamLink>
          ))}
        </LinkList>
      )}
    </>
  );
}

export default AddressSearch;
