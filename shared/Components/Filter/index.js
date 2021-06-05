import { useCategories, useProducts } from "@/data";

import Link from "next/link";
import { useRouter } from "next/router";

const Filter = (props) => {
  const router = useRouter();
  const { data: categories = {}, isLoading, isSuccess } = useCategories(0, 20);
  const {
    data: products = {},
    isLoading: isLo,
    isSuccess: isSuc,
  } = useProducts(0, 16, "sku", router.query["category-slug"]);

  return (
    <>
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
                  <a>
                    <span className="label">{categories[category].name}</span>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <div className="filter_title">Manufacturer</div>
        <ul className="">
          {!!products &&
            Object.keys(products).map((product, index) => (
              <li
                key={index}
                onClick={props.onFilter.bind(this, products[product].manufacturer)}
              >
                {products[product].manufacturer}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Filter;
