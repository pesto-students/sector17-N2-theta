import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import React, { useCallback, useEffect, useState } from "react";
import Hit from "./hit";
import useSearchReducer, { SearchContext } from "./reducer";

const searchClient = algoliasearch(
  "741E7JC67J",
  "f9dd23453c512d3465aabedbba514430"
);

const Search = () => {
  const openParams = useSearchReducer();
  const {isOpen, close, open} = openParams;

  const onFocusOutside = useCallback((e) => {
    const headerSearch = document.getElementById("header-search");
    if (!headerSearch.contains(e.target)) {
      close();
    }
  });

  useEffect(() => {
    document.body.addEventListener("click", onFocusOutside);

    return () => document.body.removeEventListener("click", onFocusOutside);
  }, []);

  return (
    <SearchContext.Provider value={openParams}>
      <div id="header-search" className="header__action-item">
        <InstantSearch
          indexName="sector17_products"
          searchClient={searchClient}
        >
          <Configure hitsPerPage={10} />
          <SearchBox onFocus={open} />
          {isOpen && (
            <div className="header__dropmenu">
              <Hits hitComponent={Hit} />
            </div>
          )}
        </InstantSearch>
      </div>
    </SearchContext.Provider>
  );
};

export default Search;
