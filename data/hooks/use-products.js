import { useQuery } from "react-query";
import { getProducts, getSingleProduct } from "../firestore/products";

const useProducts = (
  offset = 0,
  limit = 10,
  orderBy = "sku",
  category = "",
  filter = [],
  price = []
) =>
  useQuery(
    ["products", { offset, limit, orderBy, category, filter, price }],
    async () =>
      await getProducts({ offset, limit, orderBy, category, filter, price })
  );

export const useSingleProduct = (id) =>
  useQuery(["product", { id }], async () => await getSingleProduct(id));

export default useProducts;
