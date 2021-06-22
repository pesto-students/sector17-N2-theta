import {
    InstantSearch,
    Hits,
    SearchBox,
    Configure,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import React, { useCallback, useEffect, useState } from "react";
import Hit from "./hit";
import SearchBoxWrapper from "./Style/SearchBox";
import useSearchReducer, { SearchContext } from "./reducer";

const searchClient = algoliasearch(
    "741E7JC67J",
    "f9dd23453c512d3465aabedbba514430"
);

const Search = () => {
    const openParams = useSearchReducer();
    const { isOpen, close, open } = openParams;
    const [search, setSearch] = useState("");

    const onFocusOutside = useCallback((e) => {
        const headerSearch = document.getElementById("header-search");
        if (!headerSearch.contains(e.target)) {
            close();
        }
    });

    const resetSearch = () => setSearch("");

    useEffect(() => {
        document.body.addEventListener("click", onFocusOutside);
        document
            .getElementsByClassName("ais-SearchBox-reset")[0]
            .addEventListener("click", resetSearch);

        return () => {
            document.body.removeEventListener("click", onFocusOutside);
            document
                .getElementsByClassName("ais-SearchBox-reset")[0]
                .removeEventListener("click", resetSearch);
        };
    }, [onFocusOutside]);

    return (
        <SearchContext.Provider value={openParams}>
            <div id="header-search" className="header__action-item">
                <InstantSearch
                    indexName="sector17_products"
                    searchClient={searchClient}
                >
                    <Configure hitsPerPage={10} />
                    <SearchBoxWrapper>
                        <SearchBox
                            className="app-form-input"
                            onFocus={open}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                    </SearchBoxWrapper>
                    {isOpen && !!search && search.length > 1 && (
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
