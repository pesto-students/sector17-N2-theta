import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import CategoryCardStyle from "./Style";

const CategoryCard = (props) => {
  const { id, image } = props;

  return <CategoryCardStyle>
    <div className="category_item">
      {image ? (
        <Link href={`/categories/${id}`}>
          <img src={image} alt={`Category ${id}`} />
        </Link>
      ) : (
        <Skeleton height={250} />
      )}
    </div>
  </CategoryCardStyle>
};

export default CategoryCard;
