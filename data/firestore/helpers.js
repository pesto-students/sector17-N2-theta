import firebase from "../firebase";
import "firebase/firestore";

const db = firebase.firestore();

export const paginationQuery = async (
  collection,
  orderBy,
  offset = 0,
  limit = 10,
  where = []
) => {
  const ref = db.collection(collection);
  let docsRef = ref.orderBy(orderBy).limit(limit);

  /** Add Where conditions (eg.: Categories, Filters etc. ) */
  if (Array.isArray(where) && where.length > 0) {
    for (const whereCond of where) {
      if(!Array.isArray(whereCond) || whereCond.length < 3) {
        continue;
      }

      docsRef = docsRef.where(where[0], where[1], where[2]);
    }
  }

  /** Add offset (eg: Last document of current set to get next set ) */
  if (offset !== 0) {
    docsRef = docsRef.startAfter(offset);
  }

  docsRef = await docsRef.get();

  const docs = {};
  docsRef.forEach((doc) => {
    docs[doc.id] = doc.data();
  });
  return docs;
};

// Where Condition 02/06/2021 Pardeep
export const getSingleEntity = async (collection, id) => {
  const docRef = await db.collection(collection).doc(id).get();
  return docRef.data();
};
