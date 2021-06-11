import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import FilterStyle from "./Style";

const Filter = (props) => {
  const onFilter = (filter) => {
    props.onFilter(filter);
  };

  const onSet = (render, handle, value, un, percent) => {
    props.onPriceChange(parseInt(value[0]), parseInt(value[1]));
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
            start={[props.price!='' ? props.price[0] : 20, props.price!='' ? props.price[1] : 100000]}
            connect
            onSet={onSet}
          />
        </div>
        <div className="filter_title">Manufacturer</div>
        <ul className="">
          {!!props.category &&
            Object.keys(props.category.manufacturers).map((item, index) => (
              <li
                key={index}
                onClick={onFilter.bind(
                  this,
                  props.category.manufacturers[item]
                )}
                className={
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
