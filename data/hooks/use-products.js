import { useQuery } from "react-query";
import { getProducts, getSingleProduct } from "../firestore/products";

const useProducts = (offset = 0, limit = 10, orderBy = "sku", category = "") =>
  useQuery(
    ["products", { offset, limit, orderBy, category }],
    () => await getProducts({ offset, limit, orderBy, category })
  );

export const useSingleProduct = (id) =>
  useQuery(["product", { id }], () => await getSingleProduct(id));

export default useProducts;
