import firebase from "../../data/firebase";
import "firebase/firestore";

const db = firebase.firestore();

const getCollectionFromDb = async ({ collection, userId}) => {
  const docRef = await db.collection(collection).doc(userId).get();
  return docRef.data();
}

const getCartItems = async (userId) => {
  let ItemsInCart;
  
  if(userId){
    ItemsInCart = await getCollectionFromDb({ 
      collection : 'carts',
      userId 
    });

    return ItemsInCart ? JSON.parse(ItemsInCart.data) : {};
  }

  ItemsInCart = localStorage.getItem('cartItems');
  return ItemsInCart ? JSON.parse(ItemsInCart) : {};
}

export default getCartItems;