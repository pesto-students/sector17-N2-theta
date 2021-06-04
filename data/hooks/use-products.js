import { useQuery } from "react-query";
import { getProducts } from "../firestore/products";

const useProducts = (offset = 0, limit = 10, orderBy = "sku", category = "") =>
  useQuery(["products", { offset, limit, orderBy, category }], () =>
    getProducts(offset, limit, orderBy, category)
  );

export default useProducts;
