import addCollectionToDb from "@/data/firestore/cart";

const saveCartItems = (cartItems) => {
  const currentCartItem = JSON.stringify(cartItems);
  localStorage.setItem('cartItems', currentCartItem);

  addCollectionToDb({ 
    collection : 'carts', 
    userId : 'X1tDHanwBCb1I8e7iEgdFAVBZdX2', 
    cart : currentCartItem 
  })
}

export default saveCartItems;