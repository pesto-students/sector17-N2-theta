const { paginationQuery } = require("./common");

const getProducts = async ({
  offset = 0,
  limit = 10,
  orderBy = "sku",
} = {}) => {
  return await paginationQuery(
    "products",
    orderBy,
    parseInt(offset),
    parseInt(limit)
  );
};

const getCategories = async ({
  offset = 0,
  limit = 10,
  orderBy = "id",
} = {}) => {
  return await paginationQuery(
    "categories",
    orderBy,
    parseInt(offset),
    parseInt(limit)
  );
};

module.exports = {
  getProducts,
  getCategories,
};
