const { db } = require("../init");

const paginationQuery = async (collection, orderBy, offset = 0, limit = 10) => {
  const ref = db.collection(collection);
  const docsRef = await ref.orderBy(orderBy).offset(offset).limit(limit).get();
  if (docsRef.empty) {
    return []
  }

  const docs = {};
  docsRef.forEach((doc) => (docs[doc.id] = doc.data()));

  return docs;
};

module.exports = {
  paginationQuery,
};
