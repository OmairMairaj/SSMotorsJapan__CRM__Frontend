import React from 'react'
import './CreateUserModal.css'
import { AiOutlineClose, AiOutlineLoading } from 'react-icons/ai';
// import logo from "../../assets/images/tcglogo(1).png";
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import validator from 'validator';
// axios.defaults.withCredentials = true
import data2 from '../data/Customer.json';
import axios from 'axios';
import { FaExclamationCircle, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
axios.defaults.withCredentials = true

function CreateUserModal({ openNewUserModal, setOpenNewUserModal, refresh, setRefresh }) {
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
    const [passwordType, setPasswordType] = React.useState('password');
    const [password2Type, setPassword2Type] = React.useState('password');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [successfull, setSuccessfull] = React.useState(false);


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

    React.useEffect(() => {
        let user = {
            fullname: name,
            email: email,
            contact: contact,
            role: selectedRole,
            password: password,
            password2: password2
        }
        if (name && email && selectedRole && password && password2) {
            setRegister(true);
        } else {
            setRegister(false);
        }
    }, [name, email, contact, selectedRole, password, password2]);

    const handleChangeRole = event => {
        console.log(event.target.value);
        if (event.target.value) {
            setSelectedRole(event.target.value);
        }
    }

    // const handleChangeStatus = event => {
    //     console.log(event.target.value);
    //     if (event.target.value) {
    //         setSelectedStatus(event.target.value);
    //     }
    // }

    const handleRegister = async () => {
        setMessage('');
        setLoading(true);
        let user = {
            fullname: name,
            email: email,
            contact: contact,
            role: selectedRole,
            password: password,
            password2: password2
        }
        axios.post(
            "" + process.env.REACT_APP_BACKEND_URL + `api/user/register`, user
        ).then((res) => {
            if (res.data.error) {
                console.log(res.data.message)
                setErrorMessage(res.data.message);
                setLoading(false);
            } else {
                console.log(res.data.data);
                // setData(res.data.data);
                // setOpenNewUserModal(false);
                // setRefresh(!refresh);
                setMessage(res.data.message);
            }
        })
    }

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (errorMessage) {
                setLoading(false);
            }
            if (!errorMessage && message) {
                setSuccessfull(true);
            }
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [errorMessage, message]);

    React.useEffect(() => {
        const timeOutId2 = setTimeout(() => {
            if (successfull) {
                // navigate("/");
                setLoading(false);
                setOpenNewUserModal(false);
                setRefresh(!refresh);
            }
        }, 1000);
        return () => clearTimeout(timeOutId2);
    }, [successfull]);



    if (!openNewUserModal) return null;
    return (
        <div className="create__user__modal" onClick={() => {setOpenNewUserModal(false); setRefresh(!refresh)}}>
            <div class="create__user__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='create__user__modal__screen__clip'></div>
                <div class="create__user__modal__screen__container">
                    <div class="create__user__modal__close__button" onClick={() => {setOpenNewUserModal(false); setRefresh(!refresh);}}><AiOutlineClose /></div>
                    <div class="create__user__modal__screen__content">
                        <div className='create__user__modal__screen__content__top'>
                            <FaUserPlus style={{ color: '#153e4d' }} size={40} />
                            <div className='create__user__modal__screen__content__heading'>Create New User</div>
                        </div>
                        <div className='create__user__modal__screen__content__bottom'>
                            {/* <div className='modal__screen__content__bottom__left'> */}
                            <div className='create__user__modal__profile__info2'>
                                <div className='create__user__modal__profile__info2__label'>Full Name*: </div>
                                <input
                                    required
                                    className='create__user__modal__profile__info2__value'
                                    type='text'
                                    name='name'
                                    placeholder='Enter User Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='create__user__modal__profile__info2'>
                                <div className='create__user__modal__profile__info2__label'>Email*: </div>
                                <input
                                    required
                                    className='create__user__modal__profile__info2__value'
                                    type='text'
                                    name='email'
                                    placeholder='Enter User Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='create__user__modal__profile__info2'>
                                <div className='create__user__modal__profile__info2__label'>Contact: </div>
                                <input
                                    className='create__user__modal__profile__info2__value'
                                    type='text'
                                    name='contact'
                                    placeholder='Enter User Contact'
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                            <div className='create__user__modal__profile__info2'>
                                <div className='create__user__modal__profile__info2__label'>Role*: </div>
                                <select
                                    style={{ width: '80%' }}
                                    required
                                    className='create__user__modal__profile__info2__value'
                                    type='text'
                                    name='role'
                                    placeholder='Enter User Role'
                                    value={selectedRole}
                                    onChange={handleChangeRole}
                                >
                                    {/* <option value="" selected hidden></option> */}
                                    <option key="sale" value="sale" selected>SALE</option>
                                    <option key="admin" value="admin">ADMIN</option>
                                    {/* <option key="client" value="client">CLIENT</option> */}
                                </select>
                                {/* <select required name="dealer__name" placeholder='Select Customer' value={selectedCustomer.fullName} onChange={handleChangeCustomer}>
                                    <option value="" selected hidden>Select Customer</option>
                                    {customerList.map((item, index) => {
                                        return (
                                            <option key={item.fullName} value={item.fullName}>{item.fullName}</option>
                                        )
                                    })}
                                </select> */}
                            </div>
                            <div className='create__user__modal__profile__info2'>
                                <div className='create__user__modal__profile__info2__label'>Password*: </div>
                                <input
                                    className='create__user__modal__profile__info2__value'
                                    type={passwordType}
                                    name='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordType === "password" ? <FaEyeSlash className='create__user__modal__profile__info2__icon' onClick={() => setPasswordType('text')} /> : <FaEye className='create__user__modal__profile__info2__icon' style={{ color: '#153e4d' }} onClick={() => setPasswordType('password')} />}
                            </div>
                            <div className='create__user__modal__profile__info2'>
                                <div className='create__user__modal__profile__info2__label'>Confirm Password*: </div>
                                <input
                                    className='create__user__modal__profile__info2__value'
                                    type={password2Type}
                                    name='password2'
                                    placeholder='Enter Password Again'
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                                {password2Type === "password" ? <FaEyeSlash className='create__user__modal__profile__info2__icon' onClick={() => setPassword2Type('text')} /> : <FaEye className='create__user__modal__profile__info2__icon' style={{ color: '#153e4d' }} onClick={() => setPassword2Type('password')} />}
                            </div>
                            {/* <div className='modal__profile__info2'>
                                <div className='modal__profile__info2__label'>Status: </div>
                                <select
                                    style={{ width: '80%' }}
                                    required
                                    className='modal__profile__info2__value'
                                    type='text'
                                    name='status'
                                    placeholder='Enter User Status'
                                    value={selectedStatus}
                                    onChange={handleChangeStatus}
                                >
                                    <option value="" selected hidden></option>
                                    <option key="active" value="active">ACTIVE</option>
                                    <option key="pending" value="pending">PENDING</option>
                                    <option key="suspended" value="suspended">SUSPENDED</option>
                                </select>
                                
                            </div> */}
                            {errorMessage ? (
                                <div className="create__user__modal__register__error__message">
                                    <FaExclamationCircle />
                                    <div style={{ marginLeft: '5px' }}>{errorMessage}</div>
                                </div>
                            ) : null
                            }
                            {/* <div className='modal__required__info'> */}
                                <div className='create__user__modal__required__info__text'>* Required Fields</div>
                            {/* </div> */}
                            {loading ? (
                                // <button className="user__modal__profile__update__button"><AiOutlineLoading className="signup__preloader__icon" /></button>
                                <button className="create__user__modal__profile__register__button"><AiOutlineLoading className="signup__preloader__icon" /></button>
                            ) : (
                                <button className={register ? "create__user__modal__profile__register__button" : "create__user__modal__profile__register__button__disabled"}
                                disabled={!register} onClick={handleRegister} >Register</button>
                            )}
                            {/* <button className={register ? "create__user__modal__profile__register__button" : "create__user__modal__profile__register__button__disabled"}
                                disabled={!register} onClick={handleRegister} >Register</button> */}
                            {/* </div> */}
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

export default CreateUserModal