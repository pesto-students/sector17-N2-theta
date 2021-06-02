import useCategories from "@/data/hooks/use-categories";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationStyle from "./Style";

const Navigation = () => {
  // const [dataOffset, setDataOffset] = useState(10);
  // const [dataLimit, setDataLimit] = useState(10);
  // const [categories, setCategories] = useState(null);
  // const [dataLoading, setDataLoading] = useState(true);
  // const { data, status, isLoading, isError } = useCategories(
  //   dataOffset,
  //   dataLimit
  // );
  // // console.log(data);
  // useEffect(() => {
  //   setCategories(data);
  //   if (categories !== null) {
  //     setDataLoading(false);
  //   }
  // }, [data, setCategories, setDataLoading, onLoadHandler]);

  return (
    <NavigationStyle>
      <ul>
        {/* {!dataLoading &&
          Object.keys(categories).map((category) => (
            <li>
              <Link
                href="/categories/[category-slug]"
                as="/categories/category-1"
              >
                <a>
                  <span className="icon"></span>
                  <span className="label">{categories[category].name}</span>
                </a>
              </Link>
            </li>
          ))} */}
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-2">
            <a>
              <span className="icon"></span>
              <span className="label">category-2</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-3">
            <a>
              <span className="icon"></span>
              <span className="label">category-3</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-4">
            <a>
              <span className="icon"></span>
              <span className="label">category-4</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-5">
            <a>
              <span className="icon"></span>
              <span className="label">category-5</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-6">
            <a>
              <span className="icon"></span>
              <span className="label">category-6</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-7">
            <a>
              <span className="icon"></span>
              <span className="label">category-7</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories" as="/categories">
            <a>
              <span className="icon"></span>
              <span className="label">View All Categories</span>
            </a>
          </Link>
        </li>
      </ul>
    </NavigationStyle>
  );
};

export default Navigation;
