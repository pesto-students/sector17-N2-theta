import { getSingleEntity, paginationQuery } from "./helpers";

export const getProducts = async ({
  offset = 0,
  limit = 10,
  orderBy = "sku",
  category = "",
  sku = [],
}) => {
  const where = [];

  /** Categories */
  if (!!category) {
    where.push(["category", "==", category]);
  }

  /** SKUs */
  if (Array.isArray(sku) && sku.length > 0) {
    where.push(["sku", "in", sku]);
  }

  return await paginationQuery("products", orderBy, offset, limit, where);
};

export const getCategories = async (offset = 0, limit = 10, orderBy = "id") => {
  return await paginationQuery("categories", orderBy, offset, limit);
};

export const getSingleProduct = async (id) => {
  return await getSingleEntity("products", id);
};
