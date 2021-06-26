import { useContext, useEffect, useState } from 'react';
import addAddressCollection from '../../../data/firestore/address';
import useAddress from '../../../data/hooks/use-address';
import Input from '../Input';
import AddressStyle from './Style';
import GlobalContext from '../../../context/GlobalContext';

const Address = ({
  setValidAddress,
  setSummaryEnabled,
  setPincode,
  disable = false
}) => {
  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pincodeValidate, setPincodeValidate] = useState('');
  const formFields = {
    firstName: '',
    lastName: '',
    street: '',
    appartment: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    email: '',
    phone: ''
  }
  const [address, setAddress] = useState(formFields);
  const [emailError, setEmailError] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [userId, setUserId] = useState(false);
  const { currentUser, setUserInfo } = useContext(GlobalContext);
  const { isLoading, data: userAddress } = useAddress(userId);

  const [errorFields, setErrorFields] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = e => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (!isLoading && !!userAddress) {
      setAddress({
        ...userAddress.address
      });
      setIsEdit(false);
      if (typeof setValidAddress === 'function') {
        setValidAddress(true);
      }
    }
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, [userAddress, currentUser, isLoading, setValidAddress]);

  useEffect(() => {
    if (typeof setPincode === 'function') {
      setPincode(address.pincode);
    }
    if(address) {
      setUserInfo(address);
    }
  }, [address, setPincode]);

  useEffect(() => {
    const addressIdentifier = setTimeout(() => {
      if (formIsValid) {
        addAddressCollection({
          collection: 'address',
          userId: currentUser.uid,
          address
        });
        setLoading(false);
        setFormIsValid(false);
        setIsEdit(false);
        if (typeof setValidAddress === 'function') {
          setValidAddress(true);
        }
      }
    }, 500);
    return () => {
      clearTimeout(addressIdentifier);
    };
  }, [formIsValid]);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const onClickSaveHandeler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { pincodeData: address.pincode };
    const response = await fetch(`/api/pincode-validate`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const resData = await response.json();
    if (resData.distance.status === 'ZERO_RESULTS') {
      setPincodeValidate('Pincode is Invalid');
      // setLoading(false);
      // throw new Error('Pincode is Invalid');
    }
    if (resData.distance.status === 'OK') {
      if (resData.distance.status.status === 'NOT_FOUND') {
        setPincodeValidate('Pincode is Invalid');
        // setLoading(false);
        // throw new Error('Pincode is Invalid');
      } else {
        localStorage.setItem('pincode', address.pincode);
        // setLoading(false);
      }
    } else {
      setPincodeValidate('Something is wrong with your selection');
      // throw new Error('Something is wrong with your selection');
    }

    if (
      address.firstName !== '' &&
      address.lastName !== '' &&
      address.street !== '' &&
      address.city !== '' &&
      address.state !== '' &&
      address.country !== '' &&
      address.pincode !== '' &&
      address.email !== '' &&
      address.phone !== ''
    ) {
      if(validateEmail(address.email)){
        setFormIsValid(true);
        setLoading(false);
      }else{
        setEmailError('Please enter a valid email address.');
      }
    }
  };

  const validateNumber = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const onEditAddress = () => {
    setIsEdit(true);
    if (typeof setValidAddress === 'function') {
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
                    <div>
                      <label forhtml="firstName">First Name</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.firstName}
                        />
                      </Input>
                    </div>
                  </div>

                  <div className="form-control">
                    <div>
                      <label forhtml="lastName">Last Name</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.lastName}
                        />
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="row_group">
                  <div className="form-control">
                    <div>
                      <label forhtml="street">Street Address</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="street"
                          id="street"
                          placeholder="Street Address"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.street}
                        />
                      </Input>
                    </div>
                  </div>

                  <div className="form-control">
                    <div>
                      <label forhtml="appartment">
                        Appartment, Floor (Optional)
                      </label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="appartment"
                          id="appartment"
                          placeholder="Appartment, Floor (Optional)"
                          onChange={handleChange}
                          value={address.appartment}
                        />
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="row_group">
                  <div className="form-control">
                    <div>
                      <label forhtml="city">City</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.city}
                        />
                      </Input>
                    </div>
                  </div>

                  <div className="form-control">
                    <div>
                      <label forhtml="state">State</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          placeholder="State"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.state}
                        />
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="row_group">
                  <div className="form-control">
                    <div>
                      <label forhtml="country">Country</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          placeholder="Country"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.country}
                        />
                      </Input>
                    </div>
                  </div>

                  <div className="form-control">
                    <div>
                      <label forhtml="pincode">Pincode</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text" 
                          pattern="\d*"
                          name="pincode"
                          id="pincode"
                          maxLength="6"
                          placeholder="Pincode"
                          onKeyPress={validateNumber}
                          value={address.pincode}
                          onChange={handleChange}
                        />
                      </Input>
                      <span>Use one of the Pincode for Nebougherhood Discount 110058,160017</span>
                      <span style={{color: "#ff0000"}}>{pincodeValidate}</span>
                    </div>
                  </div>
                </div>
                <h3 className="subtitle" style={{ padding: 0 }}>
                  Contact Information
                </h3>
                <div className="row_group">
                  <div className="form-control">
                    <div>
                      <label forhtml="email">Email</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          maxLength="50"
                          onChange={handleChange}
                          value={address.email}
                        />
                      </Input>
                    </div>
                    {emailError && <div style={{color: "#ff0000"}}>{emailError}</div>}
                  </div>

                  <div className="form-control">
                    <div>
                      <label forhtml="phone">Phone Number</label>
                    </div>
                    <div className="field">
                      <Input>
                        <input
                          type="text" 
                          pattern="\d*"
                          name="phone"
                          maxLength="10"
                          id="phone"
                          placeholder="Phone Number"
                          onKeyPress={validateNumber}
                          onChange={handleChange}
                          value={address.phone}
                        />
                      </Input>
                    </div>
                  </div>
                </div>

                <div className="row_group">
                  <span>Required for sending the order confirmation.</span>
                  <span>Required to contact you about this order.</span>
                </div>

                {loading && !pincodeValidate && !emailError ? (
                  <span className="push-right">
                    <i className="fa fa-spinner" />
                  </span>
                ) : (
                  <button className="btn push-right" type="submit">
                    Save
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div>
              {address.firstName && (
                <div className="shipping_address">
                  <div className="address">
                    <strong>{`${address.firstName} ${address.lastName}`}</strong>
                    <p>
                      {address.street} {address.appartment},
                      <br />
                      {address.city}, {address.state}, Pincode {address.pincode}{' '}
                      <br />
                      Phone Number{' '}
                      <a href={`tel:${address.phone}`}>{address.phone}</a>{' '}
                      <br />
                      {address.country}
                    </p>
                  </div>

                  {!disable && (
                    <button
                      type="button"
                      className="action"
                      onClick={onEditAddress}
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AddressStyle>
  );
};

export default Address;
