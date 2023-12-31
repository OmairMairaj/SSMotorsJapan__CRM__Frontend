import React, { useState } from 'react'
import './Profile.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';

function Profile() {
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
        <div className='profile'>
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
            </ul>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar} />
            <div className='profile__container' style={{ width: openSidebar ? '90%' : null }}>
                <Topbar openSidebar={openSidebar} />
                <div className='profile__container__content'>
                    <div className='dashboard__container__content__heading'>UPDATE PROFILE</div>
                    <div className='profile__container__content__edit__info'>
                        <form id="form" className='profile__container__form'>
                            <div className='profile__container__form__sections'>
                                <div className='profile__container__form__left'>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="name">Full Name<span>*</span></label>
                                        <input required type="text" name="name" id="name" placeholder="Enter your Full Name" />
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="email">Email<span>*</span></label>
                                        <input required type="email" name="email" id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="phone">Contact Number<span>*</span></label>
                                        <input required type="tel" id="phone" name="phone" placeholder="Enter your contact number" />
                                    </div>
                                    <div className='profile__container__form__group'>
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
                                <div className='profile__container__form__right'>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="company">Company Name<span>*</span></label>
                                        <input required type="text" name="company" id="company" placeholder="Enter your Company Name" />
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="altemail">Alternate Email</label>
                                        <input type="email" name="altemail" id="altemail" placeholder="Enter your alternate email (optional)" />
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="phone2">Alternate Contact No</label>
                                        <input type="tel" id="phone2" name="phone2" placeholder="Enter your alternate contact no (optional)" />
                                    </div>
                                    <div className='profile__container__form__group'>
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
                            <div className='profile__container__form__group2'>
                                <label htmlFor="address">Address with PO Box<span>*</span></label>
                                <input type="address" id="address" name="address" placeholder="Enter your complete address with PO Box" />
                            </div>
                            <div className='profile__container__form__group3'>
                                <label htmlFor="address">Register As<span>*</span></label>
                                <div className='profile__container__form__group3__type' style={{ backgroundColor: clientType === 'individual' ? '#153e4d' : null }} onClick={() => setClientType('individual')}>
                                    Individual
                                </div>
                                <div className='profile__container__form__group3__type' style={{ backgroundColor: clientType === 'dealer' ? '#153e4d' : null }} onClick={() => setClientType('dealer')}>
                                    Dealer
                                </div>
                            </div>
                            <div className='profile__container__form__group'>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                    <div className='profile__container__content__change__password'>
                        <div className='dashboard__container__content__heading'>CHANGE PASSWORD</div>
                        <form id="form" className='profile__container__form'>
                            <div className='profile__container__form__sections'>
                                <div className='profile__container__form__left'>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="oldpassword">Old Password<span>*</span></label>
                                        <input required type={oldPasswordType} name="oldpassword" id="oldpassword" placeholder="Enter your old password" />
                                        {oldPasswordType === "password" ? <FaEyeSlash className='profile__container__form__group__icon' onClick={() => setOldPasswordType('text')} /> : <FaEye className='profile__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setOldPasswordType('password')} />}
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="password">Password<span>*</span></label>
                                        <input required type={passwordType} name="password" id="password" placeholder="Enter your new password" />
                                        {passwordType === "password" ? <FaEyeSlash className='profile__container__form__group__icon' onClick={() => setPasswordType('text')} /> : <FaEye className='profile__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType('password')} />}
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <label htmlFor="password2">Confirm Password<span>*</span></label>
                                        <input required type={passwordType2} name="password2" id="password2" placeholder="Enter your new password again" />
                                        {passwordType2 === "password" ? <FaEyeSlash className='profile__container__form__group__icon' onClick={() => setPasswordType2('text')} /> : <FaEye className='profile__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType2('password')} />}
                                    </div>
                                    <div className='profile__container__form__group'>
                                        <button type="submit">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
