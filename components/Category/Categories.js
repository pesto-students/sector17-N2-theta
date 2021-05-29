import classes from "./Category.module.css";
import Category from "./Category";

const Categories = (props) => {
  return (
    <div className="container">
      <div className={classes.category_grid}>
        {props.categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
};
export default Categories;
