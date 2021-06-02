import { getSingleEntity, paginationQuery, queryWhere } from "@/data/firestore/helpers";

export const getProducts = async (offset = 0, limit = 10, orderBy = "sku") => {
  return await paginationQuery("products", orderBy, offset, limit);
};

export const getCategories = async (offset = 0, limit = 10, orderBy = "id") => {
  return await paginationQuery("categories", orderBy, offset, limit);
};

export const getProductsFromCategory = async (
  where = "",
  offset = 0,
  limit = 10,
  orderBy = "id"
) => {
  return await queryWhere("products", where, orderBy, offset, limit);
};

export const getProductDetail = async (where = "") => {
  return await getSingleEntity("products", where);
};
