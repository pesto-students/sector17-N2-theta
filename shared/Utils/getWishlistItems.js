import firebase from "../../data/firebase";
import "firebase/firestore";

const db = firebase.firestore();

const getCollectionFromDb = async ({ collection, userId}) => {
  const docRef = await db.collection(collection).doc(userId).get();
  return docRef.data();
}

const getWishlistItems = async (userId) => {
  let ItemsInWishlist;
  
  if(userId){
    ItemsInWishlist = await getCollectionFromDb({ 
      collection : 'wishlists',
      userId 
    });

    return ItemsInWishlist ? JSON.parse(ItemsInWishlist.data) : null;
  }

  ItemsInWishlist = localStorage.getItem('wishlistItems');
  return ItemsInWishlist ? JSON.parse(ItemsInWishlist) : {};
}

export default getWishlistItems;