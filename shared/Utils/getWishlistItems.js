const getWishlistItems = () => {
  let ItemsInWishlist = localStorage.getItem('wishlistItems');
  return ItemsInWishlist ? JSON.parse(ItemsInWishlist) : {};
}

export default getWishlistItems;