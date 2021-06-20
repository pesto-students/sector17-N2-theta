import useProducts, {
  useProductsWithCount
} from '../../../data/hooks/use-products';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
// import useProducts from "../../../data/hooks/use-products";
import GlobalContext from '../../../context/GlobalContext';
import ProductCard from '../ProductCard';
import Grid from '../../Styles/Grid';
import Pagination from '../Pagination';

const CatalogProducts = props => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [products, setProducts] = useState({});
  const [productsCount, setProductsCount] = useState(0);
  const [action, setAction] = useState('');

  const [pageCurrent, setPageCurrent] = useState(1);

  const lastPageCount = Math.round(props.counts / 20);

  const [manufacturerFilter, setManufacturerFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const currentPage = router.query['category-slug'];

  const { globalManufacturerFilter, globalPriceFilter } =
    useContext(GlobalContext);

  const {
    data = {},
    isLoading,
    isSuccess
  } = useProductsWithCount(
    offset,
    limit,
    'sku',
    currentPage,
    globalManufacturerFilter,
    globalPriceFilter,
    action
  );

  useEffect(() => {
    setOffset(0);
    setPageCurrent(1);
  }, [currentPage]);
  useEffect(() => {
    if (!isLoading) {
      setProducts({ ...data[0] });
      setProductsCount(data[1]);
      const productKeys = Object.keys(data[0]);
    }
    if (router.query['price'] && router.query['price'] != '') {
      setPriceFilter(router.query['price'].split(','));
    }
    if (router.query['manufacturer'] && router.query['manufacturer'] != '') {
      setManufacturerFilter(router.query['manufacturer'].split(','));
    }
  }, [data]);

  const loadMore = () => {
    // const productKeys = Object.keys(data);
    // const offset = productKeys[productKeys.length - 1];
    // setOffset(parseInt(offset));
  };

  const handelPrevClick = () => {
    setAction('prev');
    setPageCurrent(pageCurrent - 1);
    // const offs = paginationState[pageCurrent-1][0];
    // setOffset(parseInt(offs));

    const productKeys = Object.keys(data[0]);
    const offset = Object.keys(data[0])[0];
    console.log(offset);
    setOffset(parseInt(offset));
    // props.loadMore(offs);
  };
  const handelNextClick = () => {
    const offsetn = Object.keys(data[0])[Object.keys(data[0]).length - 1];
    setAction('');
    console.log(offsetn);
    setPageCurrent(pageCurrent + 1);
    setOffset(parseInt(offsetn));
    // const offs = paginationState[pageCurrent][1];
    // setOffset(parseInt(offs));

    // props.loadMore(offs);
  };

  if (isLoading) {
    return (
      <div>
        <div className="heading"></div>

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
        </span>{' '}
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

        {Object.keys(data[0]).length > 0 &&
          Object.keys(data[0]).length <= limit && (
            <div>
              <Pagination
                count={props.singleCategory.products}
                loadMore={loadMore}
                lastPageCount={lastPageCount}
                handelPrevClick={handelPrevClick}
                handelNextClick={handelNextClick}
                pageCurrent={pageCurrent}
              />
            </div>
          )}
        {!!products &&
          ((Object.keys(data).length > 0 &&
            Object.keys(data).length === limit) ||
            isLoading) && (
            <button className="btn" disabled={isLoading} onClick={loadMore}>
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          )}
      </div>
    </div>
  );
};
export default CatalogProducts;
