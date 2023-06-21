import React, { useState } from 'react'
import './SignUp.css'
import logo from '../assets/images/logo.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");
    const [clientType, setClientType] = useState('individual');
    return (
        <div className='singup'>
            <div className='singup__container'>
                <div className="singup__container__bg">
                    <div className="singup__container__img">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className='singup__container__content'>
                        <div className='singup__container__heading'>SIGNUP</div>
                        <form id="form" className='singup__container__form'>
                            <div className='singup__container__form__sections'>
                                <div className='singup__container__form__left'>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="name">Full Name<span>*</span></label>
                                        <input required type="text" name="name" id="name" placeholder="Enter your Full Name" />
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="email">Email<span>*</span></label>
                                        <input required type="email" name="email" id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="password">Password<span>*</span></label>
                                        <input required type={passwordType} name="password" id="password" placeholder="Enter your password" />
                                        {passwordType === "password" ? <FaEyeSlash className='singup__container__form__group__icon' onClick={() => setPasswordType('text')} /> : <FaEye className='singup__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType('password')} />}
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="phone">Contact Number<span>*</span></label>
                                        <input required type="tel" id="phone" name="phone" placeholder="Enter your contact number" />
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="country">Country<span>*</span></label>
                                        <select required id="country" name="country">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="fiat">Fiat</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='singup__container__form__right'>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="company">Company Name<span>*</span></label>
                                        <input required type="text" name="company" id="company" placeholder="Enter your Company Name" />
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="altemail">Alternate Email</label>
                                        <input type="email" name="altemail" id="altemail" placeholder="Enter your alternate email (optional)" />
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="password2">Confirm Password<span>*</span></label>
                                        <input required type={passwordType2} name="password2" id="password2" placeholder="Enter your password again" />
                                        {passwordType2 === "password" ? <FaEyeSlash className='singup__container__form__group__icon' onClick={() => setPasswordType2('text')} /> : <FaEye className='singup__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType2('password')} />}
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="phone2">Alternate Contact No</label>
                                        <input type="tel" id="phone2" name="phone2" placeholder="Enter your alternate contact no (optional)" />
                                    </div>
                                    <div className='singup__container__form__group'>
                                        <label htmlFor="city">City<span>*</span></label>
                                        <select required id="city" name="city">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="fiat">Fiat</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='singup__container__form__group2'>
                                <label htmlFor="address">Address with PO Box<span>*</span></label>
                                <input type="address" id="address" name="address" placeholder="Enter your complete address with PO Box" />
                            </div>
                            <div className='singup__container__form__group3'>
                                <label htmlFor="address">Register As<span>*</span></label>
                                <div className='singup__container__form__group3__type' style={{ backgroundColor: clientType === 'individual' ? '#153e4d' : null }} onClick={() => setClientType('individual')}>
                                    Individual
                                </div>
                                <div className='singup__container__form__group3__type' style={{ backgroundColor: clientType === 'dealer' ? '#153e4d' : null }} onClick={() => setClientType('dealer')}>
                                    Dealer
                                </div>
                            </div>
                            <div className='singup__container__form__group4'>
                                        <label htmlFor="city">Preffered Currency<span>*</span></label>
                                        <select required id="city" name="city">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="JPY">JPY</option>
                                            <option value="USD">USD</option>
                                        </select>
                                    </div>
                            <div className='singup__container__form__info'>
                                Fields with '*' are required fields.
                            </div>
                            <div className='singup__container__form__group'>
                                <button type="submit">Register</button>
                            </div>
                        </form>
                        <div className='singup__container__login__link'>Already have an account? <span onClick={() => navigate("/")}>SignIn</span></div>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default SignUp
