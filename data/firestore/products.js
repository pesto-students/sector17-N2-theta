import firebase from "@/data/firebase";
import 'firebase/firestore';

const db = firebase.firestore();

export const getProducts = async (offset = 0, limit = 10, orderBy = "sku") => {
  const prodsRef = db.collection("products");
  if (offset === 0) {
    return await prodsRef.orderBy(orderBy).limit(limit).get();
  } else {
    return await prodsRef.orderBy(orderBy).startAfter(offset).limit(limit).get();
  }
};

export const getCategories = async (offset = 0, limit = 10, orderBy = "id") => {
  const prodsRef = db.collection("categories");
  if (offset === 0) {
    return await prodsRef.orderBy(orderBy).limit(limit).get();
  } else {
    return await prodsRef.orderBy(orderBy).startAfter(offset).limit(limit).get();
  }
};
