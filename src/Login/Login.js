import React, { useState } from 'react'
import './Login.css'
import logo from '../assets/images/logo.png'
import { FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import data from '../data/users.json';
import axios from 'axios';
axios.defaults.withCredentials = true

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
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if(sessionStorage.getItem('user')){
            navigate('/dashboard');
        }
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        // setUser({});
        setResponse('');
        setLoading(true);
        setErrorMessage('');
        // setIsSubmit(true);

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        const email = e.target[0].value;
        const password = e.target[1].value;

        if (email === '' || password === '') {
            setErrorMessage('All fields are required');
            setLoading(false);
        } else if (isValidEmail(email) === false) {
            setErrorMessage('Please Enter Valid Email');
            setLoading(false);
        } else if (email !== '' && password !== '') {
            setErrorMessage('');
            const user = {
                email,
                password
            }

            axios
                .post(
                    "" + process.env.REACT_APP_BACKEND_URL + "api/user/login",
                    {
                        email: user.email,
                        password: user.password,
                    }
                )
                .then((res) => {
                    if (res.data.error) {
                        // alert(res.data.message);
                        setErrorMessage(res.data.message);
                        console.log(res)
                    } else {
                        setResponse(res.data.message)
                        console.log(res);
                        setUser({
                            email: res.data.user.email,
                            fullname: res.data.user.fullname,
                            role: res.data.user.role,
                            userStatus: res.data.user.userStatus,
                            userId: res.data.user.userId,
                            datecreated: res.data.user.datecreated
                        });
                        console.log(JSON.stringify(User));
                        sessionStorage.setItem('user', JSON.stringify({
                            email: res.data.user.email,
                            fullname: res.data.user.fullname,
                            role: res.data.user.role,
                            userStatus: res.data.user.userStatus,
                            userId: res.data.user.userId,
                            datecreated: res.data.user.datecreated
                        }));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // data.map((item) => {
            //     console.log(item.email)
            //     console.log(user.email);
            //     console.log(item.password);
            //     console.log(user.password);
            //     if (item.email === user.email && item.password === user.password) {
            //         // setSuccessfulLogin(true);
            //         setUser(item);
            //         setResponse('Login Successful');
            //         console.log("Login Successful")
            //         setErrorMessage('');
            //     } else if (item.email === user.email && item.password === user.password) {
            //         // setLoading(false);
            //         setResponse('Invalid Credentials');
            //     }
            // })
            console.log(User);
        }
    }

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            // console.log("A")
            // console.log(errorMessage)
            // console.log(isSubmit)
            // console.log(response)

            if (!errorMessage && isSubmit && response) {
                // alert(response);
                // console.log("B")
                setSuccessfulLogin(true);
                // console.log("Successful Login")
                // setLoading(false);
            } else {
                setLoading(false);
                // setErrorMessage('Invalid Credentials');
            }
        }, 3000);
        return () => clearTimeout(timeOutId);
    }, [errorMessage, isSubmit, response]);

    React.useEffect(() => {
        if (User) {
            console.log(User);
            setIsSubmit(true);
            // setLoading(true);
        }
    }, [User]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (successfulLogin) {
                // alert(response);
                // setOpenLoginModal(false);
                // setUserSession(true);
                navigate("/dashboard");
                setLoading(false);
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
                        <div className='login__container__content'>
                            <div className="login__screen__content__success">
                                <div className='successful__login'>
                                    {/* <i className='successful__login__icon fas fa-check-circle'></i> */}
                                    <FaCheckCircle className='successful__login__icon' />
                                    <div className='successful__login__text'>Welcome</div>
                                    <div className='successful__login__text'>User Logged In Successfully</div>
                                </div>
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
                                {loading ?
                                    <div className='login__container__form__group'>
                                        <div className='login__preloader'><AiOutlineLoading className='login__preloader__icon' /></div>
                                    </div>
                                    :
                                    <div className='login__container__form__group'>
                                        <button >Login</button>
                                    </div>
                                }

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
