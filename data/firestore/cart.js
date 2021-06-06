import firebase from "../firebase";
import "firebase/firestore";

const db = firebase.firestore();

const addToCart = async ({ userId, cart = "" }) =>
  await db.collection("carts").doc(userId).set({ cart });
