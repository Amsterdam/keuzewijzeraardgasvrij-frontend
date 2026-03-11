import qs from "qs";

const MUNICIPALITY_FILTER = "gemeentenaam:(amsterdam)";
const ADDRESS_TYPE_HOOFDADRES_FILTER =
  "AND (type:adres) AND (adrestype: hoofdadres)";
const ADDRESS_TYPE_ADRES_FILTER = "AND (type:adres)";
const DEFAULT_SORT = "score desc, weergavenaam asc";
const FIELD_LIST =
  "weergavenaam,adrestype,gemeentenaam,nummeraanduiding_id,adresseerbaarobject_id,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,centroide_ll,score";

const START = 0;
const RESULTS_PER_PAGE = 10;

export function constructPdokQuery(
  onlyPrimaryAddress: boolean = true,
  searchString?: string,
): string {
  return qs.stringify(
    {
      q: searchString,
      fq: `${MUNICIPALITY_FILTER}${onlyPrimaryAddress ? ADDRESS_TYPE_HOOFDADRES_FILTER : ADDRESS_TYPE_ADRES_FILTER}`,
      fl: FIELD_LIST,
      start: START.toString(),
      rows: RESULTS_PER_PAGE.toString(),
      sort: DEFAULT_SORT,
    },
    {
      addQueryPrefix: true,
    },
  );
}
