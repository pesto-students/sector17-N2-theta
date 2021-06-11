import Input from "../Input";
import AddressStyle from "./Style";
const Address = (props) => {
  return (
    <AddressStyle>
      <div>
        <div className="title">
          <div className="row_group">
            <div>Shipping Address</div>
            {/* <div>
              <button className="btn" onClick={props.onClick}>Edit/Add Address</button>
            </div> */}
          </div>
        </div>
        <div className="form_container">
          {!props.isEdit && (
            <div>
              <strong>Pardeep Sharma</strong>
              <p>Amritsar, Punjab, India, 143001</p>
              <p>
                <a href="mailto:">sharmapardeep971@gmail.com</a>
              </p>
              <p>
                <a href="tel:">+91-7837201047</a>
              </p>
            </div>
          )}
          {props.isEdit && (
            <div>
              <div className="row_group">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  required="yes"
                />

                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  required="yes"
                />
              </div>
              <div className="row_group">
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Street Address"
                  required="yes"
                />

                <Input
                  type="text"
                  name="appartment"
                  id="appartment"
                  placeholder="Appartment, Floor (Optional)"
                  required="yes"
                />
              </div>
              <div className="row_group">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  required="yes"
                />

                <Input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State"
                  required="yes"
                />
              </div>
              <div className="row_group">
                <Input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  required="yes"
                />

                <Input
                  type="text"
                  name="pincode"
                  id="pincode"
                  placeholder="Pincode"
                  required="yes"
                />
              </div>
              <h3 className="subtitle">Contact Information</h3>
              <div className="row_group">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required="yes"
                />

                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  required="yes"
                />
              </div>

              <div className="row_group">
                <span>Required for sending the order confirmation.</span>
                <span>Required to contact you about this order.</span>
              </div>
              <button className="btn push-right">Save</button>
            </div>
          )}
        </div>
      </div>
    </AddressStyle>
  );
};

export default Address;
