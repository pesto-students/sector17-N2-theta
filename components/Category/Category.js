import classes from "./Category.module.css";
const Category = (props) => {
  return (
    <div className={classes.category_item} key={props.id}>
      <img src={props.image} />
      <div className={classes.category_caption}>{props.title}</div>
    </div>
  );
};
export default Category;
