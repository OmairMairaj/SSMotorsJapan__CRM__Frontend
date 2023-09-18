import React from 'react'
import './UserModal.css'
import { AiOutlineClose, AiOutlineLoading } from 'react-icons/ai';
// import logo from "../../assets/images/tcglogo(1).png";
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import validator from 'validator';
// axios.defaults.withCredentials = true
import data2 from '../data/Customer.json';
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa';
axios.defaults.withCredentials = true

function UserModal({ data, openUserModal, setOpenUserModal, refresh, setRefresh }) {
    console.log(data);

    // const history = useHistory();
    // const initialValues = { email: '', password: '' };
    // const [formValues, setFormValues] = React.useState(initialValues);
    // const [passwordType, setPasswordType] = React.useState('password');
    // const [errorMessage, setErrorMessage] = React.useState('');
    // const [isSubmit, setIsSubmit] = React.useState(false);
    // const [response, setResponse] = React.useState('');
    // const [successfulLogin, setSuccessfulLogin] = React.useState(false);

    const [name, setName] = React.useState(data.fullname);
    const [email, setEmail] = React.useState(data.email);
    const [contact, setContact] = React.useState(data.contact);
    const [selectedRole, setSelectedRole] = React.useState(data.role);
    const [selectedStatus, setSelectedStatus] = React.useState(data.userStatus);
    const [update, setUpdate] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [successfull, setSuccessfull] = React.useState(false);

    React.useEffect(() => {
        let user = {
            user_id: data.user_id,
            fullname: name,
            email: email,
            contact: contact,
            role: selectedRole,
            userStatus: selectedStatus
        }
        if (user.fullname !== data.fullname || user.email !== data.email || user.contact !== data.contact || user.role !== data.role || user.userStatus !== data.userStatus) {
            setUpdate(true);
        } else {
            setUpdate(false);
        }
    }, [name, email, contact, selectedRole, selectedStatus]);

    const handleChangeRole = event => {
        console.log(event.target.value);
        if (event.target.value) {
            setSelectedRole(event.target.value);
        }
    }

    const handleChangeStatus = event => {
        console.log(event.target.value);
        if (event.target.value) {
            setSelectedStatus(event.target.value);
        }
    }

    const handleUpdate = async () => {
        setMessage('');
        setLoading(true);
        // setErrors([]);
        // const newErrors = [];
        let user = {
            _id: data._id,
            user_id: data.user_id,
            fullname: name,
            email: email,
            contact: contact,
            role: selectedRole,
            userStatus: selectedStatus
        }
        axios.post(
            "" + process.env.REACT_APP_BACKEND_URL + `api/user/updateUser/${user._id}`, user
        ).then((res) => {
            if (res.data.error) {
                console.log(res.data.message)
                setErrorMessage(res.data.message);
                setLoading(false);
            } else {
                console.log(res.data.data);
                setMessage(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            setErrorMessage(err.message);
            setLoading(false);
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
                setOpenUserModal(false);
                setRefresh(!refresh);
            }
        }, 1000);
        return () => clearTimeout(timeOutId2);
    }, [successfull]);


    if (!openUserModal) return null;
    return (
        <div className="user__modal" onClick={() => {setOpenUserModal(false); setRefresh(!refresh);}}>
            <div class="user__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='user__modal__screen__clip'></div>
                <div class="user__modal__screen__container">
                    <div class="user__modal__close__button" onClick={() => {setOpenUserModal(false); setRefresh(!refresh);}}><AiOutlineClose /></div>
                    <div class="user__modal__screen__content">
                        <div className='user__modal__screen__content__top'>
                            <div className='user__modal__profile__image'>{data.fullname.charAt(0).toUpperCase()}</div>
                            <div className='user__modal__profile__box'>
                                <div className='user__modal__profile__info'>
                                    <div className='user__modal__profile__info__label'>User ID: </div>
                                    <div className='user__modal__profile__info__value'>{data.user_id}</div>
                                </div>
                                <div className='user__modal__profile__info'>
                                    <div className='user__modal__profile__info__label'>Full Name: </div>
                                    <div className='user__modal__profile__info__value'>{data.fullname}</div>
                                </div>
                                <div className='user__modal__profile__info'>
                                    <div className='user__modal__profile__info__label'>Email: </div>
                                    <div className='user__modal__profile__info__value'>{data.email}</div>
                                </div>
                                <div className='user__modal__profile__info'>
                                    <div className='user__modal__profile__info__label'>Conctact: </div>
                                    <div className='user__modal__profile__info__value'>{data.contact === "" ? '--------' : data.contact}</div>
                                </div>

                            </div>
                            <div className='user__modal__profile__status__box'>
                                <div className='user__modal__profile__status'>{data.userStatus.toUpperCase() + " " + data.role.toUpperCase()}</div>
                            </div>
                        </div>
                        <div className='user__modal__screen__content__bottom'>
                            {/* <div className='user__modal__screen__content__bottom__left'> */}
                            <div className='user__modal__profile__info2'>
                                <div className='user__modal__profile__info2__label'>User ID: </div>
                                <input
                                    disabled
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='id'
                                    placeholder='Enter User ID'
                                    value={data.user_id}
                                />
                            </div>
                            <div className='user__modal__profile__info2'>
                                <div className='user__modal__profile__info2__label'>Full Name: </div>
                                <input
                                    required
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='name'
                                    placeholder='Enter User Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='user__modal__profile__info2'>
                                <div className='user__modal__profile__info2__label'>Email: </div>
                                <input
                                    required
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='email'
                                    placeholder='Enter User Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='user__modal__profile__info2'>
                                <div className='user__modal__profile__info2__label'>Contact: </div>
                                <input
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='contact'
                                    placeholder='Enter User Contact'
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                            <div className='user__modal__profile__info2'>
                                <div className='user__modal__profile__info2__label'>Role: </div>
                                <select
                                    style={{ width: '80%' }}
                                    required
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='role'
                                    placeholder='Enter User Role'
                                    value={selectedRole}
                                    onChange={handleChangeRole}
                                    disabled={data.role === 'client' || data.user_id === 'SSM-00000' ? true : false}
                                >
                                    <option value={data.role} selected hidden>{data.role.toUpperCase()}</option>
                                    <option key="admin" value="admin">ADMIN</option>
                                    {/* <option key="client" value="client">CLIENT</option> */}
                                    <option key="sale" value="sale">SALE</option>
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
                            <div className='user__modal__profile__info2'>
                                <div className='user__modal__profile__info2__label'>Status: </div>
                                <select
                                    style={{ width: '80%' }}
                                    required
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='status'
                                    placeholder='Enter User Status'
                                    value={selectedStatus}
                                    onChange={handleChangeStatus}
                                    disabled={data.user_id === 'SSM-00000' ? true : false}
                                >
                                    <option value={data.userStatus} selected hidden>{data.userStatus.toUpperCase()}</option>
                                    <option key="active" value="active">ACTIVE</option>
                                    <option key="pending" value="pending">PENDING</option>
                                    <option key="suspended" value="suspended">SUSPENDED</option>
                                </select>
                                {/* <input
                                    className='user__modal__profile__info2__value'
                                    type='text'
                                    name='status'
                                    placeholder='Enter User Status'
                                    value={data.userStatus.toUpperCase()}
                                /> */}
                            </div>
                            {errorMessage ? (
                                <div className="user__modal__error__message">
                                    <div ><FaExclamationCircle style={{ marginRight: '5px' }} />{errorMessage}</div>
                                </div>
                            ) : null
                            }
                            {loading ? (
                                <button className="user__modal__profile__update__button"><AiOutlineLoading className="signup__preloader__icon" /></button>
                            ) : (
                                <button className={update ? "user__modal__profile__update__button" : "user__modal__profile__update__button__disabled"}
                                    disabled={!update} onClick={handleUpdate}>Update</button>
                            )}
                            {/* <button className={update ? "user__modal__profile__update__button" : "user__modal__profile__update__button__disabled"}
                                disabled={!update} onClick={handleUpdate}>Update</button> */}
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

export default UserModal