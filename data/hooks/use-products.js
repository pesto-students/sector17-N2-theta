import { useQuery } from "react-query";
import { getProductDetail, getProducts, getProductsFromCategory } from "../firestore/products";

const useProducts = (offset = 0, limit = 10, orderBy = "sku") =>
  useQuery(["products", { offset, limit, orderBy }], () =>
    getProducts(offset, limit, orderBy)
  );

export const useProductsFromCategory = (
  category = "",
  offset = 0,
  limit = 10,
  orderBy = "sku"
) =>
  useQuery(["products", { category, offset, limit, orderBy }], () =>
    getProductsFromCategory(category, offset, limit, orderBy)
  );

export const useProductDetail = (where = "") =>
  useQuery(["products", { where}], () =>
    getProductDetail(where)
  );

export default useProducts;
