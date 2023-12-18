import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export function buildSearchParam(query) {
  if (query.length == 0) return {};
  return {
    q: query,
  };
}

export function useSyncSearchQuery(searchQuery, onSearchQueryChanged) {
  const [searchParams, setSearchParam] = useSearchParams();
  const prevSearchQuery = useRef(null);
  const prevSearchParam = useRef(null);

  useEffect(() => {
    let currentQuery = searchParams.get("q");
    if (!currentQuery) currentQuery = "";

    if (currentQuery != searchQuery) {
      if (prevSearchParam.current != currentQuery) {
        onSearchQueryChanged(currentQuery);
      } else if (prevSearchQuery.current != searchQuery) {
        setSearchParam(buildSearchParam(searchQuery));
      }
    }

    prevSearchParam.current = currentQuery;
    prevSearchQuery.current = searchQuery;
  }, [searchParams.get("q"), searchQuery]);
}
