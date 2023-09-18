import React, { useState } from 'react';
import './ForgotPassword.css';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import axios from 'axios';
axios.defaults.withCredentials = true

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successfull, setSuccessfull] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        // Validate email (you can use a more robust validation library)
        if (!email) {
            setErrorMessage('Email is required');
            return;
        }

        // Show loading spinner
        setLoading(true);

        // Simulate sending a password reset email (replace with your actual API call)
        try {
            // Replace this with your actual API request to send a reset email
            // const response = await sendPasswordResetEmail(email);
            const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/user/request-reset-password",
                {
                    email: email,
                }
            ).then((response) => {
                console.log(response);
                if (response.data.error) {
                    console.log(response.data.message)
                    setErrorMessage(response.data.message);
                } else {
                    console.log(response.data.message)
                    setMessage(response.data.message);
                }
            }).catch((error) => {
                console.log(error);
                setErrorMessage(error.data.message);
            });
            // Example success response
            // const response = { success: false };
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };
    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            console.log(errorMessage)
            console.log(message)
            if (errorMessage) {
                console.log('error')
                setLoading(false);
            }
            else if (!errorMessage && message) {
                console.log('successfull')
                setSuccessfull(true);
            }
        }, 3000);
        return () => clearTimeout(timeOutId);
    }, [errorMessage, message]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (successfull) {
                // alert(response);
                // setOpenLoginModal(false);
                // setUserSession(true);
                navigate("/");

                setLoading(false);
            }
        }, 5000);
        return () => clearTimeout(timeOutId);
    }, [successfull]);

    return (
        <div className="forgot-password">
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
            <div className="forgot-password__back" onClick={() => navigate('/')}><FaArrowLeft /></div>
            <div className="forgot-password__container">
                <div className="forgot-password__container__bg">
                    <div className="forgot-password__container__img">
                        <img src={logo} alt="Logo" />
                    </div>
                    {successfull ?
                        <div className='forgot-password__container__content'>
                            <div className="forgot-password__screen__content__success">
                                <div className='successful__forgot-password'>
                                    {/* <i className='successful__forgot-password__icon fas fa-check-circle'></i> */}
                                    <FaCheckCircle className='successful__forgot-password__icon' />
                                    {/* <div className='successful__forgot-password__text'>Welcome</div> */}
                                    <div className='successful__forgot-password__text'>{message}</div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="forgot-password__container__content">
                            <div className="forgot-password__container__heading">FORGOT PASSWORD</div>
                            <div className='forgot-password__container__sub-heading'>Enter your email and we'll send you a link to reset your password.</div>
                            <form className="forgot-password__container__form" onSubmit={handleSubmit}>
                                <div className="forgot-password__container__form__group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errorMessage && (
                                    <div className="error__message">
                                        <FaExclamationCircle />
                                        <div style={{ marginLeft: '5px' }}>{errorMessage}</div>
                                    </div>
                                )}
                                {loading ? (
                                    <div className="forgot-password__container__form__group">
                                        <div className="forgot-password__preloader">
                                            <AiOutlineLoading className="forgot-password__preloader__icon" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="forgot-password__container__form__group">
                                        <button type="submit">Send Reset Email</button>
                                    </div>
                                )}
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
