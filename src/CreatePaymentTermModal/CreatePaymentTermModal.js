import React from 'react'
import './CreatePaymentTermModal.css'
import { AiOutlineClose } from 'react-icons/ai';
// import logo from "../../assets/images/tcglogo(1).png";
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import validator from 'validator';
// axios.defaults.withCredentials = true
import data2 from '../data/Customer.json';
import { FaExclamationCircle, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
axios.defaults.withCredentials = true

function CreatePaymentTermModal({ openCreatePaymentTermModal, setOpenCreatePaymentTermModal, refresh, setRefresh }) {
    // const history = useHistory();
    // const initialValues = { email: '', password: '' };
    // const [formValues, setFormValues] = React.useState(initialValues);
    // const [passwordType, setPasswordType] = React.useState('password');
    // const [errorMessage, setErrorMessage] = React.useState('');
    // const [isSubmit, setIsSubmit] = React.useState(false);
    // const [response, setResponse] = React.useState('');
    // const [successfulLogin, setSuccessfulLogin] = React.useState(false);

    const [paymentTermName, setPaymentTermName] = React.useState('');
    const [paymentTermPercentage, setPaymentTermPercentage] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);

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
                setOpenCreatePaymentTermModal(false);
                // setUserSession(true);
                // history.push("/")
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);


    const handleSubmit = async () => {
        if (paymentTermName && paymentTermPercentage) {
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + 'api/payment-term/create-payment-term', {
                    name: paymentTermName,
                    percentage: paymentTermPercentage,
                });

                setMessage(response.data.message);
                setPaymentTermName('');
                setPaymentTermPercentage('');
                // setCities([]);
                setErrors([]);
            } catch (error) {
                setMessage('Error creating payment term');
            }
        } else {
            const newErrors = [];

            if (!paymentTermName) {
                newErrors.push('Payment Term name is required');
            }
            if (!paymentTermPercentage) {
                newErrors.push('Payment Term percentage is required');
            }
            setErrors(newErrors);
        }
    };

    if (!openCreatePaymentTermModal) return null;
    return (
        <div className="create__payment__term__modal" onClick={() => setOpenCreatePaymentTermModal(false)}>
            <div class="create__payment__term__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='create__payment__term__modal__screen__clip'></div>
                <div class="create__payment__term__modal__screen__container">
                    <div class="create__payment__term__modal__close__button" onClick={() => setOpenCreatePaymentTermModal(false)}><AiOutlineClose /></div>
                    <div class="create__payment__term__modal__screen__content">
                        <div className='create__payment__term__modal__screen__content__top'>
                            {/* <FaUserPlus style={{ color: '#153e4d' }} size={40} /> */}
                            <div className='create__payment__term__modal__screen__content__heading'>Create New Payment Term</div>
                        </div>
                        <div className="create__payment__term__modal__screen__content__bottom">
                            {/* <h2>Add currency</h2> */}
                            <div className="create__payment__term__modal__screen__content__bottom__input">
                                <div className='create__payment__term__modal__screen__content__bottom__input__label'>Payment Term Name*: </div>
                                <input
                                    className='create__payment__term__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Payment Term Name"
                                    value={paymentTermName}
                                    onChange={e => setPaymentTermName(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__payment__term__modal__screen__content__bottom__input">
                                <div className='create__payment__term__modal__screen__content__bottom__input__label'>Payment Term Percentage*: </div>
                                <input
                                    className='create__payment__term__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Payment Term Percentage (include %)"
                                    value={paymentTermPercentage}
                                    onChange={e => setPaymentTermPercentage(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__payment__term__modal__error__message">
                                {/* {errors.map((error, index) => ( */}
                                <div>{errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}</div>
                                {/* ))} */}
                            </div>
                            <div className="create__payment__term__modal__submit-button" onClick={handleSubmit}>
                                Add Payment Term
                            </div>
                            <p className="create__payment__term__modal__message">{message}</p>
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

export default CreatePaymentTermModal