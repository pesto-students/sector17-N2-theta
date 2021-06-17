import dynamic from 'next/dynamic'

const Checkout = dynamic(() => import("../../src/Checkout"), {
  ssr: false
});

export default Checkout;