import addCollectionToDb from "@/data/firestore/cart";

const saveWishlistItems = (wishlistItems) => {
  const currentWishlistItem = JSON.stringify(wishlistItems);
  localStorage.setItem('wishlistItems', currentWishlistItem);

  addCollectionToDb({ 
    collection : 'wishlist', 
    userId : 'X1tDHanwBCb1I8e7iEgdFAVBZdX2', 
    cart : currentWishlistItem 
  })
}

export default saveWishlistItems;