const getCouponDiscount = (subTotal) => ({
    coupon : localStorage.getItem('coupon'),
    discount : (subTotal * 10)/100
  })

export default getCouponDiscount;