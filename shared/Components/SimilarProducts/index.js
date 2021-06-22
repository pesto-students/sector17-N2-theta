import useProducts from '@/data/hooks/use-products';
import ProductCard from 'shared/Components/ProductCard';
import Grid from 'shared/Styles/Grid';
import HeadingStyle from 'shared/Styles/HeadingStyle';
import Skeleton from 'react-loading-skeleton';

const SimilarProducts = ({ category }) => {
  // Similer Products
  const { data: products = {}, isLoading } = useProducts(0, 4, 'sku', category);
  if (isLoading) {
    return (
      <div>
        <HeadingStyle>
          <h2 className="heading">
            Similar Products
            <span className="heading-underline" />
          </h2>
        </HeadingStyle>

        <Grid className="" count={4} gap={20}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </div>
    );
  }
  return (
    <div>
      <HeadingStyle>
        <h2 className="heading">
          Similar Products
          <span className="heading-underline" />
        </h2>
      </HeadingStyle>

      <Grid className="" count={4} gap={20}>
        {!!products &&
          Object.keys(products).map((product, index) => (
            <ProductCard key={index} id={product} {...products[product]} />
          ))}
      </Grid>
    </div>
  );
};
export default SimilarProducts;
