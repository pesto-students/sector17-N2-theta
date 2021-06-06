const saveCartItems = (cartItems) => {
  const currentCartItem = JSON.stringify(cartItems);
  localStorage.setItem('cartItems', currentCartItem);
}

export default saveCartItems;