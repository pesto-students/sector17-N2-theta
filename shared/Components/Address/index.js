import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import addAddressCollection from "../../../data/firestore/address";
import useAddress from "../../../data/hooks/use-address";
import Input from "../Input";
import AddressStyle from "./Style";
import GlobalContext from "../../../context/GlobalContext";

const Address = ({ setValidAddress, setSummaryEnabled, setPincode }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({mode: 'onBlur'});

  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();

  const [formIsValid, setFormIsValid] = useState(false);
  const [userId, setUserId] = useState(false);
  const { currentUser, setUserInfo } = useContext(GlobalContext);
  const { isLoading, data: userAddress } = useAddress(userId);

  const onSubmit = data => {
    setLoading(true);
    setAddress({ 
      ...data,
      appartment: !data.appartment ? '' : data.appartment
    });
    setFormIsValid(true);
  };

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
    if(address){
      if(typeof setPincode === 'function'){
        setPincode(address.pincode);
      }

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

    // const currValues = [];
    // Object.keys(address).map((key) => {
    //   const value = address[key];
    //   currValues.push({[key] : value})
    // })

    // setValue(currValues)
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row_group">
                    <div className="form-control">
                      <div><label forhtml="firstName">First Name</label></div>
                      <div className={`field ${errors && errors.firstName && 'error'}`}>
                        <Input
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          value={address && address.firstName}
                          {...register('firstName', { required: true, maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.firstName && <div className="error">
                        First name is required.  
                      </div>}
                    </div>

                    <div className="form-control">
                      <div><label forhtml="lastName">Last Name</label></div>
                      <div className={`field ${errors && errors.lastName && 'error'}`}>
                        <Input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          value={address && address.lastName}
                          {...register('lastName', { required: true, maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.lastName && <div className="error">
                        Last Name is required.  
                      </div>}
                    </div>
                  </div>
                  <div className="row_group">
                    <div className="form-control">
                      <div><label forhtml="street">Street Address</label></div>
                      <div className={`field ${errors && errors.street && 'error'}`}>
                        <Input
                          type="text"
                          id="street"
                          placeholder="Street Address"
                          value={address && address.street}
                          {...register('street', { required: true, maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.street && <div className="error">
                      Street Address is required.  
                      </div>}
                    </div>

                    <div className="form-control">
                      <div><label forhtml="appartment">Appartment, Floor (Optional)</label></div>
                      <div className={`field ${errors && errors.appartment && 'error'}`}>
                        <Input
                          type="text"
                          id="appartment"
                          placeholder="Appartment, Floor (Optional)"
                          value={address && address.appartment}
                          {...register('appartment', { maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.appartment && <div className="error">
                        Max length should be equal to 50.
                      </div>}
                    </div>
                  </div>
                  <div className="row_group">
                    <div className="form-control">
                      <div><label forhtml="city">City</label></div>
                      <div className={`field ${errors && errors.city && 'error'}`}>
                        <Input
                          type="text"
                          id="city"
                          placeholder="City"
                          value={address && address.city}
                          {...register('city', { required: true, maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.city && <div className="error">
                        City is required.
                      </div>}
                    </div>

                    <div className="form-control">
                      <div><label forhtml="state">State</label></div>
                      <div className={`field ${errors && errors.state && 'error'}`}>
                        <Input
                          type="text"
                          id="state"
                          placeholder="State"
                          value={address && address.state}
                          {...register('state', { required: true, maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.state && <div className="error">
                      State is required.
                      </div>}
                    </div>
                  </div>
                  <div className="row_group">
                    <div className="form-control">
                      <div><label forhtml="country">Country</label></div>
                      <div className={`field ${errors && errors.country && 'error'}`}>
                        <Input
                          type="text"
                          id="country"
                          placeholder="Country"
                          value={address && address.country}
                          {...register('country', { required: true, maxLength: 50 })}
                        />
                      </div>
                      {errors && errors.country && <div className="error">
                      Country is required.
                      </div>}
                    </div>

                    <div className="form-control">
                      <div><label forhtml="pincode">Pincode</label></div>
                      <div className={`field ${errors && errors.pincode && 'error'}`}>
                        <Input
                          type="number"
                          id="pincode"
                          placeholder="Pincode"
                          {...register('pincode', { required: true, maxLength: 6, minLength: 6 })}
                        />
                      </div>
                      {errors && errors.pincode && <div className="error">
                        Pincode is required.
                      </div>}
                    </div>
                  </div>
                  <h3 className="subtitle">Contact Information</h3>
                  <div className="row_group">
                    <div className="form-control">
                      <div><label forhtml="email">Email</label></div>
                      <div className={`field ${errors && errors.email && 'error'}`}>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Email"
                          value={address && address.email}
                          {...register('email', { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
                        />
                      </div>
                      {errors && errors.email && <div className="error">
                        Email is required.
                      </div>}
                    </div>

                    <div className="form-control">
                      <div><label forhtml="phone">Phone Number</label></div>
                      <div className={`field ${errors && errors.phone && 'error'}`}>
                        <Input
                          type="number"
                          id="phone"
                          placeholder="Phone Number"
                          value={address && address.phone}
                          {...register('phone', { required: true, maxLength: 10, minLength: 10 })}
                        />
                      </div>
                      {errors && errors.phone && <div className="error">
                      Phone Number is required.
                      </div>}
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
                  {!loading && <input className="btn push-right" type="submit" value="Save" />}
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
                  <button type="button" className="action" onClick={onEditAddress}>
                    Edit
                  </button>
                </div>}
              </div>
            )}
        </div>
      </div>
    </AddressStyle>
  );
};

export default Address;
