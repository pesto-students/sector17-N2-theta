import { useCategories, useProducts } from "@/data";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterStyle from "./Style";

const Filter = (props) => {
  const router = useRouter();
  const [priceMinRange, setPriceMinRange] = useState(0);
  const [priceMaxRange, setPriceMaxRange] = useState(1000);
  const [filteredManufacturer, setFilteredManufacturer] = useState([]);
  const { data: categories = {}, isLoading, isSuccess } = useCategories(0, 20);
  const {
    data: products = {},
  } = useProducts(0, 16, "sku", router.query["category-slug"]);

  useEffect(() => {
    setTimeout(() => {
      props.onPriceChange(priceMinRange, priceMaxRange);
    }, 1000);
  }, [priceMinRange, priceMaxRange]);

  const getManufactured = () => {
    if (!!products) {
      let grabAllManufacturer = Object.keys(products).map(
        (product, index) => products[product].manufacturer
      );
      setFilteredManufacturer([...new Set(grabAllManufacturer)]);
    }
  };
  return (
    <FilterStyle>
      <div className="filter_action">
        <span>Filters</span>
        <span className="filter_clear">Clear All</span>
      </div>
      <div className="filter_options">
        <div className="filter_title">Categories</div>
        <ul className="">
          {isSuccess &&
            !!categories &&
            Object.keys(categories).map((category) => (
              <li key={categories[category].id}>
                <Link href={`/categories/${categories[category].id}`}>
                  <a
                    className={
                      categories[category].id == router.query["category-slug"]
                        ? "filter_active"
                        : ""
                    }
                  >
                    <span className="label">{categories[category].name}</span>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <div className="filter_price">
          <div className="filter_title">Price</div>
          <div className="form-group">
            <label>From</label>
            <input
              type="number"
              onChange={(event) => setPriceMinRange(event.target.value)}
            />
            <label>To</label>
            <input
              type="number"
              onChange={(event) => setPriceMaxRange(event.target.value)}
            />
          </div>
        </div>
        <div className="filter_title">Manufacturer</div>
        <ul className="">
          {!!products &&
            Object.keys(products).map((product, index) => (
              <li
                key={index}
                onClick={props.onFilter.bind(
                  this,
                  products[product].manufacturer
                )}
              >
                {products[product].manufacturer}
              </li>
            ))}
        </ul>
      </div>
    </FilterStyle>
  );
};

export default Filter;
