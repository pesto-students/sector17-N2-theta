import firebase from "../firebase";
import "firebase/firestore";

const db = firebase.firestore();

const addAddressCollection = async ({ collection, userId, address = {} }) =>{
  const docRef = await db.collection('address').doc(userId).get();
  if(docRef.data()){
    await db.collection('address').doc(userId).set({address});
  } else{
    await db.collection(collection).doc(userId).set({ address });
  }
}

  
export const getAddress = async ({userId}) => {
  const docRef = await db.collection('address').doc(userId).get();
  return docRef.data();
};
export default addAddressCollection;
