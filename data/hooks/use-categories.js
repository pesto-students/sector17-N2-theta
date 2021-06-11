import { useQuery } from "react-query";
import { getCategories, getSingleCategory } from "../firestore/products";

const useCategories = (offset = 0, limit = 10, orderBy = "id") =>
  useQuery(["categories", { offset, limit, orderBy }], async () =>
    await getCategories(offset, limit, orderBy)
  );

  export const useSingleCategory = (id) =>
  useQuery(["category", { id }], async () => await getSingleCategory(id));
export default useCategories;
