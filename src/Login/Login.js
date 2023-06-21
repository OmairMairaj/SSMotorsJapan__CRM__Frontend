import React, { useState, useEffect } from 'react'
import './Login.css'
import logo from '../assets/images/logo.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import data from '../data/users.json';

function Login({ User, setUser }) {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const initialValues = { email: '', password: '' };
    const [formValues, setFormValues] = React.useState(initialValues);
    const [errorMessage, setErrorMessage] = React.useState('');
    // const [User, setUser] = React.useState();
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [response, setResponse] = React.useState('');
    const [successfulLogin, setSuccessfulLogin] = React.useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        // setUser({});
        setResponse('');
        setErrorMessage('');
        // setIsSubmit(true);

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        const email = e.target[0].value;
        const password = e.target[1].value;

        if (email === '' || password === '') {
            setErrorMessage('All fields are required');
        } else if (isValidEmail(email) === false) {
            setErrorMessage('Please Enter Valid Email');
        } else {
            setErrorMessage('');
            const user = {
                email,
                password
            }

            // axios
            //     .post(
            //         "" + process.env.REACT_APP_BACKEND_URL + "api/user/login",
            //         {
            //             email: user.email,
            //             password: user.password,
            //         }
            //     )
            //     .then((res) => {
            //         if (res.data.error) {
            //             // alert(res.data.message);
            //             setErrorMessage(res.data.message);
            //             console.log(res)
            //         } else {
            //             setResponse(res.data.message)
            //             console.log(res);
            //             setIsSubmit(true);
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
            data.map((item) => {
                console.log(item.email)
                console.log(user.email);
                console.log(item.password);
                console.log(user.password);
                if (item.email === user.email && item.password === user.password) {
                    // setSuccessfulLogin(true);
                    setUser(item);
                    setResponse('Login Successful');
                    console.log("Login Successful")
                    setErrorMessage('');
                }
            })
            console.log(User);
        }
    }

    React.useEffect(() => {
        // const timeOutId = setTimeout(() => {
            console.log("A")
            console.log(errorMessage)
            console.log(isSubmit)
            console.log(response)
            if (!errorMessage && isSubmit && response) {
                // alert(response);
                console.log("B")
                setSuccessfulLogin(true);
                console.log("Successful Login")
            }
        // }, 1000);
        // return () => clearTimeout(timeOutId);
    }, [errorMessage, isSubmit, response]);

    React.useEffect(() => {
        if (User) {
            console.log(User);
            setIsSubmit(true);
        }
    }, [User]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (successfulLogin) {
                // alert(response);
                // setOpenLoginModal(false);
                // setUserSession(true);
                navigate("/dashboard");
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [successfulLogin]);


    return (
        <div className='login'>
            <div className='login__container'>
                <div className="login__container__bg">
                    <div className="login__container__img">
                        <img src={logo} alt="Logo" />
                    </div>
                    {successfulLogin ?
                        <div className="login__screen__content__success">
                            <div className='successful__login'>
                                <i className='successful__login__icon fas fa-check-circle'></i>
                                <div className='successful__login__text'>Welcome</div>
                                <div className='successful__login__text'>User Logged In Successfully</div>
                            </div>
                        </div>
                        :
                        <div className='login__container__content'>
                            <div className='login__container__heading'>LOGIN</div>
                            <form className='login__container__form' onSubmit={handleSubmit}>
                                <div className='login__container__form__group'>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formValues.email}
                                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className='login__container__form__group'>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type={passwordType}
                                        name="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={formValues.password}
                                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                    />
                                    {passwordType === "password" ? <FaEyeSlash className='login__container__form__group__icon' onClick={() => setPasswordType('text')} /> : <FaEye className='login__container__form__group__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType('password')} />}
                                </div>
                                {errorMessage ? (
                                    <div className="error__message">
                                        <i className="error__icon fas fa-exclamation-circle"></i>
                                        <span>{errorMessage}</span>
                                    </div>
                                ) : null
                                }
                                <div className='login__container__form__group'>
                                    <button >Login</button>
                                </div>

                            </form>
                            <div className='login__container__forgot__link'>Forgot Password?</div>
                            <div className='login__container__signup__link'>Don't have an account? <span onClick={() => navigate("/signup")}>SignUp</span></div>
                        </div>
                    }
                </div>

            </div>
        </div >
    )
}

export default Login
