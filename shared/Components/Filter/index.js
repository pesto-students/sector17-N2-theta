import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useState } from "react";
import FilterStyle from "./Style";

const Filter = (props) => {
  const [startPrice,setStartPrice] =useState([20,100000]);
  const onFilter = (filter) => {
    props.onFilter(filter);
  };

  const onSet = (render, handle, value, un, percent) => {
    if (parseInt(value[0]) > 20 || parseInt(value[1]) < 100000) {
      props.onPriceChange(parseInt(value[0]), parseInt(value[1]));
    }
  };
  return (
    <FilterStyle>
      <div className="filter_action">
        <span>Filters</span>
        {!props.clear && <span></span>}
        {props.clear && (
          <span className="filter_clear" onClick={props.onClearHandeler}>
            Clear All
          </span>
        )}
      </div>
      <div className="filter_options">
        <div className="filter_price">
          <div className="filter_title">Price</div>
          <div className="form-group">
            <label>Rs. {props.price!='' ? props.price[0] : 20}</label>
            <label>Rs. {props.price!='' ? props.price[1] : 100000}</label>
          </div>
          <Nouislider
            range={{ min: 0, max: 100000 }}
            start={[20, 100000]}
            connect
            onSet={onSet}
          />
        </div>
        <div className="filter_title">Manufacturer</div>
        <ul className="">
          {!props.isLoading &&
            Object.keys(props.category.manufacturers).map((item, index) => (
              <li
                key={index}
                onClick={onFilter.bind(
                  this,
                  props.category.manufacturers[item]
                )}
                className={props.activeList.length > 0 &&
                  props.activeList.find(
                    (isActive) =>
                      isActive === props.category.manufacturers[item]
                  )
                    ? "active"
                    : ""
                }
              >
                {props.category.manufacturers[item]}
              </li>
            ))}
        </ul>
      </div>
    </FilterStyle>
  );
};

export default Filter;
