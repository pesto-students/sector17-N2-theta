import { useQuery } from "react-query";
import { getProducts } from "../firestore/products";

const useProducts = (offset = 0, limit = 10, orderBy = "sku", category = "") =>
  useQuery(["products", { offset, limit, orderBy, category }], () =>
    getProducts({ offset, limit, orderBy, category })
  );

<<<<<<< HEAD
  export const useSingleProduct = (id) =>
  useQuery(["product", { id }], () => getSingleProduct(id));
=======
/** TODO: Add use Single Products method here */

>>>>>>> 8cd970b72f2d7e63c20890aa3fa0eb81af48bbd3
export default useProducts;
