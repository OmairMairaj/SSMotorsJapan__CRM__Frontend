import React, { useState } from 'react'
import './AddCustomer.css'
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import validator from 'validator';
import axios from 'axios';
import { AiOutlineClose, AiOutlineLoading } from 'react-icons/ai';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true

function AddCustomer() {
    // const [clientType, setClientType] = useState('individual');
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const navigate = useNavigate();
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [selectedRole, setSelectedRole] = React.useState("sale");
    const [selectedStatus, setSelectedStatus] = React.useState("");
    const [register, setRegister] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successfull, setSuccessfull] = React.useState(false);
    const [sendEmail, setSendEmail] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    const [name, setName] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [altemail, setAltemail] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [contact2, setContact2] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [passwordType, setPasswordType] = React.useState('password');
    const [passwordType2, setPasswordType2] = React.useState('password');
    const [clientType, setClientType] = React.useState('Individual');
    const [countriesList, setCountriesList] = React.useState([]);
    const [currenciesList, setCurrenciesList] = React.useState([]);
    const [country, setCountry] = React.useState('---Country---');
    const [city, setCity] = React.useState('---City---');
    const [prefCurrency, setPrefCurrency] = React.useState('---Currency---');
    const [cities, setCities] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState([]);


    const wrapperRef = React.useRef(null);
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenSidebar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const fetchCountriesList = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + 'api/country/getAll'
            );
            setCountriesList(response.data.data);
            console.log(response.data.data);
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
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    React.useEffect(() => {
        // if (sessionStorage.getItem('user')) {
        //     navigate('/dashboard');
        // }
        fetchCountriesList();
        fetchCurrenciesList();
    }, []);


    const changeCountry = (event) => {
        setCountry(event.target.value);
        setCities(countriesList.find((ctr) => ctr.name === event.target.value).cities);
    };

    const changeCity = (event) => {
        setCity(event.target.value);
    };

    const changeCurrency = (event) => {
        setPrefCurrency(event.target.value);
    };

    const handleRegister = (e) => {
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
            // } else if (!validator.isMobilePhone(contact, 'en-PK')) {
            //     newErrors.push('Contact number is invalid');
            // } else if (!validator.isEmpty(contact2) && !validator.isMobilePhone(contact2, 'en-PK')) {
            //     newErrors.push('Alternate contact number is invalid');
        } else if (validator.isEmpty(password)) {
            newErrors.push('Password field is required');
            setLoading(false);
        } else if (validator.isEmpty(password2)) {
            newErrors.push('Confirm password field is required');
            setLoading(false);
        } else if (!validator.equals(password, password2)) {
            newErrors.push('Passwords must match');
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
            const data = {
                fullname: name,
                company: company,
                email: email,
                altemail: altemail,
                contact: contact,
                contact2: contact2,
                password: password,
                password2: password2,
                address: address,
                country: country,
                city: city,
                salesPerson: User.fullname,
                registerAs: clientType,
                prefCurrency: prefCurrency,
                sendEmail: sendEmail,
            };

            axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/customer/signup", data)
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data.message)
                        newErrors.push(res.data.message || 'Error while signing up');
                        setLoading(false);
                    } else {
                        console.log(res.data.message);
                        setMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    // setMessage(err.response.data.message);
                    newErrors.push(err.response.data.message || 'Error while signing up');
                });
            // console.log(data);
        }
        setErrors(newErrors);
        // setLoading(false);
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
                // navigate("/");
                setLoading(false);
                // setOpenCreateCustomerModal(false);
                setRefresh(!refresh);
            }
        }, 5000);
        return () => clearTimeout(timeOutId2);
    }, [successfull]);


    return (
        <div className='add__customer'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar} />
            <div className='add__customer__container' style={{ width: openSidebar ? '90%' : null }}>
                <Topbar openSidebar={openSidebar} />
                <div className='add__customer__container__content'>
                    <div className='add__customer__container__content__heading'>ADD NEW CUSTOMER</div>
                    <div className='add__customer__container__content__edit__info'>
                        <form id="form" className="add__customer__modal__screen__content__bottom" >
                            {/* Form fields */}
                            {/* Full Name */}
                            {/* <div className="signup__container__form__sections"> */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="name">Full Name<span>*</span></label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className='add__customer__modal__form__group__value'
                                    placeholder="Enter your Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {/* Company Name */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="company">Company Name<span>*</span></label>
                                <input
                                    required
                                    type="text"
                                    name="company"
                                    id="company"
                                    className='add__customer__modal__form__group__value'
                                    placeholder="Enter your Company Name"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>
                            {/* Email */}
                            <div className="add__customer__modal__form__group">
                                <label className='add__customer__modal__form__group__label' htmlFor="email">Email<span>*</span></label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    className='add__customer__modal__form__group__value'
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Alternate Email */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="altemail">Alternate Email</label>
                                <input
                                    className="add__customer__modal__form__group__value"
                                    type="email"
                                    name="altemail"
                                    id="altemail"
                                    placeholder="Enter your alternate email (optional)"
                                    value={altemail}
                                    onChange={(e) => setAltemail(e.target.value)}
                                />
                            </div>
                            {/* Contact Number */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="contact">Contact Number<span>*</span></label>
                                <input
                                    className="add__customer__modal__form__group__value"
                                    required
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    placeholder="Enter your contact number"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                            {/* Alternate Contact Number */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="contact2">Alternate Contact No</label>
                                <input
                                    className="add__customer__modal__form__group__value"
                                    type="tel"
                                    id="contact2"
                                    name="contact2"
                                    placeholder="Enter your alternate contact no (optional)"
                                    value={contact2}
                                    onChange={(e) => setContact2(e.target.value)}
                                />
                            </div>
                            {/* Password */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="password">Password<span>*</span></label>
                                <input
                                    className="add__customer__modal__form__group__value"
                                    required
                                    type={passwordType}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordType === 'password' ? (
                                    <FaEyeSlash
                                        className="add__customer__modal__form__group__icon"
                                        onClick={() => setPasswordType('text')}
                                    />
                                ) : (
                                    <FaEye
                                        className="add__customer__modal__form__group__icon"
                                        style={{ color: '#153e4d' }}
                                        onClick={() => setPasswordType('password')}
                                    />
                                )}
                            </div>
                            {/* Confirm Password */}
                            <div className="add__customer__modal__form__group">
                                <label className='add__customer__modal__form__group__label' htmlFor="password2">Confirm Password<span>*</span></label>
                                <input
                                    className="add__customer__modal__form__group__value"
                                    required
                                    type={passwordType2}
                                    name="password2"
                                    id="password2"
                                    placeholder="Enter your password again"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                                {passwordType2 === 'password' ? (
                                    <FaEyeSlash
                                        className="add__customer__modal__form__group__icon"
                                        onClick={() => setPasswordType2('text')}
                                    />
                                ) : (
                                    <FaEye
                                        className="add__customer__modal__form__group__icon"
                                        style={{ color: '#153e4d' }}
                                        onClick={() => setPasswordType2('password')}
                                    />
                                )}
                            </div>
                            {/* Country */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="country">Country<span>*</span></label>
                                <select className="add__customer__modal__form__group__select" required value={country} onChange={changeCountry}>
                                    <option hidden>---Country---</option>
                                    {countriesList.map((item) => {
                                        return <option value={item.name}>{item.name}</option>;
                                    })}
                                </select>
                            </div>
                            {/* City */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="city">City<span>*</span></label>
                                <select className="add__customer__modal__form__group__select" required value={city} onChange={changeCity}>
                                    <option hidden>---City---</option>
                                    {cities.map((item) => {
                                        return <option value={item.name}>{item.name}</option>;
                                    })}
                                </select>
                            </div>
                            {/* </div> */}
                            {/* Address */}
                            <div className="add__customer__modal__form__group2">
                                <label className="add__customer__modal__form__group2__label" htmlFor="address">Address with PO Box<span>*</span></label>
                                <input
                                    type="address"
                                    id="address"
                                    name="address"
                                    className="add__customer__modal__form__group2__value"
                                    placeholder="Enter your complete address with PO Box"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            {/* Register As */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="address">Register As<span>*</span></label>
                                <div
                                    className="add__customer__modal__form__group__type"
                                    style={{ backgroundColor: clientType === 'Individual' ? '#153e4d' : null }}
                                    onClick={() => setClientType('Individual')}
                                >
                                    Individual
                                </div>
                                <div
                                    className="add__customer__modal__form__group__type"
                                    style={{ backgroundColor: clientType === 'Dealer' ? '#153e4d' : null }}
                                    onClick={() => setClientType('Dealer')}
                                >
                                    Dealer
                                </div>
                            </div>
                            {/* Preferred Currency */}
                            <div className="add__customer__modal__form__group">
                                <label className="add__customer__modal__form__group__label" htmlFor="currency">Preferred Currency<span>*</span></label>
                                <select className="add__customer__modal__form__group__select" required value={prefCurrency} onChange={changeCurrency}>
                                    <option hidden>---Currency---</option>
                                    {currenciesList.map((item) => {
                                        return <option value={item.code}>{item.code}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="add__customer__modal__form__group3">
                                <input className='add__customer__modal__form__group3__value' type='checkbox' id='sendEmail' name='sendEmail' checked={sendEmail} onChange={() => setSendEmail(!sendEmail)} />
                                <label className='add__customer__modal__form__group3__label' htmlFor='sendEmail'>Send Email</label>
                            </div>
                            {/* Error Messages */}
                            {/* {errors .? ( */}

                            {/* ) : null */}
                            {/* } */}
                            {/* <div className='modal__required__info'> */}
                            <div className='add__customer__modal__required__info__text'>* Required Fields</div>
                            <div className="add__customer__modal__register__error__message">
                                {errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}
                            </div>
                            {/* </div> */}
                            {loading ? (
                                // <button className="customer__modal__form__update__button"><AiOutlineLoading className="signup__preloader__icon" /></button>
                                <button className="add__customer__modal__form__register__button"><AiOutlineLoading className="signup__preloader__icon" /></button>
                            ) : (
                                <button className="add__customer__modal__form__register__button"
                                    onClick={handleRegister} >Register</button>
                            )}
                        </form>
                    </div>
                    {/* <div className='profile__container__content__change__password'>
                        <div className='dashboard__container__content__heading'>CHANGE PASSWORD</div>
                        <form id="form" className='profile__container__form'>
                            <div className='profile__container__form__sections'>
                                <div className='profile__container__form__left'>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="oldpassword">Old Password<span>*</span></label>
                                        <input required type={oldPasswordType} name="oldpassword" id="oldpassword" placeholder="Enter old password" />
                                        {oldPasswordType === "password" ? <FaEyeSlash className='profile__container__form__group__icon' onClick={() => setOldPasswordType('text')} /> : <FaEye className='profile__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setOldPasswordType('password')} />}
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="password">Password<span>*</span></label>
                                        <input required type={passwordType} name="password" id="password" placeholder="Enter new password" />
                                        {passwordType === "password" ? <FaEyeSlash className='profile__container__form__group__icon' onClick={() => setPasswordType('text')} /> : <FaEye className='profile__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType('password')} />}
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="password2">Confirm Password<span>*</span></label>
                                        <input required type={passwordType2} name="password2" id="password2" placeholder="Enter new password again" />
                                        {passwordType2 === "password" ? <FaEyeSlash className='profile__container__form__group__icon' onClick={() => setPasswordType2('text')} /> : <FaEye className='profile__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType2('password')} />}
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <button type="submit">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div> */}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AddCustomer
