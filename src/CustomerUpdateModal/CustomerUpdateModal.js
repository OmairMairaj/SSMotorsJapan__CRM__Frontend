import React from 'react'
import './CustomerUpdateModal.css'
import { AiOutlineClose, AiOutlineLoading } from 'react-icons/ai';
import validator from 'validator';
import data2 from '../data/Customer.json';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
axios.defaults.withCredentials = true

function CustomerUpdateModal({ data, openCustomerUpdateModal, setOpenCustomerUpdateModal, refresh, setRefresh }) {
    const User = JSON.parse(sessionStorage.getItem('user'));
    // console.log(User);
    const [selectedRole, setSelectedRole] = React.useState("sale");
    const [selectedStatus, setSelectedStatus] = React.useState("");
    const [register, setRegister] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successfull, setSuccessfull] = React.useState(false);
    const [sendEmail, setSendEmail] = React.useState(false);
    const [name, setName] = React.useState(data.fullname);
    const [company, setCompany] = React.useState(data.company);
    const [email, setEmail] = React.useState(data.email);
    const [altemail, setAltemail] = React.useState(data.altemail);
    const [contact, setContact] = React.useState(data.contact);
    const [contact2, setContact2] = React.useState(data.contact2);
    const [address, setAddress] = React.useState(data.address);
    const [clientType, setClientType] = React.useState(data.registerAs);
    const [countriesList, setCountriesList] = React.useState([]);
    const [currenciesList, setCurrenciesList] = React.useState([]);
    const [country, setCountry] = React.useState(data.country);
    const [city, setCity] = React.useState('---City---');
    const [prefCurrency, setPrefCurrency] = React.useState(data.prefCurrency);
    const [cities, setCities] = React.useState([]);
    const [customerStatus, setCustomerStatus] = React.useState(data.customerStatus);
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const [salesPerson, setSalesPerson] = React.useState(data.salesPerson);
    const [usersList, setUsersList] = React.useState([]);
    const [update, setUpdate] = React.useState(false);


    console.log(data);

    const fetchCountriesList = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + 'api/country/getAll'
            );
            setCountriesList(response.data.data);
            // console.log(response.data.data);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchCurrenciesList = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + 'api/currency/getAll'
            );
            setCurrenciesList(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const fetchUsersList = async () => {
        try {
            let list = [];
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + 'api/user/get-users'
            );
            if (response.data.data.length > 0) {
                list = response.data.data.filter((item) => item.role !== 'client');
            }
            setUsersList(list);
            // console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    React.useEffect(() => {
        setCity(data.city);
        if (countriesList.length > 0) {
            setCities(countriesList.find((ctr) => ctr.name === country).cities);
        }
    }, [country, countriesList])
    React.useEffect(() => {
        fetchCountriesList();
        fetchCurrenciesList();
        fetchUsersList();
    }, []);

    const changeCountry = (event) => {
        setCountry(event.target.value);
        console.log(event.target.value);
        setCities(countriesList.find((ctr) => ctr.name === event.target.value).cities);
    };

    const changeCity = (event) => {
        setCity(event.target.value);
    };

    const changeCurrency = (event) => {
        setPrefCurrency(event.target.value);
    };

    const handleChangeRole = event => {
        console.log(event.target.value);
        if (event.target.value) {
            setSelectedRole(event.target.value);
        }
    }
    const changeStatus = event => {
        // console.log(event.target.value);
        // if (event.target.value) {
        setCustomerStatus(event.target.value);
        // }
    }
    const changeSalesPerson = event => {
        console.log(event.target.value);
        if (event.target.value) {
            setSalesPerson(event.target.value);
        }
    }

    React.useEffect(() => {
        console.log(update);
        let customer = {
            _id: data._id,
            customer_id: data.customer_id,
            fullname: name,
            company: company,
            email: email,
            altemail: altemail,
            contact: contact,
            contact2: contact2,
            address: address,
            country: country,
            city: city,
            customerStatus: customerStatus,
            salesPerson: salesPerson,
            registerAs: clientType,
            prefCurrency: prefCurrency,
        }
        if (customer.fullname !== data.fullname || customer.company !== data.company || customer.email !== data.email || customer.altemail !== data.altemail || customer.contact !== data.contact || customer.contact2 !== data.contact2 || customer.address !== data.address || customer.country !== data.country || customer.city !== data.city || customer.customerStatus !== data.customerStatus || customer.salesPerson !== data.salesPerson || customer.registerAs !== data.registerAs || customer.prefCurrency !== data.prefCurrency ) {
            setUpdate(true);
        } else {
            setUpdate(false);
        }
    }, [name, company, email, altemail, contact, contact2, address, country, city, customerStatus, salesPerson, clientType, prefCurrency]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setErrors([]);
        const newErrors = [];
        if (validator.isEmpty(name)) {
            newErrors.push('Full name is required');
            setLoading(false);
        } else if (!validator.isLength(name, { min: 3, max: 30 })) {
            newErrors.push('Full name must be between 3 and 30 characters');
            setLoading(false);
        } else if (validator.isEmpty(company)) {
            newErrors.push('Company name is required');
            setLoading(false);
        } else if (!validator.isLength(company, { min: 3, max: 50 })) {
            newErrors.push('Company name must be between 3 and 50 characters');
            setLoading(false);
        } else if (validator.isEmpty(email)) {
            newErrors.push('Email field is required');
            setLoading(false);
        } else if (!validator.isEmail(email)) {
            newErrors.push('Email is invalid');
            setLoading(false);
        } else if (!validator.isEmpty(altemail) && !validator.isEmail(altemail)) {
            newErrors.push('Alternate email is invalid');
            setLoading(false);
        } else if (validator.isEmpty(contact)) {
            newErrors.push('Contact number is required');
            setLoading(false);
        } else if (country === '---Country---') {
            newErrors.push('Country field is required');
            setLoading(false);
        } else if (city === '---City---') {
            newErrors.push('City field is required');
            setLoading(false);
        } else if (validator.isEmpty(address)) {
            newErrors.push('Address field is required');
            setLoading(false);
        } else if (prefCurrency === '---Currency---') {
            newErrors.push('Currency field is required');
            setLoading(false);
        } else {
            const customer = {
                _id: data._id,
                customer_id: data.customer_id,
                fullname: name,
                company: company,
                email: email,
                altemail: altemail,
                contact: contact,
                contact2: contact2,
                address: address,
                country: country,
                city: city,
                customerStatus: customerStatus,
                salesPerson: salesPerson,
                registerAs: clientType,
                prefCurrency: prefCurrency,
            };

            axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/customer/updateCustomer/${customer._id}`, customer)
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data.message)
                        newErrors.push(res.data.message || 'Error while signing up');
                        setLoading(false);
                    } else {
                        console.log(res.data.data);
                        setMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    newErrors.push(err.response.data.message || 'Error while signing up');
                });
        }
        setErrors(newErrors);
    };

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (errors.length > 0) {
                setLoading(false);
            }
            if (errors.length === 0 && message) {
                setSuccessfull(true);
            }
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [errors, message]);

    React.useEffect(() => {
        const timeOutId2 = setTimeout(() => {
            if (successfull) {
                setLoading(false);
                setOpenCustomerUpdateModal(false);
                setRefresh(!refresh);
            }
        }, 5000);
        return () => clearTimeout(timeOutId2);
    }, [successfull]);



    if (!openCustomerUpdateModal) return null;
    return (
        <div className="update__customer__modal" onClick={() => { setOpenCustomerUpdateModal(false); setRefresh(!refresh); }}>
            {successfull ?
                <div class="update__customer__modal__screen__success" onClick={(e) => e.stopPropagation()}>
                    <div className='update__customer__modal__screen__clip'></div>
                    <div class="update__customer__modal__screen__success__container">
                        <div class="update__customer__modal__close__button" onClick={() => { setOpenCustomerUpdateModal(false); setRefresh(!refresh); }}><AiOutlineClose /></div>
                        <div class="update__customer__modal__screen__content__success">
                            <div className='update__customer__modal__successful'>
                                <FaCheckCircle className="update__customer__modal__successful__icon" />
                                <div className='update__customer__modal__successful__text'>Customer Updated Successfully</div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div class="update__customer__modal__screen" onClick={(e) => e.stopPropagation()}>
                    <div className='update__customer__modal__screen__clip'></div>
                    <div class="update__customer__modal__screen__container">
                        <div class="update__customer__modal__close__button" onClick={() => { setOpenCustomerUpdateModal(false); setRefresh(!refresh); }}><AiOutlineClose /></div>
                        <div class="update__customer__modal__screen__content">
                            <div className='update__customer__modal__screen__content__top'>
                                {/* <FaUserPlus style={{ color: '#153e4d' }} size={40} /> */}
                                <div className='update__customer__modal__screen__content__heading'>Update Customer</div>
                            </div>
                            <form id="form" className="update__customer__modal__screen__content__bottom" >
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="name">Full Name<span>*</span></label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        className='update__customer__modal__form__group__value'
                                        placeholder="Enter your Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="company">Company Name<span>*</span></label>
                                    <input
                                        required
                                        type="text"
                                        name="company"
                                        id="company"
                                        className='update__customer__modal__form__group__value'
                                        placeholder="Enter your Company Name"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className='update__customer__modal__form__group__label' htmlFor="email">Email<span>*</span></label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        id="email"
                                        className='update__customer__modal__form__group__value'
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="altemail">Alternate Email</label>
                                    <input
                                        className="update__customer__modal__form__group__value"
                                        type="email"
                                        name="altemail"
                                        id="altemail"
                                        placeholder="Enter your alternate email (optional)"
                                        value={altemail}
                                        onChange={(e) => setAltemail(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="contact">Contact Number<span>*</span></label>
                                    <input
                                        className="update__customer__modal__form__group__value"
                                        required
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        placeholder="Enter your contact number"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="contact2">Alternate Contact No</label>
                                    <input
                                        className="update__customer__modal__form__group__value"
                                        type="tel"
                                        id="contact2"
                                        name="contact2"
                                        placeholder="Enter your alternate contact no (optional)"
                                        value={contact2}
                                        onChange={(e) => setContact2(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="country">Country<span>*</span></label>
                                    <select className="update__customer__modal__form__group__select" required value={country} onChange={changeCountry}>
                                        <option hidden>---Country---</option>
                                        {countriesList.map((item) => {
                                            return <option value={item.name}>{item.name}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="city">City<span>*</span></label>
                                    <select className="update__customer__modal__form__group__select" required value={city} onChange={changeCity}>
                                        <option hidden>---City---</option>
                                        {cities.map((item) => {
                                            return <option value={item.name}>{item.name}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="update__customer__modal__form__group2">
                                    <label className="update__customer__modal__form__group2__label" htmlFor="address">Address with PO Box<span>*</span></label>
                                    <input
                                        type="address"
                                        id="address"
                                        name="address"
                                        className="update__customer__modal__form__group2__value"
                                        placeholder="Enter your complete address with PO Box"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="address">Register As<span>*</span></label>
                                    <div
                                        className="update__customer__modal__form__group__type"
                                        style={{ backgroundColor: clientType === 'Individual' ? '#153e4d' : null }}
                                        onClick={() => setClientType('Individual')}
                                    >
                                        Individual
                                    </div>
                                    <div
                                        className="update__customer__modal__form__group__type"
                                        style={{ backgroundColor: clientType === 'Dealer' ? '#153e4d' : null }}
                                        onClick={() => setClientType('Dealer')}
                                    >
                                        Dealer
                                    </div>
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="currency">Preferred Currency<span>*</span></label>
                                    <select className="update__customer__modal__form__group__select" required value={prefCurrency} onChange={changeCurrency}>
                                        <option hidden>---Currency---</option>
                                        {currenciesList.map((item) => {
                                            return <option value={item.code}>{item.code}</option>;
                                        })}
                                    </select>
                                </div>
                                {/* <div className="update__customer__modal__form__group3">
                                    <input className='update__customer__modal__form__group3__value' type='checkbox' id='sendEmail' name='sendEmail' checked={sendEmail} onChange={() => setSendEmail(!sendEmail)} />
                                    <label className='update__customer__modal__form__group3__label' htmlFor='sendEmail'>Send Email</label>
                                </div> */}
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="status">Customer Status<span>*</span></label>
                                    <select className="update__customer__modal__form__group__select" required value={customerStatus} onChange={changeStatus}>
                                        <option value={customerStatus} selected hidden>{customerStatus.toUpperCase()}</option>
                                        <option key="active" value="active">ACTIVE</option>
                                        <option key="retainer" value="retainer">RETAINER</option>
                                        <option key="suspended" value="suspended">SUSPENDED</option>
                                    </select>
                                </div>
                                <div className="update__customer__modal__form__group">
                                    <label className="update__customer__modal__form__group__label" htmlFor="salesPerson">Sales Person<span>*</span></label>
                                    <select className="update__customer__modal__form__group__select" required value={salesPerson} onChange={changeSalesPerson}>
                                        <option hidden>---Choose Sale Person---</option>
                                        {usersList.map((item) => {
                                            return <option value={item.fullname}>{item.fullname}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className='update__customer__modal__required__info__text'>* Required Fields</div>
                                <div className="update__customer__modal__register__error__message">
                                    {errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}
                                </div>
                                {loading ? (
                                    <button className="update__customer__modal__form__register__button"><AiOutlineLoading className="signup__preloader__icon" /></button>
                                ) : (
                                    <button className={update ? "update__customer__modal__form__register__button" : "update__customer__modal__form__register__button__disabled"} disabled={!update}
                                        onClick={handleUpdate} >Update</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default CustomerUpdateModal