import CategoryGridStyle from "./Style";
import CategoryCard from '../CategoryCard';
const CategoryGrid = () => {
  return (
    <CategoryGridStyle>
      <div className="category_grid">
        <CategoryCard />
        <CategoryCard />
      </div>
    </CategoryGridStyle>
  );
};

export default CategoryGrid;
