import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useEffect, useState } from "react";
import FilterStyle from "./Style";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Filter = (props) => {
  const [startPrice, setStartPrice] = useState([20, 100000]);

  const router = useRouter();
  const currentPage = router.query["category-slug"];
  const [price, setPrice] = useState([20, 100000]);
  const [manufacturer, setManufacturer] = useState([]);
  const [clear, setClear] = useState(false);

  const { data: category = {}, isLoading } = useSingleCategory(currentPage);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (manufacturer.length > 0 || price != "") {
        router.push(
          `/categories/${currentPage}?price=${price}&manufacturer=${manufacturer}`
        );
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [manufacturer, price]);

  const onFilter = (filter) => {
    if (manufacturer.length > 0) {
      const index = manufacturer.indexOf(filter);
      if (index > -1) {
        manufacturer.splice(index, 1);
        setManufacturer([...manufacturer]);
      } else {
        setManufacturer([...manufacturer, filter]);
      }
    } else {
      setManufacturer([...manufacturer, filter]);
    }
    setClear(true);
  };

  const onSet = (render, handle, value, un, percent) => {
    setPrice([parseInt(value[0]),parseInt(value[1])]);
    setClear(true);
  };

  const onPriceChange = (min, max) => {
    setPrice([min, max]);
    setClear(true);
  };

  const onClearHandeler = () => {
    setClear(false);
    router.push(`/categories/${currentPage}`);
  };

  if (isLoading) {
    return (
      <FilterStyle>
        <div className="filter_action">
          <span>Filters</span>
        </div>
        <div className="filter_options">
          <div className="filter_price">
            <div className="filter_title">Price</div>
            <div className="form-group">
              <label>
                <Skeleton />
              </label>
              <label>
                <Skeleton />
              </label>
            </div>
            <Skeleton />
          </div>
          <div className="filter_title">Manufacturer</div>
          <ul className="">
            <li>
              <Skeleton />
            </li>
          </ul>
        </div>
      </FilterStyle>
    );
  }
  return (
    <FilterStyle>
      <div className="filter_action">
        <span>Filters</span>
        {!clear && <span></span>}
        {clear && (
          <span className="filter_clear" onClick={onClearHandeler}>
            Clear All
          </span>
        )}
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
          {Object.keys(category.manufacturers).map((item, index) => (
            <li
              key={index}
              onClick={onFilter.bind(this, category.manufacturers[item])}
              className={
                manufacturer.length > 0 &&
                manufacturer.find(
                  (isActive) => isActive === category.manufacturers[item]
                )
                  ? "active"
                  : ""
              }
            >
              {category.manufacturers[item]}
            </li>
          ))}
        </ul>
      </div>
    </FilterStyle>
  );
};

export default Filter;
