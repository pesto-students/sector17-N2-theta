import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import CategoryCardStyle from "./Style";

const CategoryCard = (props) => {
  const { id, image, name } = props;

  return <CategoryCardStyle>
    <div className="category_item" role="categories">
      {image ? (
        <Link href="/categories/[category-slug]" as={`/categories/${id}`}>
          <a>
            <img src={image} alt={`Category ${id}`} />
            <div className="name">{name}</div>
          </a>
        </Link>
      ) : (
        <Skeleton height={250} />
      )}
    </div>
  </CategoryCardStyle>
};

export default CategoryCard;
