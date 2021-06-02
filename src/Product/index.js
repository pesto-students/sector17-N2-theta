import { useProductDetail } from "@/data/hooks/use-products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from "shared/Styles/Grid";
import ProductDetailStyle from "./Style";

const Product = () => {
  const router = useRouter();

  const [product, setProduct] = useState();
  const { data, status, isLoading, isError } = useProductDetail(
    router.query["product-slug"]
  );
  useEffect(() => {
    if (status === "success" && !isError) {
      console.log(router.query["product-slug"]);
      setProduct({ ...product, ...data });
      console.log(product);
    }
  }, [status]);

  return (
    router && (
      <div>
        <ProductDetailStyle>
          <Grid count={2} gap={20}>
            <div className="product_gallery">
              <div className="product_thumbnail">
                <ul>
                  <li>
                    <img src="/images/product-img.png" />
                  </li>
                  <li>
                    <img src="/images/product-img.png" />
                  </li>
                </ul>
              </div>
              <div className="product_full">
                    <img src="/images/product-img.png" />
              </div>
            </div>
            <div className="product_info">
              <h1>{router.query["product-slug"]}</h1>
            </div>
          </Grid>
        </ProductDetailStyle>
      </div>
    )
  );
};

export default Product;
