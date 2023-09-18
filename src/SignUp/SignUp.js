import React, { useState, useEffect } from 'react';
import './SignUp.css';
import logo from '../assets/images/logo.png';
import {
    FaExclamationTriangle,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { AiOutlineLoading } from 'react-icons/ai';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [altemail, setAltemail] = useState('');
    const [contact, setContact] = useState('');
    const [contact2, setContact2] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [address, setAddress] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [passwordType2, setPasswordType2] = useState('password');
    const [clientType, setClientType] = useState('Individual');
    const [refresh, setRefresh] = useState(false);
    const [countriesList, setCountriesList] = useState([]);
    const [currenciesList, setCurrenciesList] = useState([]);
    const [country, setCountry] = useState('---Country---');
    const [city, setCity] = useState('---City---');
    const [prefCurrency, setPrefCurrency] = useState('---Currency---');
    const [cities, setCities] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successfulSignup, setSuccessfulSignup] = useState(false);

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

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            navigate('/dashboard');
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setErrors([]);
        const newErrors = [];
        if (validator.isEmpty(name)) {
            newErrors.push('Full name is required');
        } else if (!validator.isLength(name, { min: 3, max: 30 })) {
            newErrors.push('Full name must be between 3 and 30 characters');
        } else if (validator.isEmpty(company)) {
            newErrors.push('Company name is required');
        } else if (!validator.isLength(company, { min: 3, max: 50 })) {
            newErrors.push('Company name must be between 3 and 50 characters');
        } else if (validator.isEmpty(email)) {
            newErrors.push('Email field is required');
        } else if (!validator.isEmail(email)) {
            newErrors.push('Email is invalid');
        } else if (!validator.isEmpty(altemail) && !validator.isEmail(altemail)) {
            newErrors.push('Alternate email is invalid');
        } else if (validator.isEmpty(contact)) {
            newErrors.push('Contact number is required');
        // } else if (!validator.isMobilePhone(contact, 'en-PK')) {
        //     newErrors.push('Contact number is invalid');
        // } else if (!validator.isEmpty(contact2) && !validator.isMobilePhone(contact2, 'en-PK')) {
        //     newErrors.push('Alternate contact number is invalid');
        } else if (validator.isEmpty(password)) {
            newErrors.push('Password field is required');
        } else if (validator.isEmpty(password2)) {
            newErrors.push('Confirm password field is required');
        } else if (!validator.equals(password, password2)) {
            newErrors.push('Passwords must match');
        } else if (validator.isEmpty(address)) {
            newErrors.push('Address field is required');
        } else if (country === '---Country---') {
            newErrors.push('Country field is required');
        } else if (city === '---City---') {
            newErrors.push('City field is required');
        } else if (prefCurrency === '---Currency---') {
            newErrors.push('Currency field is required');
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
                salesPerson: 'TBD',
                registerAs: clientType,
                prefCurrency: prefCurrency,
                sendEmail: true,
            };

            axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/customer/signup", data)
                .then((res) => {
                    console.log(res.data);
                    setMessage(res.data.message);
                    // setSuccessfulSignup(true);
                })
                .catch((err) => {
                    console.log(err.response);
                    // setMessage(err.response.data.message);
                    newErrors.push(err.response.data.message || 'Error while signing up');
                });
        }

        setErrors(newErrors);
        
    };

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            // console.log("A")
            // console.log(errorMessage)
            // console.log(isSubmit)
            // console.log(response)

            if(errors.length > 0) {
                setLoading(false);
            }
            if (errors.length < 1 && message) {
                // alert(response);
                // console.log("B")
                setSuccessfulSignup(true);
                // console.log("Successful Login")
                // setLoading(false);
            // } else {
                // setLoading(false);
                // setErrorMessage('Invalid Credentials');
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [errors, message]);

    React.useEffect(() => {
        const timeOutId2 = setTimeout(() => {
            if (successfulSignup) {
                // alert(response);
                // setOpenLoginModal(false);
                // setUserSession(true);
                navigate("/");
                setLoading(false);
            }
        }, 8000);
        return () => clearTimeout(timeOutId2);
    }, [successfulSignup]);

    return (
        <div className="signup">
            <ul class="bg">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                {/* Add other <li> elements here */}
            </ul>
            <div className="signup__back" onClick={() => navigate('/')}><FaArrowLeft /></div>
            <div className="signup__container">
                <div className="signup__container__bg">
                    <div className="signup__container__img">
                        <img src={logo} alt="Logo" />
                    </div>
                    {successfulSignup ? (
                        <div className="signup__container__content">
                            <div className="signup__screen__content__success">
                                <div className="successful__signup">
                                    <FaCheckCircle className="successful__signup__icon" />
                                    <div className="successful__signup__text">User Signed Up Successfully</div>
                                    <div className="successful__signup__text">Please check your email to verify your account to Login</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="signup__container__content">
                            <div className="signup__container__heading">SIGNUP</div>
                            <form id="form" className="signup__container__form" onSubmit={handleSubmit}>
                                {/* Form fields */}
                                {/* Full Name */}
                                <div className="signup__container__form__sections">
                                    <div className="signup__container__form__group">
                                        <label htmlFor="name">Full Name<span>*</span></label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter your Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    {/* Company Name */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="company">Company Name<span>*</span></label>
                                        <input
                                            required
                                            type="text"
                                            name="company"
                                            id="company"
                                            placeholder="Enter your Company Name"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                    </div>
                                    {/* Email */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="email">Email<span>*</span></label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {/* Alternate Email */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="altemail">Alternate Email</label>
                                        <input
                                            type="email"
                                            name="altemail"
                                            id="altemail"
                                            placeholder="Enter your alternate email (optional)"
                                            value={altemail}
                                            onChange={(e) => setAltemail(e.target.value)}
                                        />
                                    </div>
                                    {/* Contact Number */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="contact">Contact Number<span>*</span></label>
                                        <input
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
                                    <div className="signup__container__form__group">
                                        <label htmlFor="contact2">Alternate Contact No</label>
                                        <input
                                            type="tel"
                                            id="contact2"
                                            name="contact2"
                                            placeholder="Enter your alternate contact no (optional)"
                                            value={contact2}
                                            onChange={(e) => setContact2(e.target.value)}
                                        />
                                    </div>
                                    {/* Password */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="password">Password<span>*</span></label>
                                        <input
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
                                                className="signup__container__form__group__icon"
                                                onClick={() => setPasswordType('text')}
                                            />
                                        ) : (
                                            <FaEye
                                                className="signup__container__form__group__icon"
                                                style={{ color: '#153e4d' }}
                                                onClick={() => setPasswordType('password')}
                                            />
                                        )}
                                    </div>
                                    {/* Confirm Password */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="password2">Confirm Password<span>*</span></label>
                                        <input
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
                                                className="signup__container__form__group__icon"
                                                onClick={() => setPasswordType2('text')}
                                            />
                                        ) : (
                                            <FaEye
                                                className="signup__container__form__group__icon"
                                                style={{ color: '#153e4d' }}
                                                onClick={() => setPasswordType2('password')}
                                            />
                                        )}
                                    </div>
                                    {/* Country */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="country">Country<span>*</span></label>
                                        <select required value={country} onChange={changeCountry}>
                                            <option hidden>---Country---</option>
                                            {countriesList.map((item) => {
                                                return <option value={item.name}>{item.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                    {/* City */}
                                    <div className="signup__container__form__group">
                                        <label htmlFor="city">City<span>*</span></label>
                                        <select required value={city} onChange={changeCity}>
                                            <option hidden>---City---</option>
                                            {cities.map((item) => {
                                                return <option value={item.name}>{item.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                {/* Address */}
                                <div className="signup__container__form__group2">
                                    <label htmlFor="address">Address with PO Box<span>*</span></label>
                                    <input
                                        type="address"
                                        id="address"
                                        name="address"
                                        placeholder="Enter your complete address with PO Box"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                {/* Register As */}
                                <div className="signup__container__form__group3">
                                    <label htmlFor="address">Register As<span>*</span></label>
                                    <div
                                        className="signup__container__form__group3__type"
                                        style={{ backgroundColor: clientType === 'Individual' ? '#153e4d' : null }}
                                        onClick={() => setClientType('Individual')}
                                    >
                                        Individual
                                    </div>
                                    <div
                                        className="signup__container__form__group3__type"
                                        style={{ backgroundColor: clientType === 'Dealer' ? '#153e4d' : null }}
                                        onClick={() => setClientType('Dealer')}
                                    >
                                        Dealer
                                    </div>
                                </div>
                                {/* Preferred Currency */}
                                <div className="signup__container__form__group4">
                                    <label htmlFor="currency">Preferred Currency<span>*</span></label>
                                    <select required value={prefCurrency} onChange={changeCurrency}>
                                        <option hidden>---Currency---</option>
                                        {currenciesList.map((item) => {
                                            return <option value={item.code}>{item.code}</option>;
                                        })}
                                    </select>
                                </div>
                                {/* Error Messages */}
                                <div className="signup__container__form__error">
                                    {errors.map((error, index) => (
                                        <div className="signup__container__form__error__message" key={index}>
                                            <FaExclamationTriangle style={{ marginRight: '5px' }} />
                                            {error}
                                        </div>
                                    ))}
                                </div>
                                {/* Info Message */}
                                <div className="signup__container__form__info" style={{ marginTop: errors.length < 1 ? '18px' : '0px' }}>
                                    Fields with '*' are required fields.
                                </div>
                                {/* Loading Icon */}
                                {loading ? (
                                    <div className="signup__container__form__group">
                                        <div className="signup__preloader">
                                            <AiOutlineLoading className="signup__preloader__icon" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="signup__container__form__group">
                                        <button type="submit">Register</button>
                                    </div>
                                )}
                            </form>
                            <div className="signup__container__login__link">
                                Already have an account? <span onClick={() => navigate('/')}>SignIn</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignUp;

