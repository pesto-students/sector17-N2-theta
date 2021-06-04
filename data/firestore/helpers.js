import firebase from "@/data/firebase";
import "firebase/firestore";

const db = firebase.firestore();

export const paginationQuery = async (
  collection,
  orderBy,
  offsetDoc = 0,
  limit = 10
) => {
  const ref = db.collection(collection);
  let docsRef = ref;

  /** Add Where conditions (eg.: Categories, Filters etc. ) */
  if (Array.isArray(where) && where.length > 0) {
    for (const whereCond of where) {
      if (!Array.isArray(whereCond) || whereCond.length < 3) {
        continue;
      }
      docsRef = docsRef.where(whereCond[0], whereCond[1], whereCond[2]);
    }
  }

  docsRef = docsRef.orderBy(orderBy);

  /** Add offset (eg: Last document of current set to get next set ) */
  if (offset !== 0) {
    docsRef = docsRef.startAfter(offset);
  }

  docsRef = docsRef.limit(limit);

  docsRef = await docsRef.get();

  const docs = {};
  docsRef.forEach((doc) => {
    docs[doc.id] = doc.data();
  });

  return docs;
};
