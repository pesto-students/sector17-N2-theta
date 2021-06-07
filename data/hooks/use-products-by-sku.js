import { useQuery } from "react-query";
import { getProducts } from "../firestore/products";
import firebase from "../firebase";

const useProductsBySKU = (offset = 0, limit = 10, sku = []) =>
  useQuery(
    ["products", { offset, limit, sku }],
    async () =>
      await getProducts({
        offset,
        limit,
        orderBy: firebase.firestore.FieldPath.documentId(),
        sku,
      })
  );

export default useProductsBySKU;
