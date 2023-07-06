import React from 'react'
import './CustomerModal.css'
import { AiOutlineClose } from 'react-icons/ai';
// import logo from "../../assets/images/tcglogo(1).png";
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import validator from 'validator';
// axios.defaults.withCredentials = true
import data2 from '../data/Customer.json';

function CustomerModal({ data, openCustomerModal, setOpenCustomerModal }) {
    console.log(data);

    // const history = useHistory();
    // const initialValues = { email: '', password: '' };
    // const [formValues, setFormValues] = React.useState(initialValues);
    // const [passwordType, setPasswordType] = React.useState('password');
    // const [errorMessage, setErrorMessage] = React.useState('');
    // const [isSubmit, setIsSubmit] = React.useState(false);
    // const [response, setResponse] = React.useState('');
    // const [successfulLogin, setSuccessfulLogin] = React.useState(false);

    // const togglePasswordType = () => {
    // if (passwordType === 'password') {
    // setPasswordType('text');
    // } else {
    // setPasswordType('password');
    // }
    // }

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

    // React.useEffect(() => {
    // const timeOutId = setTimeout(() => {
    // if (successfulLogin) {
    // alert(response);
    // setOpenLoginModal(false);
    // setUserSession(true);
    // history.push("/")
    // }
    // }, 2000);
    // return () => clearTimeout(timeOutId);
    // }, [successfulLogin, setOpenLoginModal]);


    if (!openCustomerModal) return null;
    return (
        <div className="customer__modal" onClick={() => setOpenCustomerModal(false)}>
            <div class="modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='modal__screen__clip'></div>
                <div class="modal__screen__container">
                    <div class="modal__close__button" onClick={() => setOpenCustomerModal(false)}><AiOutlineClose /></div>
                    <div class="modal__screen__content">
                        <div className='modal__screen__content__top'>
                            <div className='modal__profile__image'>{data.fullName.charAt(0).toUpperCase()}</div>
                            <div className='modal__profile__box'>
                                <div className='modal__profile__info'>
                                    <div className='modal__profile__info__label'>Customer ID: </div>
                                    <div className='modal__profile__info__value'>{data.customer_id}</div>
                                </div>
                                <div className='modal__profile__info'>
                                    <div className='modal__profile__info__label'>Full Name: </div>
                                    <div className='modal__profile__info__value'>{data.fullName}</div>
                                </div>
                                <div className='modal__profile__info'>
                                    <div className='modal__profile__info__label'>Email: </div>
                                    <div className='modal__profile__info__value'>{data.altEmail != '' ? `${data.email} / ${data.altEmail}` : data.email}</div>
                                </div>
                                <div className='modal__profile__info'>
                                    <div className='modal__profile__info__label'>Contact No: </div>
                                    <div className='modal__profile__info__value'>{data.altContactNo != '' ? `${data.contactNo} / ${data.altContactNo}` : data.contactNo}</div>
                                </div>
                                <div className='modal__profile__info'>
                                    <div className='modal__profile__info__label'>Company Name: </div>
                                    <div className='modal__profile__info__value'>{data.companyName}</div>
                                </div>
                            </div>
                            <div className='modal__profile__status__box'>
                                <div className='modal__profile__status'>{data.status}</div>
                            </div>
                        </div>
                        <div className='modal__screen__content__bottom'>
                            <div className='modal__screen__content__bottom__left'>
                                <div className='modal__profile__info2'>
                                    <div className='modal__profile__info2__label'>Preferred Currency: </div>
                                    <div className='modal__profile__info2__value'>{data.prefCurrency}</div>
                                </div>
                                <div className='modal__profile__info2'>
                                    <div className='modal__profile__info2__label'>Registered As: </div>
                                    <div className='modal__profile__info2__value'>{data.registerAs}</div>
                                </div>
                                <div className='modal__profile__info2'>
                                    <div className='modal__profile__info2__label'>Sale Person: </div>
                                    <div className='modal__profile__info2__value'>{data.salePerson}</div>
                                </div>
                            </div>
                            <div className='modal__screen__content__bottom__right'>
                                <div className='modal__profile__info2'>
                                    <div className='modal__profile__info3__label'>Country: </div>
                                    <div className='modal__profile__info2__value'>{data.country}</div>
                                </div>
                                <div className='modal__profile__info2'>
                                    <div className='modal__profile__info3__label'>City: </div>
                                    <div className='modal__profile__info2__value'>{data.city}</div>
                                </div>
                                <div className='modal__profile__info2'>
                                    <div className='modal__profile__info3__label'>Address: </div>
                                    <div className='modal__profile__info2__value'>{data.address}</div>
                                </div>
                            </div>
                        </div>

                        <div className='modal__screen__content__invoices'>
                        <div className='dashboard__container__content__invoices__table__header' style={{margin: '0.5rem 0'}}>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '5%' }}></div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '8%' }}>Date</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '6%' }}>ETD</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '6%' }}>ETA</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='dashboard__container__content__invoices__table__header__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='dashboard__container__content__invoices__table__row'>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '5%' }}></div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>Date</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETD</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETA</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='dashboard__container__content__invoices__table__row'>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '5%' }}></div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>Date</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETD</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETA</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='dashboard__container__content__invoices__table__row'>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '5%' }}></div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>Date</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETD</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETA</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='dashboard__container__content__invoices__table__row__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='dashboard__container__content__invoices__table__total' style={{margin: '0.5rem 0'}}>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '5%' }}></div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '15%' }}>Opening Balance: $ 0 Dr.</div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '8%' }}>Total</div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '12%' }}></div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '8%' }}></div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '6%' }}>$ 15,000</div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '7%' }}>$ 15,000</div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '8%' }}>$ 0 Dr.</div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='dashboard__container__content__invoices__table__total__item' style={{ width: '8%' }}></div>
                            </div>
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

export default CustomerModal