const ShippingMethods = ({ enabled }) => {
  return <div>
    <div>Shipping Methods</div>
    {
      enabled && (
        <div>
          <div>
            <div>Standard Shipping</div>
            <div>options</div>
          </div>
          <div>
            <div>Express Shipping</div>
            <div>options</div>
          </div>
        </div>
      )
    }
    
  </div>
}

export default ShippingMethods;