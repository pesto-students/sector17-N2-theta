import { getSingleEntity, paginationQuery } from "./helpers";

export const getProducts = async ({
  offset = 0,
  limit = 10,
  orderBy = "sku",
  category = "",
  sku = [],
  filter = [],
  price = [],
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
  /** Filter With Manufacturer */
  if (Array.isArray(filter) && filter.length > 0) {
    where.push(["manufacturer", "in", filter]);
  }
  /** Filter With Price */
  if (Array.isArray(price) && price.length > 0) {
    where.push(["price", ">=", parseInt(price[0])]);
    where.push(["price", "<=",parseInt(price[1])]);
    orderBy = "price";
  }
  console.log("Where Query ",where);
  return await paginationQuery("products", orderBy, offset, limit, where);
};

export const getCategories = async (offset = 0, limit = 10, orderBy = "id") => {
  return await paginationQuery("categories", orderBy, offset, limit);
};

export const getSingleCategory = async (id) => {
  return await getSingleEntity("categories", id);
};

export const getSingleProduct = async (id) => {
  return await getSingleEntity("products", id);
};
