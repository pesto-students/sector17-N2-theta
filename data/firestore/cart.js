import firebase from "../firebase";
import "firebase/firestore";

const db = firebase.firestore();

const addCollectionToDb = async ({ collection, userId, cart = "" }) =>
  await db.collection(collection).doc(userId).set({ cart });


export default addCollectionToDb;