import { paginationQuery } from "@/data/firestore/helpers";

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
  let skuArray = sku;
  if (!!sku) {
    if (!Array.isArray(sku)) {
      skuArray = [sku];
    }

    for (const singleSKU of skuArray) {
      if (!singleSKU) {
        continue;
      }

      where.push(["sku", "==", singleSKU]);
    }
  }

  return await paginationQuery("products", orderBy, offset, limit, where);
};

export const getCategories = async (offset = 0, limit = 10, orderBy = "id") => {
  return await paginationQuery("categories", orderBy, offset, limit);
};
