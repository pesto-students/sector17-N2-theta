import dynamic from 'next/dynamic'

const Cart = dynamic(() => import("../../src/Cart"), {
  ssr: false
});

export default Cart;