import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();

  return router && <div>{router.query['product-slug']}</div>
}

export default Product;