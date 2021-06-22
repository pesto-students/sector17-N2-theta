import { useContext, useEffect, useState } from "react";
import addAddressCollection from "../../../data/firestore/address";
import useAddress from "../../../data/hooks/use-address";
import Input from "../Input";
import AddressStyle from "./Style";
import GlobalContext from "../../../context/GlobalContext";

const Address = ({ setValidAddress, setSummaryEnabled, setPincode, disable = false }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    appartment: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    email: '',
    phone: '',
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [userId, setUserId] = useState(false);
  const { currentUser, setUserInfo } = useContext(GlobalContext);
  const { isLoading, data: userAddress } = useAddress(userId);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name] : e.target.value
    })
  }

  useEffect(() => {
    if (!isLoading && !!userAddress) {
      setAddress({
        ...userAddress.address
      })
      setIsEdit(false);
      if(typeof setValidAddress === 'function'){
        setValidAddress(true);
      }
    }
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, [userAddress, currentUser, isLoading, setValidAddress]);

  useEffect(() => {
    if(typeof setPincode === 'function'){
      setPincode(address.pincode);
    }
    if(address){
      setUserInfo(address);
    }
  }, [address, setPincode])

  useEffect(() => {
    const addressIdentifier = setTimeout(() => {
      if (formIsValid) {
        addAddressCollection({
          collection: "address",
          userId: currentUser.uid,
          address
        });
        setLoading(false);
        setFormIsValid(false);
        setIsEdit(false);
        if(typeof setValidAddress === 'function'){
          setValidAddress(true);
        }
      }
    }, 500);
    return () => {
      clearTimeout(addressIdentifier);
    };
  }, [formIsValid]);

  const onClickSaveHandeler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      address.firstName !== "" &&
      address.lastName !== "" &&
      address.street !== "" &&
      address.city !== "" &&
      address.state !== "" &&
      address.country !== "" &&
      address.pincode !== "" &&
      address.email !== "" &&
      address.phone !== ""
    ) {
      setFormIsValid(true);
    }
  };
  
  const validatePincode = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const onEditAddress = () => {
    setIsEdit(true);
    if(typeof setValidAddress === 'function'){
      setValidAddress(false);
      setSummaryEnabled(false);
    }
  };

  return (
    <AddressStyle>
      <div>
        <div className="title">
          <div className="row_group">
            <div>Shipping Address</div>
          </div>
        </div>
        <div className="form_container">
          {isEdit ? (
              <div>
                <form onSubmit={onClickSaveHandeler}>
                  <div className="row_group">
                    <div className="form-control">
                      <div><label forhtml="firstName">First Name</label></div>
                      <div className="field">
                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          required="yes"
                          onChange={handleChange}
                          value={address.firstName}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <div><label forhtml="lastName">Last Name</label></div>
                      <div className="field">
                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          required="yes"
                          onChange={handleChange}
                          value={address.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row_group">

                    <div className="form-control">
                      <div><label forhtml="street">Street Address</label></div>
                      <div className="field">
                        <Input
                          type="text"
                          name="street"
                          id="street"
                          placeholder="Street Address"
                          required="yes"
                          onChange={handleChange}
                          value={address.street}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <div><label forhtml="appartment">Appartment, Floor (Optional)</label></div>
                      <div className="field">
                        <Input
                          type="text"
                          name="appartment"
                          id="appartment"
                          placeholder="Appartment, Floor (Optional)"
                          onChange={handleChange}
                          value={address.appartment}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="row_group">

                  <div className="form-control">
                      <div><label forhtml="city">City</label></div>
                      <div className="field">
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      required="yes"
                      onChange={handleChange}
                      value={address.city}
                    />
                    </div>
                  </div>


                    <div className="form-control">
                      <div><label forhtml="state">State</label></div>
                      <div className="field">
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      required="yes"
                      onChange={handleChange}
                      value={address.state}
                    />
                    </div>
                  </div>

                  </div>
                  <div className="row_group">

                  <div className="form-control">
                      <div><label forhtml="country">Country</label></div>
                      <div className="field">
                    <Input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Country"
                      required="yes"
                      onChange={handleChange}
                      value={address.country}
                    />
                    </div>
                  </div>

                  <div className="form-control">
                      <div><label forhtml="pincode">Pincode</label></div>
                      <div className="field">
                    <Input
                      type="number"
                      name="pincode"
                      minLength={6}
                      maxLength={6}
                      id="pincode"
                      placeholder="Pincode"
                      required="yes"                      
                      onKeyPress={validatePincode}
                      onChange={handleChange}
                      value={address.pincode}
                    />
                    </div>
                  </div>

                  </div>
                  <h3 className="subtitle" style={{padding: 0}}>Contact Information</h3>
                  <div className="row_group">

                  <div className="form-control">
                      <div><label forhtml="email">Email</label></div>
                      <div className="field">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required="yes"
                      pattern="/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/"
                      onChange={handleChange}
                      value={address.email}
                    />
                    </div>
                  </div>

                    <div className="form-control">
                      <div><label forhtml="phone">Phone Number</label></div>
                      <div className="field">
                        <Input
                          type="number"
                          name="phone"
                          minLength={10}
                          maxLength={10}
                          id="phone"
                          placeholder="Phone Number"
                          required="yes"
                          onChange={handleChange}
                          value={address.phone}
                        />
                        </div>
                      </div>
                  </div>

                  <div className="row_group">
                    <span>Required for sending the order confirmation.</span>
                    <span>Required to contact you about this order.</span>
                  </div>

                  {loading && (
                    <span className="push-right">
                      <i className="fa fa-spinner" />
                    </span>
                  )}
                  {!loading && <button className="btn push-right" type="submit">Save</button>}
                </form>
              </div>
            ) : (
              <div>
                {address.firstName && <div className="shipping_address">
                  <div className="address">
                    <strong>{`${address.firstName  } ${  address.lastName}`}</strong>
                    <p>
                      {address.street} {address.appartment},
                      <br />
                      {address.city}, {address.state}, Pincode {address.pincode} <br />
                      Phone Number <a href={`tel:${address.phone}`}>{address.phone}</a> <br />
                      {address.country}
                    </p>
                  </div>

                  {!disable && <button type="button" className="action" onClick={onEditAddress}>
                    Edit
                  </button>}
                </div>}
              </div>
            )}
        </div>
      </div>
    </AddressStyle>
  );
};

export default Address;