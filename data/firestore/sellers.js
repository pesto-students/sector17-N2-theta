import { paginationQuery } from "./helpers";

export const getSellers = async ({
  offset = 0,
  limit = 10,
  orderBy = "id",
  category = "",
  id = []
}) => {
  const where = [];
  /** Categories */
  if (!!category) {
    where.push(["category", "==", category]);
  }

  /** ids */
  if (Array.isArray(id) && id.length > 0) {
    where.push(["id", "in", id]);
  }

  return await paginationQuery("sellers", orderBy, offset, limit, where);
};