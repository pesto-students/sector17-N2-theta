const getCartItems = () => {
  let ItemsInCart = localStorage.getItem('cartItems');
  return ItemsInCart ? JSON.parse(ItemsInCart) : {};
}

export default getCartItems;