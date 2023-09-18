import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Shipping = () => {

    const { shippingInfo } = useSelector(state => state.cart);

    const [hNo, setHNo] = useState(shippingInfo.hNo);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setphoneNo] = useState(shippingInfo.phoneNo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch({
            type: "addShippingInfo",
            payload: {
                hNo,
                city,
                country,
                state,
                pinCode,
                phoneNo
            }
        });

        localStorage.setItem(
            "shippingInfo",
            JSON.stringify({
                hNo,
                city,
                country,
                state,
                pinCode,
                phoneNo
            })
        );

        navigate("/confirmorder");
    };

    return (

        <section className="shipping">

            <main>
                <h1>Shopping Details</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>House No.</label>
                        <input type="text" placeholder="Enter House No." value={hNo} onChange={(e) => setHNo(e.target.value)} />
                    </div>

                    <div>
                        <label>City</label>
                        <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div>
                        <label>Country</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {
                                Country && Country.getAllCountries().map(i => (
                                    <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {
                        country &&
                        <div>
                            <label>State</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry(country).map(i => (
                                        <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }

                    <div>
                        <label>Pin Code</label>
                        <input type="text" placeholder="Enter Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                    </div>
                    <div>
                        <label>Phone No.</label>
                        <input type="number" placeholder="Enter Phone No." value={phoneNo} onChange={(e) => setphoneNo(e.target.value)} />
                    </div>

                    <button type='submit'>Order Confirm</button>
                </form>
            </main>

        </section>
    )
}

export default Shipping;