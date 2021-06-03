import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const AddToRecentlyViewed = dynamic(() => import('../../shared/Utils/AddToRecentlyViewed'), {
  ssr: false
});

const Product = () => {
  const router = useRouter();

  return router && <div>
    {router.query['product-slug']}
    <AddToRecentlyViewed productSku={router.query['product-slug']} />
  </div>
}

export default Product;