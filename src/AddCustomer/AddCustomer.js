import React, { useState } from 'react'
import './AddCustomer.css'
import { FaChevronDown, FaBars, FaFacebook, FaInstagram } from 'react-icons/fa';
import logoBlack from '../assets/images/logo-black.png'
import logo from '../assets/images/logo.png'
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';

function AddCustomer({ User }) {
    const navigate = useNavigate();
    const fullName = "Omair Mairaj";
    const company_name = "OMA PVT LTD";
    const email = "omairmairaj@gmail.com"

    const [oldPasswordType, setOldPasswordType] = useState('password');
    const [passwordType, setPasswordType] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");
    const [clientType, setClientType] = useState('individual');
    const [openSidebar, setOpenSidebar] = React.useState(false);


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

    return (
        <div className='add__customer'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar} User={User} />
            <div className='add__customer__container' style={{ width: openSidebar ? '90%' : null }}>
                <Topbar openSidebar={openSidebar} User={User} />
                <div className='add__customer__container__content'>
                    <div className='add__customer__container__content__heading'>ADD NEW CUSTOMER</div>
                    <div className='add__customer__container__content__edit__info'>
                        <form id="form" className='add__customer__container__form'>
                            <div className='add__customer__container__form__sections'>
                                <div className='add__customer__container__form__left'>
                                    <div className='add__customer__container__form__group'>
                                        <label htmlFor="name">Full Name<span>*</span></label>
                                        <input required type="text" name="name" id="name" placeholder="Enter Full Name" />
                                    </div>
                                    <div className='add__customer__container__form__group'>
                                        <label htmlFor="email">Email<span>*</span></label>
                                        <input required type="email" name="email" id="email" placeholder="Enter email" />
                                    </div>
                                    {/* <div className='add__customer__container__form__group'>
                                        <label htmlFor="password">Password<span>*</span></label>
                                        <input required type={passwordType} name="password" id="password" placeholder="Enter password" />
                                        {passwordType === "password" ? <FaEyeSlash className='add__customer__container__form__group__icon' onClick={() => setPasswordType('text')} /> : <FaEye className='add__customer__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType('password')} />}
                                    </div> */}
                                    <div className='add__customer__container__form__group'>
                                        <label htmlFor="phone">Contact Number<span>*</span></label>
                                        <input required type="tel" id="phone" name="phone" placeholder="Enter contact number" />
                                    </div>
                                    <div className='add__customer__container__form__group'>
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
                                <div className='add__customer__container__form__right'>
                                    <div className='add__customer__container__form__group'>
                                        <label htmlFor="company">Company Name<span>*</span></label>
                                        <input required type="text" name="company" id="company" placeholder="Enter Company Name" />
                                    </div>
                                    <div className='add__customer__container__form__group'>
                                        <label htmlFor="altemail">Alternate Email</label>
                                        <input type="email" name="altemail" id="altemail" placeholder="Enter alternate email (optional)" />
                                    </div>
                                    {/* <div className='add__customer__container__form__group'>
                                        <label htmlFor="password2">Confirm Password<span>*</span></label>
                                        <input required type={passwordType2} name="password2" id="password2" placeholder="Enter password again" />
                                        {passwordType2 === "password" ? <FaEyeSlash className='add__customer__container__form__group__icon' onClick={() => setPasswordType2('text')} /> : <FaEye className='add__customer__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType2('password')} />}
                                    </div> */}
                                    <div className='add__customer__container__form__group'>
                                        <label htmlFor="phone2">Alternate Contact No</label>
                                        <input type="tel" id="phone2" name="phone2" placeholder="Enter alternate contact no (optional)" />
                                    </div>
                                    <div className='add__customer__container__form__group'>
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
                            <div className='add__customer__container__form__group2'>
                                <label htmlFor="address">Address with PO Box<span>*</span></label>
                                <input type="address" id="address" name="address" placeholder="Enter complete address with PO Box" />
                            </div>
                            <div className='add__customer__container__form__group3'>
                                <label htmlFor="address">Register As<span>*</span></label>
                                <div className='add__customer__container__form__group3__type' style={{ backgroundColor: clientType === 'individual' ? '#153e4d' : null }} onClick={() => setClientType('individual')}>
                                    Individual
                                </div>
                                <div className='add__customer__container__form__group3__type' style={{ backgroundColor: clientType === 'dealer' ? '#153e4d' : null }} onClick={() => setClientType('dealer')}>
                                    Dealer
                                </div>
                            </div>
                            <div className='add__customer__container__form__group4'>
                                <label htmlFor="city">Preffered Currency<span>*</span></label>
                                <select required id="city" name="city">
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option value="JPY">JPY</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                            <div className='add__customer__container__form__info'>
                                Fields with '*' are required fields.
                            </div>
                            <div className='add__customer__container__form__group'>
                                <button type="submit">Register New Customer</button>
                            </div>
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
