import addAddressCollection from "@/data/firestore/address";
import useAddress from "@/data/hooks/use-address";
import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import AddressStyle from "./Style";
const Address = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [appartment, setAppartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [formIsValid, setFormIsValid] = useState(false);

  const { isLoading, data: userAddress } = useAddress(props.user.uid);

  useEffect(() => {
    if (!isLoading) {
      setFirstName(userAddress.address.firstName);
      setLastName(userAddress.address.lastName);
      setStreet(userAddress.address.street);
      setAppartment(userAddress.address.appartment);
      setCity(userAddress.address.city);
      setState(userAddress.address.state);
      setCountry(userAddress.address.country);
      setPincode(userAddress.address.pincode);
      setEmail(userAddress.address.email);
      setPhone(userAddress.address.phone);
    }
  }, [userAddress]);
  
  useEffect(() => {
    const addressIdentifier = setTimeout(() => {
      if (formIsValid) {
        addAddressCollection({
          collection: "address",
          userId: props.user.uid,
          address: {
            firstName: firstName,
            lastName: lastName,
            street: street,
            appartment: appartment,
            city: city,
            state: state,
            country: country,
            pincode: pincode,
            email: email,
            phone: phone,
          },
        });
        setLoading(false);
        setFormIsValid(false);
      }
    }, 500);
    return () => {
      clearTimeout(addressIdentifier);
    };
  }, [onClickSaveHandeler,formIsValid]);

  const onClickSaveHandeler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      firstName != "" &&
      lastName != "" &&
      street != "" &&
      city != "" &&
      state != "" &&
      country != "" &&
      pincode != "" &&
      email != "" &&
      phone != ""
    ) {
      setFormIsValid(true);
    }
  };
  const onEditAddress = () => {
    setIsEdit(!isEdit);
  };
  return (
    <AddressStyle>
      <div>
        <div className="title">
          <div className="row_group">
            <div>Shipping Address</div>
            <div>
              <button className="btn" onClick={onEditAddress}>
                Edit/Add Address
              </button>
            </div>
          </div>
        </div>
        <div className="form_container">
          {!isEdit && (
            <div>
              {!isLoading && (
                <div>
                  <strong>
                    {userAddress.address.firstName +
                      " " +
                      userAddress.address.lastName}
                  </strong>
                  <p>
                    {userAddress.address.street} {userAddress.address.appartment}, {userAddress.address.city},{" "}
                    {userAddress.address.state},<br />
                    {userAddress.address.country}- {userAddress.address.pincode}
                  </p>
                  <p>
                    <a href={`mailto:${userAddress.address.email}`}>
                      {userAddress.address.email}
                    </a>
                  </p>
                  <p>
                    <a href={`tel:${userAddress.address.phone}`}>
                      {userAddress.address.phone}
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}
          {isEdit && (
            <div>
              <form onSubmit={onClickSaveHandeler}>
                <div className="row_group">
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required="yes"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                  />

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    required="yes"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                  />
                </div>
                <div className="row_group">
                  <Input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Street Address"
                    required="yes"
                    onChange={(event) => setStreet(event.target.value)}
                    value={street}
                  />

                  <Input
                    type="text"
                    name="appartment"
                    id="appartment"
                    placeholder="Appartment, Floor (Optional)"
                    required="yes"
                    onChange={(event) => setAppartment(event.target.value)}
                    value={appartment}
                  />
                </div>
                <div className="row_group">
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    required="yes"
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                  />

                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State"
                    required="yes"
                    onChange={(event) => setState(event.target.value)}
                    value={state}
                  />
                </div>
                <div className="row_group">
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    required="yes"
                    onChange={(event) => setCountry(event.target.value)}
                    value={country}
                  />

                  <Input
                    type="text"
                    name="pincode"
                    id="pincode"
                    placeholder="Pincode"
                    required="yes"
                    onChange={(event) => setPincode(event.target.value)}
                    value={pincode}
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
                    onChange={(event) => setEmail(event.target.value)}
                    value={props.user.email ? props.user.emai : email}
                  />

                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    required="yes"
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone}
                  />
                </div>

                <div className="row_group">
                  <span>Required for sending the order confirmation.</span>
                  <span>Required to contact you about this order.</span>
                </div>

                {loading && (
                  <div>
                    <i className="fas fa-spinner"></i>
                  </div>
                )}
                {!loading && <button className="btn push-right">Save</button>}
              </form>
            </div>
          )}
        </div>
      </div>
    </AddressStyle>
  );
};

export default Address;
