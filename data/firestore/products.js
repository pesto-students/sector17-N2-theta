import { paginationQuery } from "@/data/firestore/helpers";

export const getProducts = async (offset = 0, limit = 10, orderBy = "sku") => {
  return await paginationQuery("products", orderBy, offset, limit);
};

export const getCategories = async (offset = 0, limit = 10, orderBy = "id") => {
  return await paginationQuery("categories", orderBy, offset, limit);
};
