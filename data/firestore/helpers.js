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
  let docsRef = "";

  if (offsetDoc === 0) {
    docsRef = await ref.orderBy(orderBy).limit(limit).get();
  } else {
    docsRef = await ref
      .orderBy(orderBy)
      .startAfter(offsetDoc)
      .limit(limit)
      .get();
  }

  const docs = {};
  docsRef.forEach((doc) => {
    docs[doc.id] = doc.data();
  });
  return docs;
};

// Where Condition 02/06/2021 Pardeep
export const queryWhere = async (
  collection,
  where,
  orderBy,
  offsetDoc = 0,
  limit = 10
) => {
  const ref = db.collection(collection);
  let docsRef = "";

  if (offsetDoc === 0) {
    docsRef = await ref
      .where("category", "==", where)
      .orderBy(orderBy)
      .limit(limit)
      .get();
  } else {
    docsRef = await ref
      .where("category", "==", where)
      .orderBy(orderBy)
      .startAfter(offsetDoc)
      .limit(limit)
      .get();
  }

  const docs = {};
  docsRef.forEach((doc) => {
    docs[doc.id] = doc.data();
  });
  return docs;
};

// Where Condition 02/06/2021 Pardeep
export const getProduct = async (collection, where) => {
  const ref = db.collection("products");
  let docsRef = "";

  docsRef = await ref.where("id", "==",where).get();
  
  const docs = {};
  docsRef.forEach((doc) => {
      docs[doc.id] = doc.data();
  });
  return docs;
  
};
