import firebase from "../firebase";
import "firebase/firestore";

const db = firebase.firestore();

const addCollectionToDb = async ({ collection, userId, data = "" }) => {
  await db.collection(collection).doc(userId).set({ data });
}


export default addCollectionToDb;
