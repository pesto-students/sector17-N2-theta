import useCategories from "@/data/hooks/use-categories";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationStyle from "./Style";

const Navigation = () => {
  const { data: categories = {}, isLoading, isSuccess } = useCategories(0, 5);

  return (
    <NavigationStyle>
      <ul>
        {isSuccess &&
          !!categories &&
          Object.keys(categories).map((category) => (
            <li key={categories[category].id}>
              <Link
                href={`/categories/${categories[category].id}`}
                as={`/categories/${categories[category].id}`}
              >
                <a>
                  <span className="icon">
                    <img src={categories[category].image} />
                  </span>
                  <span className="label">{categories[category].name}</span>
                </a>
              </Link>
            </li>
          ))}
        <li>
          <Link href="/categories" as="/categories">
            <a>
              <span className="icon">
                <img src="https://storage.googleapis.com/sector17-chandigarh.appspot.com/categories/allcat.png" />
              </span>
              <span className="label">View All Categories</span>
            </a>
          </Link>
        </li>
      </ul>
    </NavigationStyle>
  );
};

export default Navigation;
