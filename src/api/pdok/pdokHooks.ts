import { useState, useEffect } from "react";
import { pdokApi } from "./pdokApi";
import { constructPdokQuery } from "./pdokQueryBuilder";

/**
 * Generic hook for PDOK address search.
 * @param searchString the string to search
 * @param onlyPrimaryAddress whether to only search hoofdadres
 */
export function usePdokAddressSearch(
  searchString?: string,
  onlyPrimaryAddress: boolean = true,
) {
  const [results, setResults] = useState<BAGPdokAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!searchString || searchString.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const query = constructPdokQuery(onlyPrimaryAddress, searchString);
        const url = onlyPrimaryAddress ? `/suggest${query}` : `/free${query}`;
        const data: BAGPdokResponse = await pdokApi.get(url, {
          signal: controller.signal,
        });
        setResults(data.response.docs);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchString, onlyPrimaryAddress]);

  return { results, loading, error };
}
