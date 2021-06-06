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
  let docsRef = ref;

  /** Add Where conditions (eg.: Categories, Filters etc. ) */
  let isOrderByEqualityCondition = false;
  if (Array.isArray(where) && where.length > 0) {
    for (const whereCond of where) {
      if (!Array.isArray(whereCond) || whereCond.length < 3) {
        continue;
      }

      if (whereCond[0] === orderBy && whereCond[1] === "==") {
        isOrderByEqualityCondition = true;
      }

      docsRef = docsRef.where(whereCond[0], whereCond[1], whereCond[2]);
    }
  }

  /** If there is orderby quality where condition, then don't add orderby.
   * For Example, if there is SKU === 111002, then don't add SKU into orderBy
   */
  if (!isOrderByEqualityCondition) {
    docsRef = docsRef.orderBy(orderBy);
  }

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

// Where Condition 02/06/2021 Pardeep
export const getSingleEntity = async (collection, id) => {
  const docRef = await db.collection(collection).doc(id).get();
  return docRef.data();
};
