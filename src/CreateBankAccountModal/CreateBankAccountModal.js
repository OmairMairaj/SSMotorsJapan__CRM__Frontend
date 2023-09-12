import React, { useState } from 'react'
import './CreateBankAccountModal.css'
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

function CreateBankAccountModal({ openCreateBankAccountModal, setOpenCreateBankAccountModal, refresh, setRefresh }) {

    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
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
                setOpenCreateBankAccountModal(false);
                // setUserSession(true);
                // history.push("/")
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);


    const handleSubmit = async () => {
        if (bankName && branchName && accountName && accountNumber && swiftCode && branchAddress) {
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + 'api/bank-account/add-account', {
                    bankName: bankName,
                    branchName: branchName,
                    accountName: accountName,
                    accountNumber: accountNumber,
                    swiftCode: swiftCode,
                    branchAddress: branchAddress,
                });

                setMessage(response.data.message);
                setBankName('')
                setBranchName('')
                setAccountName('')
                setAccountNumber('')
                setSwiftCode('')
                setBranchAddress('')
                // setCities([]);
                setErrors([]);
            } catch (error) {
                setMessage('Error creating account');
            }
        } else {
            const newErrors = [];

            if (!bankName) {
                newErrors.push('Bank name is required');
            }
            if (!branchName) {
                newErrors.push('Branch name is required');
            }
            if (!accountName) {
                newErrors.push('Account name is required');
            }
            if (!accountNumber) {
                newErrors.push('Account number is required');
            }
            if (!swiftCode) {
                newErrors.push('Swift code is required');
            }
            if (!branchAddress) {
                newErrors.push('Branch address is required');
            }
            setErrors(newErrors);
        }
    };

    if (!openCreateBankAccountModal) return null;
    return (
        <div className="create__bank__account__modal" onClick={() => setOpenCreateBankAccountModal(false)}>
            <div class="create__bank__account__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='create__bank__account__modal__screen__clip'></div>
                <div class="create__bank__account__modal__screen__container">
                    <div class="create__bank__account__modal__close__button" onClick={() => setOpenCreateBankAccountModal(false)}><AiOutlineClose /></div>
                    <div class="create__bank__account__modal__screen__content">
                        <div className='create__bank__account__modal__screen__content__top'>
                            {/* <FaUserPlus style={{ color: '#153e4d' }} size={40} /> */}
                            <div className='create__bank__account__modal__screen__content__heading'>Add New Bank Account</div>
                        </div>
                        <div className="create__bank__account__modal__screen__content__bottom">
                            {/* <h2>Add currency</h2> */}
                            <div className="create__bank__account__modal__screen__content__bottom__input">
                                <div className='create__bank__account__modal__screen__content__bottom__input__label'>Bank Name*: </div>
                                <input
                                    className='create__bank__account__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Bank Name"
                                    value={bankName}
                                    onChange={e => setBankName(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__bank__account__modal__screen__content__bottom__input">
                                <div className='create__bank__account__modal__screen__content__bottom__input__label'>Branch Name*: </div>
                                <input
                                    className='create__bank__account__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Branch Name"
                                    value={branchName}
                                    onChange={e => setBranchName(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__bank__account__modal__screen__content__bottom__input">
                                <div className='create__bank__account__modal__screen__content__bottom__input__label'>Account Name*: </div>
                                <input
                                    className='create__bank__account__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Account Name"
                                    value={accountName}
                                    onChange={e => setAccountName(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__bank__account__modal__screen__content__bottom__input">
                                <div className='create__bank__account__modal__screen__content__bottom__input__label'>Account Number*: </div>
                                <input
                                    className='create__bank__account__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Account Number"
                                    value={accountNumber}
                                    onChange={e => setAccountNumber(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__bank__account__modal__screen__content__bottom__input">
                                <div className='create__bank__account__modal__screen__content__bottom__input__label'>Swift Code*: </div>
                                <input
                                    className='create__bank__account__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Swift Code"
                                    value={swiftCode}
                                    onChange={e => setSwiftCode(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="create__bank__account__modal__screen__content__bottom__input">
                                <div className='create__bank__account__modal__screen__content__bottom__input__label'>Branch Address*: </div>
                                <input
                                    className='create__bank__account__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Branch Address"
                                    value={branchAddress}
                                    onChange={e => setBranchAddress(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>

                            <div className="create__bank__account__modal__error__message">
                                <div>{errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}</div>
                            </div>
                            <div className="create__bank__account__submit-button" onClick={handleSubmit}>
                                Add New Account
                            </div>
                            <p className="create__bank__account__message">{message}</p>
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

export default CreateBankAccountModal