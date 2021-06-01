import { useQuery } from "react-query";
import { getCategories } from "../firestore/products";

const useCategories = (offset = 0, limit = 10, orderBy = "id") =>
  useQuery(["categories", { offset, limit, orderBy }], () =>
    getCategories(offset, limit, orderBy)
  );

export default useCategories;
