import addCollectionToDb from "../../data/firestore/cart";

const saveCartItems = (cartItems, userId) => {
  const currentCartItem = JSON.stringify(cartItems);
  localStorage.setItem('cartItems', currentCartItem);

  addCollectionToDb({ 
    collection : 'carts', 
    userId, 
    data : currentCartItem 
  })
}

export default saveCartItems;