import { useQuery } from "react-query";
import { getProducts } from "../firestore/products";

const useProducts = (offset = 0, limit = 10, orderBy = "sku") =>
  useQuery(["products", { offset, limit, orderBy }], () =>
    getProducts(offset, limit, orderBy)
  );

export default useProducts;
