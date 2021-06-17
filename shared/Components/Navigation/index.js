import useCategories from "@/data/hooks/use-categories";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NavigationStyle from "./Style";

const Navigation = () => {
  const router = useRouter();
  const { data: categories = {}, isLoading, isSuccess } = useCategories(0, 4);

  if (isLoading) {
    return (
      <NavigationStyle>
        <SkeletonTheme>
          <div className="app-container">
            <ul>
              <li>
                <Skeleton width={100}/>
              </li>
              <li>
                <Skeleton width={100}/>
              </li>
              <li>
                <Skeleton width={100}/>
              </li>
              <li>
                <Skeleton width={100}/>
              </li>
              <li>
                <Skeleton width={100}/>
              </li>
            </ul>
          </div>
        </SkeletonTheme>
      </NavigationStyle>
    );
  }
  return (
    <NavigationStyle>
      <div className="app-container">
        <ul>
          {isSuccess &&
            !!categories &&
            Object.keys(categories).map((category) => (
              <li key={categories[category].id}>
                <Link
                  href={`/categories/${categories[category].id}`}
                  as={`/categories/${categories[category].id}`}
                >
                  <a
                    className={
                      categories[category].id == router.query["category-slug"]
                        ? "nav_active"
                        : ""
                    }
                  >
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
      </div>
    </NavigationStyle>
  );
};

export default Navigation;
