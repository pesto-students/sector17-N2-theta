import Link from "next/link";
import CategoryCardStyle from "./Style";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CategoryCard = (props) => {
  return (
    <CategoryCardStyle>
      <div className="category_item">
        {props.image ? (
          <Link href={`/categories/${props.id}`}>
            <img src={props.image ? props.image : "./images/category.jpg"} />
          </Link>
        ) : (
          <Skeleton height={250} />
        )}
      </div>
    </CategoryCardStyle>
  );
};

export default CategoryCard;
