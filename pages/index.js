import Categories from "../components/Category/Categories";
import Products from "../components/Product/Products";
import Slider from "../components/Slider/Slider";
import USP from "../components/USP/USP";
const PRODCUTS = [
  {
    id: "p1",
    title: "Product 1",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p2",
    title: "Product 2",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p3",
    title: "Product 3",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p4",
    title: "Product 4",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p5",
    title: "Product 5",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p6",
    title: "Product 6",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p7",
    title: "Product 7",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p8",
    title: "Product 8",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p9",
    title: "Product 9",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p10",
    title: "Product 10",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p11",
    title: "Product 11",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "p12",
    title: "Product 12",
    price: "150",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
];

const CATEGORIES = [
  {
    id: "c1",
    title: "Category 1",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  },
  {
    id: "c2",
    title: "Category 2",
    image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png",
  }
];
function Home(props) {
  // const onSliderChangeHandler = () =>{

  // }
  return (
    <div>
      <Slider  />
      <USP />
      <section>
        <div className="heading text-center">
          Top Trending Products
          <span className="heading-underline"></span>
        </div>
        <Products products={props.products} />
      </section>
      <section>
        <div className="heading text-center">Featured Collections</div>
        <Categories categories={props.categories} />
      </section>
      <section>
        <div className="heading text-center">Recently Viewed Products</div>
        <Products products={props.products} />
      </section>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: PRODCUTS.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })),
      categories: CATEGORIES.map((category) => ({
        id: category.id,
        title: category.title,
        image: category.image,
      })),
    },
    revalidate: 100,
  };
}

export default Home;
