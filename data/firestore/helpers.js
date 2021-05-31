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
