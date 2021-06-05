import Link from "next/link";
import CategoryCardStyle from "./Style";

const CategoryCard = (props) => {
  return (
    <CategoryCardStyle>
      <div className="category_item">
        <Link href="/category">
          <img src="./images/category.jpg" />
        </Link>
      </div>
    </CategoryCardStyle>
  );
};

export default CategoryCard;
