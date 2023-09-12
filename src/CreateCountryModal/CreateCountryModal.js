import React from 'react'
import './CreateCountryModal.css'
import { AiOutlineClose } from 'react-icons/ai';
// import logo from "../../assets/images/tcglogo(1).png";
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import validator from 'validator';
// axios.defaults.withCredentials = true
import data2 from '../data/Customer.json';
import axios from 'axios';
import { FaExclamationCircle, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
axios.defaults.withCredentials = true

function CreateCountryModal({ openCreateCountryModal, setOpenCreateCountryModal, refresh, setRefresh }) {
    // const history = useHistory();
    // const initialValues = { email: '', password: '' };
    // const [formValues, setFormValues] = React.useState(initialValues);
    // const [passwordType, setPasswordType] = React.useState('password');
    // const [errorMessage, setErrorMessage] = React.useState('');
    // const [isSubmit, setIsSubmit] = React.useState(false);
    // const [response, setResponse] = React.useState('');
    // const [successfulLogin, setSuccessfulLogin] = React.useState(false);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [selectedRole, setSelectedRole] = React.useState("sale");
    const [selectedStatus, setSelectedStatus] = React.useState("");
    const [register, setRegister] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [countryName, setCountryName] = React.useState('');
    const [cityName, setCityName] = React.useState('');
    const [cities, setCities] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const [passwordType, setPasswordType] = React.useState('password');
    const [password2Type, setPassword2Type] = React.useState('password');


    const togglePasswordType = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const togglePassword2Type = () => {
        if (password2Type === 'password') {
            setPassword2Type('text');
        } else {
            setPassword2Type('password');
        }
    }

    // const handleSubmit = (e) => {
    // e.preventDefault();
    // setIsSubmit(true);

    // function isValidEmail(email) {
    // return /\S+@\S+\.\S+/.test(email);
    // }

    // const email = e.target[0].value;
    // const password = e.target[1].value;

    // if (email === '' || password === '') {
    // setErrorMessage('All fields are required');
    // } else if (isValidEmail(email) === false) {
    // setErrorMessage('Please Enter Valid Email');
    // } else {
    // setErrorMessage('');
    // const user = {
    // email,
    // password
    // }

    // axios
    // .post(
    // "" + process.env.REACT_APP_BACKEND_URL + "api/user/login",
    // {
    // email: user.email,
    // password: user.password,
    // }
    // )
    // .then((res) => {
    // if (res.data.error) {
    // alert(res.data.message);
    // setErrorMessage(res.data.message);
    // console.log(res)
    // } else {
    // setResponse(res.data.message)
    // console.log(res);
    // setIsSubmit(true);
    // }
    // })
    // .catch((err) => {
    // console.log(err);
    // });
    // console.log(user);
    // }
    // }


    // React.useEffect(() => {
    // const timeOutId = setTimeout(() => {
    // if (!errorMessage && isSubmit && response) {
    // alert(response);
    // setSuccessfulLogin(true);
    // }
    // }, 1000);
    // return () => clearTimeout(timeOutId);
    // }, [errorMessage, isSubmit, response]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (message) {
                // alert(response);
                setOpenCreateCountryModal(false);
                // setUserSession(true);
                // history.push("/")
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);

    // React.useEffect(() => {
    //     let user = {
    //         fullname: name,
    //         email: email,
    //         contact: contact,
    //         role: selectedRole,
    //         password: password,
    //         password2: password2
    //     }
    //     if (name && email && selectedRole && password && password2) {
    //         setRegister(true);
    //     } else {
    //         setRegister(false);
    //     }
    // }, [name, email, contact, selectedRole, password, password2]);

    // const handleChangeRole = event => {
    //     console.log(event.target.value);
    //     if (event.target.value) {
    //         setSelectedRole(event.target.value);
    //     }
    // }

    // const handleChangeStatus = event => {
    //     console.log(event.target.value);
    //     if (event.target.value) {
    //         setSelectedStatus(event.target.value);
    //     }
    // }

    // const handleRegister = async () => {
    //     let user = {
    //         fullname: name,
    //         email: email,
    //         contact: contact,
    //         role: selectedRole,
    //         password: password,
    //         password2: password2
    //     }
    //     axios.post(
    //         "" + process.env.REACT_APP_BACKEND_URL + `api/user/register`, user
    //     ).then((res) => {
    //         if (res.data.error) {
    //             console.log(res.data.message)
    //             setErrorMessage(res.data.message[0]);
    //         } else {
    //             console.log(res.data.data);
    //             // setData(res.data.data);
    //             setOpenNewUserModal(false);
    //             setRefresh(!refresh);
    //         }
    //     })
    // }


    const addCity = () => {
        const cityExists = cities.some(city => city.name === cityName);

        if (cityName && !cityExists) {
            setCities([...cities, { name: cityName }]);
            setCityName('');
            setErrors([]);
        } else {
            const newErrors = [];

            if (!cityName) {
                newErrors.push('City name is required');
            }

            if (cityExists) {
                newErrors.push('City name already exists');
            }

            setErrors(newErrors);
        }
    };

    const handleSubmit = async () => {
        if (countryName && cities.length > 0) {
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + 'api/country/create-country', {
                    name: countryName,
                    cities: cities
                });

                setMessage(response.data.message);
                setCountryName('');
                setCities([]);
                setErrors([]);
            } catch (error) {
                setMessage('Error creating country');
            }
        } else {
            const newErrors = [];

            if (!countryName) {
                newErrors.push('Country name is required');
            }

            if (cities.length === 0) {
                newErrors.push('At least one city is required');
            }

            setErrors(newErrors);
        }
    };

    const checkDuplicateCountry = async () => {
        if (countryName) {
            try {
                const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + `api/country/check/${countryName}`);
                if (response.data.data) {
                    setErrors(['Country with the same name already exists']);
                } else {
                    setErrors([]);
                }
            } catch (error) {
                setErrors([]);
            }
        }
    };


    if (!openCreateCountryModal) return null;
    return (
        <div className="create__country__modal" onClick={() => setOpenCreateCountryModal(false)}>
            <div class="create__country__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='create__country__modal__screen__clip'></div>
                <div class="create__country__modal__screen__container">
                    <div class="create__country__modal__close__button" onClick={() => setOpenCreateCountryModal(false)}><AiOutlineClose /></div>
                    <div class="create__country__modal__screen__content">
                        <div className='create__country__modal__screen__content__top'>
                            {/* <FaUserPlus style={{ color: '#153e4d' }} size={40} /> */}
                            <div className='create__country__modal__screen__content__heading'>Create New Country</div>
                        </div>
                        <div className="create__country__modal__screen__content__bottom">
                            {/* <h2>Add Country</h2> */}
                            <div className="create__country__modal__screen__content__bottom__input">
                                <div className='create__country__modal__screen__content__bottom__input__label'>Country Name*: </div>
                                <input
                                    className='create__country__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Country Name"
                                    value={countryName}
                                    onChange={e => setCountryName(e.target.value)}
                                    onBlur={checkDuplicateCountry}
                                />
                                <div className="create__country__modal__check-button" onClick={checkDuplicateCountry}>
                                    Check
                                </div>
                            </div>
                            <div className="create__country__modal__screen__content__bottom__input">
                                <div className='create__country__modal__screen__content__bottom__input__label'>City Name*: </div>
                                <input
                                    className='create__country__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="City Name"
                                    value={cityName}
                                    onChange={e => setCityName(e.target.value)}
                                />
                                <div className="create__country__modal__add-button" onClick={addCity}>
                                    Add City
                                </div>
                            </div>
                            <div className="create__country__modal__error__message">
                                {/* {errors.map((error, index) => ( */}
                                     <div>{errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}</div>
                                {/* ))} */}
                            </div>
                            <div className='create__country__modal__city__list__heading'>Added Cities:</div>
                            <div className="create__country__modal__city__list">
                                {cities.map((city, index) => (
                                    <div className="create__country__modal__cities" key={index}>{city.name},</div>
                                ))}
                            </div>
                            <div className="create__country__modal__submit-button" onClick={handleSubmit}>
                                Add Country
                            </div>
                            <p className="create__country__modal__message">{message}</p>
                        </div>
                    </div>
                </div>


                {/* {successfulLogin ?
                    <div class="login__screen__content__success">
                        <div class="login__close__button">
                            <i className="fas fa-times" onClick={() => setOpenLoginModal(false)}></i>
                        </div>
                        <div className='successful__login'>
                            <i className='successful__login__icon fas fa-check-circle'></i>
                            <div className='successful__login__text'>Welcome</div>
                            <div className='successful__login__text'>User Logged In Successfully</div>
                        </div>
                    </div>
                    :
                    <div class="login__screen__content">
                        <div class="login__close__button">
                            <i className="fas fa-times" onClick={() => setOpenLoginModal(false)}></i>
                        </div>
                        <div className="login__img">
                            <img src={logo} alt="" />
                        </div>
                        <div className="welcome__text">Welcome Back!</div>
                        <form class="login" onSubmit={handleSubmit}>
                            <div class="login__field">
                                <i class="login__icon fas fa-envelope"></i>
                                <input
                                    type="text"
                                    class="login__input"
                                    placeholder="Email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                />
                            </div>
                            <div class="login__field">
                                <i class="login__icon fas fa-lock"></i>
                                <input
                                    type={passwordType}
                                    class="login__input"
                                    placeholder="Password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                />
                                {passwordType === 'password' ? <i class="login__icon__i fas fa-eye-slash" onClick={() => togglePasswordType()} /> : <i class="login__icon__i fas fa-eye" onClick={() => togglePasswordType()} />}
                            </div>
                            {errorMessage ? (
                                <div class="error__message">
                                    <i class="error__icon fas fa-exclamation-circle"></i>
                                    <span>{errorMessage}</span>
                                </div>
                            ) : null
                            }
                            <button class="button login__submit">
                                <span class="button__text">Log In Now</span>
                                <i class="login__button__icon fas fa-chevron-right"></i>
                            </button>
                            <div class="login__forgot">
                                <div class="login__forgot__link" onClick={() => { setOpenLoginModal(false); setOpenForgotModal(true) }}>Forgot Password?</div>
                            </div>
                            <div class="login__signup">
                                <span class="login__signup__text">Don't have an account?</span>
                                <div class="login__signup__link" onClick={() => { setOpenLoginModal(false); setOpenSignUpModal(true) }}>Sign Up</div>
                            </div>
                        </form>
                    </div>
                } */}
                {/* <div class="login__screen__background">
                    <span class="login__screen__background__shape screen__background__shape4"></span>
                    <span class="login__screen__background__shape screen__background__shape3"></span>
                    <span class="login__screen__background__shape screen__background__shape2"></span>
                    <span class="login__screen__background__shape screen__background__shape1"></span>
                </div> */}
            </div>
        </div>
    )

}

export default CreateCountryModal