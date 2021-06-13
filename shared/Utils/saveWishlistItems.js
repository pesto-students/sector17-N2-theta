import addCollectionToDb from "@/data/firestore/cart";

const saveWishlistItems = (wishlistItems, userId) => {
  const currentWishlistItem = JSON.stringify(wishlistItems);
  localStorage.setItem('wishlistItems', currentWishlistItem);

  addCollectionToDb({ 
    collection : 'wishlists', 
    userId, 
    data : currentWishlistItem 
  })
}

export default saveWishlistItems;