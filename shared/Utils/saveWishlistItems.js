import addCollectionToDb from "@/data/firestore/cart";

const saveWishlistItems = (wishlistItems, userId) => {
  const currentWishlistItem = JSON.stringify(wishlistItems);

  addCollectionToDb({ 
    collection : 'wishlists', 
    userId, 
    data : currentWishlistItem 
  })
}

export default saveWishlistItems;