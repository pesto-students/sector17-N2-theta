import Link from "next/link";
import CategoryCardStyle from "./Style";

const CategoryCard = (props) => {
  return (
    <CategoryCardStyle>
      <div className="category_item">
        <Link href={`/categories/${props.id}`}>
          <img src={props.image ? props.image : "./images/category.jpg"} />
        </Link>
      </div>
    </CategoryCardStyle>
  );
};

export default CategoryCard;
