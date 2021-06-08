import { useCategories, useProducts } from "@/data";

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterStyle from "./Style";

const Filter = (props) => {
  const router = useRouter();
  const [price, setPrice] = useState([20, 100000]);
  const [priceMaxRange, setPriceMaxRange] = useState(1000);
  const [filteredManufacturer, setFilteredManufacturer] = useState([]);
  const { data: categories = {}, isLoading, isSuccess } = useCategories(0, 20);
  const { data: products = {} } = useProducts(
    0,
    16,
    "sku",
    router.query["category-slug"]
  );

  const getManufactured = () => {
    if (!!products) {
      let grabAllManufacturer = Object.keys(products).map(
        (product, index) => products[product].manufacturer
      );
      setFilteredManufacturer([...new Set(grabAllManufacturer)]);
    }
  };

  const onFilter = (filter) => {
    props.onFilter(filter);
  };

  const onSet = (render, handle, value, un, percent) => {
    props.onPriceChange(parseInt(value[0]), parseInt(value[1]));
    setPrice([parseInt(value[0]), parseInt(value[1])]);
  };
  return (
    <FilterStyle>
      <div className="filter_action">
        <span>Filters</span>
        <span className="filter_clear" onClick={props.onClearHandeler}>
          Clear All
        </span>
      </div>
      <div className="filter_options">
        <div className="filter_price">
          <div className="filter_title">Price</div>
          <div className="form-group">
            <label>Rs. {price[0]}</label>
            <label>Rs. {price[1]}</label>
          </div>
          <Nouislider
            range={{ min: 0, max: 100000 }}
            start={[price[0], price[1]]}
            connect
            onSet={onSet}
          />
        </div>
        <div className="filter_title">Manufacturer</div>
        <ul className="">
          {!!products &&
            Object.keys(products).map((product, index) => (
              <li
                key={index}
                onClick={onFilter.bind(this, products[product].manufacturer)}
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
