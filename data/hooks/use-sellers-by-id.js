import { useQuery } from "react-query";
import firebase from "../firebase";
import { getSingleSellerEntity,getSellers } from "../firestore/sellers";

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
  
export const useSingleSeller = sellerId =>
useQuery(['sellers', { sellerId }], async () => await getSingleSellerEntity({ sellerId }));


export default useSellersById;