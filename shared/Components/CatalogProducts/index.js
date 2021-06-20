import useProducts from '../../../data/hooks/use-products';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import ProductCard from '../ProductCard';
import Grid from '../../Styles/Grid';
import Pagination from '../Pagination';

const CatalogProducts = props => {
  const router = useRouter();

  const [pageOffsets, setPageOffsets] = useState({});

  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [products, setProducts] = useState({});
  const [pageCurrent, setPageCurrent] = useState(1);

  const lastPageCount = Math.round(props.counts / 20);
  const currentPage = router.query['category-slug'];

  const { globalManufacturerFilter, globalPriceFilter } =
    useContext(GlobalContext);

  const {
    data = {},
    isLoading,
    isSuccess
  } = useProducts(
    offset,
    limit,
    'sku',
    currentPage,
    globalManufacturerFilter,
    globalPriceFilter
  );

  useEffect(() => {
    setOffset(0);
    setPageCurrent(1);
  }, [currentPage]);
  
  useEffect(() => {
    if (!isLoading) {
      setProducts({ ...data });
    }
  }, [data]);

  const handelPrevClick = () => {
    if (!pageOffsets[pageCurrent - 1]) {
      setOffset(0);
    } else {
      setOffset(pageOffsets[pageCurrent - 1]);
    }
    setPageCurrent(pageCurrent - 1);
  };

  const handelNextClick = () => {
    const prods = Object.keys(data);
    const offsetn = prods[prods.length - 1];

    setPageOffsets({ ...pageOffsets, [pageCurrent + 1]: parseInt(offsetn) });
    setPageCurrent(pageCurrent + 1);
    setOffset(parseInt(offsetn));
  };

  if (isLoading) {
    return (
      <div>
        <div className="heading" />

        <div className="product_list" role="loading">
          <Grid count={4} gap={15}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Grid>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="heading">
        <span className="category_title">
          {!props.categoryLoading && props.singleCategory.name}
        </span>
        <span className="product_count">
          ({isSuccess && !!products && Object.keys(products).length}/
          {props.singleCategory.products})
        </span>
      </div>

      <div className="product_list">
        <Grid count={4} gap={15}>
          {!!products &&
            Object.keys(products).map((product, index) => (
              <ProductCard key={index} id={product} {...products[product]} />
            ))}
        </Grid>
        {Object.keys(data).length == 0 && (
          <div>
            <h1>Products Not Found</h1>
          </div>
        )}

        {Object.keys(data).length > 0 && Object.keys(data).length <= limit && (
          <div>
            <Pagination
              count={props.singleCategory.products}
              lastPageCount={lastPageCount}
              handelPrevClick={handelPrevClick}
              handelNextClick={handelNextClick}
              pageCurrent={pageCurrent}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default CatalogProducts;
