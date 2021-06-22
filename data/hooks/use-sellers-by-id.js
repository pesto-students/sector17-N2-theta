import { useQuery } from "react-query";
import { getSellers } from "../firestore/products";
import firebase from "../firebase";

const useSellersById = (offset = 0, limit = 10, id = []) =>
  useQuery(
    ["sellers", { offset, limit, id }],
    async () =>
      await getSellers({
        offset,
        limit,
        orderBy: firebase.firestore.FieldPath.documentId(),
        id,
      })
  );

export default useSellersById;
