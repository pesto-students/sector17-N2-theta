import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import Head from "next/head";

import Filter from "shared/Components/Filter";
import CatalogStyle from "./Style";
import CatalogProducts from "../../shared/Components/CatalogProducts";

import GlobalContext from "context/GlobalContext";

import { useContext, useState, useEffect } from "react";

const Catalog = () => {
    const router = useRouter();
    const currentPage = router.query["category-slug"];

    const [showFilters, setshowFilters] = useState(true);

    const { data: category = {}, isLoading } = useSingleCategory(currentPage);

    const {
        setGlobalManufacturerFilter,
        setGlobalPriceFilter,
        clearFilter,
        setClearFilter,
    } = useContext(GlobalContext);

    const onClearHandeler = () => {
        setClearFilter(false);
        setGlobalManufacturerFilter([]);
        setGlobalPriceFilter([]);
        router.push(`/categories/${router.query["category-slug"]}`);
    };

    useEffect(() => {
        if (window.outerWidth < 768) {
            setshowFilters(false);
        }
        return () => {};
    }, []);

    const handleFilterClick = (ev) => {
        ev.preventDefault();
        setshowFilters(!showFilters);
    };

    return (
        <CatalogStyle>        
            <Head>
                <title>{category.name } | Sector 17</title>
            </Head>
            <button className="filter-mobile-btn" onClick={handleFilterClick}>
                {showFilters ? (
                    <span>Hide Filters</span>
                ) : (
                    <span>Show Filters</span>
                )}
            </button>
            {showFilters && (
                <div className="filters">
                    <Filter onClearHandeler={onClearHandeler} />
                </div>
            )}
            <div className="products">
                <CatalogProducts singleCategory={category} />
            </div>
        </CatalogStyle>
    );
};

export default Catalog;
