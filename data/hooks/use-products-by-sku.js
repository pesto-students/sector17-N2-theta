import { useQuery } from "react-query";
import { getProducts } from "../firestore/products";

const useProductsBySKU = (offset = 0, limit = 10, sku = []) =>
  useQuery(
    ["products", { offset, limit, sku }],
    () => await getProducts({ offset, limit, orderBy: "sku", sku })
  );

export default useProductsBySKU;
