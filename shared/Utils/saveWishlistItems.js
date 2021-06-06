const saveWishlistItems = (wishlistItems) => {
  const currentWishlistItem = JSON.stringify(wishlistItems);
  localStorage.setItem('wishlistItems', currentWishlistItem);
}

export default saveWishlistItems;