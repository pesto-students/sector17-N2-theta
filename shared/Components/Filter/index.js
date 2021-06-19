import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useEffect, useState , useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import GlobalContext from "context/GlobalContext";
import FilterStyle from "./Style";


const Filter = (props) => {
  const [startPrice, setStartPrice] = useState([20, 100000]);

  const router = useRouter();
  // const currentPage = router.query["category-slug"];
  const [price, setPrice] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [clear, setClear] = useState(false);

  const {
    globalManufacturerFilter,
    globalPriceFilter,
    setGlobalManufacturerFilter,
    setGlobalPriceFilter,
    
    clearFilter,
    setClearFilter,
  } = useContext(GlobalContext);

  const { data: category = {}, isLoading } = useSingleCategory(
    router.query["category-slug"]
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (manufacturer.length > 0 || price.length) {
        router.push(
          `/categories/${router.query["category-slug"]}?price=${price}&manufacturer=${manufacturer}`
        );
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [manufacturer, price, router]);

  const onFilter = (filter) => {
    if (manufacturer.length > 0) {
      const index = manufacturer.indexOf(filter);
      if (index > -1) {
        manufacturer.splice(index, 1);
        setManufacturer([...manufacturer]);
        setGlobalManufacturerFilter([...manufacturer]);
      } else {
        setManufacturer([...manufacturer, filter]);
        setGlobalManufacturerFilter([...manufacturer, filter]);
      }
    } else {
      setManufacturer([...manufacturer, filter]);
      setGlobalManufacturerFilter([...manufacturer, filter]);
    }
    setClearFilter(true);
  };

  const onSet = (render, handle, value, un, percent) => {
    setPrice([parseInt(value[0]), parseInt(value[1])]);
    setGlobalPriceFilter([parseInt(value[0]), parseInt(value[1])]);
    setClearFilter(true);
  };

  
  const onClearHandeler = () => {
    setManufacturer([]);
    setPrice([]);
    props.onClearHandeler();
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
              <Skeleton count={10} />
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
        {!clearFilter && <span />}
        {clearFilter && (
          <span className="filter_clear" onClick={onClearHandeler}>
            Clear All
          </span>
        )}
      </div>
      <div className="filter_options">
        <div className="filter_price">
          <div className="filter_title">Price</div>
          <div className="form-group">
            <label>Rs. {price && price.length ? price[0] : 20}</label>
            <label>Rs. {price && price.length ? price[1] : 100000}</label>
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
