import axios from "axios";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPassword.css";
import { FaCheckCircle, FaChevronRight, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
axios.defaults.withCredentials = true

export default function ResetPassword() {
    const navigate = useNavigate();
    const search = useLocation().search;
    const confirmationCode = new URLSearchParams(search).get("code")
    const [MyText, setMyText] = React.useState("Verifying Email...")
    const [openModal, setOpenModal] = React.useState(false)
    const [successful, setSuccessful] = React.useState(false)
    const [passwordType, setPasswordType] = React.useState('password')
    const [password2Type, setPassword2Type] = React.useState('password')
    const [errorMessage, setErrorMessage] = React.useState("")
    const [formValues, setFormValues] = React.useState({
        password: "",
        password2: ""
    })
    const togglePasswordType = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }
    const togglePassword2Type = () => {
        if (password2Type === 'password') {
            setPassword2Type('text')
        }
        else {
            setPassword2Type('password')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const password = e.target[0].value;
        const confirmPassword = e.target[1].value;

        if (password === '' || confirmPassword === '') {
            setErrorMessage('All fields are required');
        } else if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            setErrorMessage('');
            const user = {
                password,
                confirmPassword
            }

            console.log(user);

            axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/user/reset-password/" + confirmationCode,
                {
                    newPass1: user.password,
                    newPass2: user.confirmPassword
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.error) {
                        setErrorMessage(res.data.message)
                    }
                    else if (!res.data.error) {
                        setSuccessful(true)
                        setTimeout(() => { navigate("/") }, 5000)
                    }
                })
                .catch((err) => {
                    setErrorMessage("Unexpected Error Occurred \n Please try again")
                })
        }
    }

    React.useEffect(() => {
        console.log(confirmationCode);
        if (!confirmationCode) {
            setMyText("Invalid Link")
        }
        else {
            axios.get("" + process.env.REACT_APP_BACKEND_URL + "api/user/reset-password/check-validity" + confirmationCode)
                .then((res) => {
                    console.log(res);
                    if (res.data.error) {
                        setMyText(res.data.message + "\n" + "Redirecting to home...")
                        setTimeout(() => { navigate("/") }, 5000)
                    }
                    else if (!res.data.error) {
                        setMyText(res.data.message + "\n" + "Redirecting to change password ...")
                        setTimeout(() => { setOpenModal(true) }, 5000)
                    }
                })
                .catch((err) => {
                    setMyText("Unexpected Error Occurred \n Please try again")
                })
        }
    }, [confirmationCode, navigate])
    return (
        <div className="reset__password">
            {openModal ?
                <div className="reset__password__modal" >
                    {successful ?
                        <div class="reset__password__screen" >
                            <div class="reset__password__screen__content__success">
                                <div className='successful__reset__password'>
                                    <FaCheckCircle className='successful__reset__password__icon' />
                                    <div className='successful__reset__password__text'>Password Changed Successfully</div>
                                </div>
                            </div>
                        </div>
                        :
                        <div class="reset__password__screen2" >
                            <div class="reset__password__screen__content">
                                <div className="reset__password__change__text">Change Password</div>
                                <form class="reset__password__change" onSubmit={handleSubmit}>
                                    <div class="reset__password__change__field">
                                        <FaLock class="reset__password__change__icon" />
                                        <input
                                            type={passwordType}
                                            class="reset__password__change__input"
                                            placeholder="Password"
                                            name='password'
                                            value={formValues.password}
                                            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                        />
                                        {passwordType === 'password' ? <FaEyeSlash class="reset__password__change__icon__i" onClick={() => togglePasswordType()} /> : <FaEye class="reset__password__change__icon__i" onClick={() => togglePasswordType()} />}
                                    </div>
                                    <div class="reset__password__change__field">
                                        <FaLock class="reset__password__change__icon" />
                                        <input
                                            type={password2Type}
                                            class="reset__password__change__input"
                                            placeholder="Confirm Password"
                                            name='confirmPassword'
                                            value={formValues.password2}
                                            onChange={(e) => setFormValues({ ...formValues, password2: e.target.value })}
                                        />
                                        {password2Type === 'password' ? <FaEyeSlash class="reset__password__change__icon__i" onClick={() => togglePassword2Type()} /> : <FaEye class="reset__password__change__icon__i" onClick={() => togglePassword2Type()} />}
                                    </div>
                                    {errorMessage ? (
                                        <div class="reset__password__error__message">
                                            <FaCheckCircle class="reset__password__error__icon" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    ) : null
                                    }
                                    <button class="reset__password__button change__submit">
                                        <span class="reset__password__button__text">Change Password</span>
                                        <FaChevronRight class="reset__password__button__icon" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    }
                    <div class="reset__password__screen__background">
                        <span class="reset__password__screen__background__shape screen__background__shape4"></span>
                        <span class="reset__password__screen__background__shape screen__background__shape3"></span>
                        <span class="reset__password__screen__background__shape screen__background__shape2"></span>
                        <span class="reset__password__screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
                :
                <div className="reset__password__modal" >
                    <div class="reset__password__screen" >
                        <div class="reset__password__screen__content__success">
                            <div className='successful__reset__password'>
                                <FaCheckCircle className='successful__reset__password__icon' />
                                <div className='successful__reset__password__text'>{MyText}</div>
                            </div>
                        </div>
                        <div class="reset__password__screen__background">
                            <span class="reset__password__screen__background__shape screen__background__shape4"></span>
                            <span class="reset__password__screen__background__shape screen__background__shape3"></span>
                            <span class="reset__password__screen__background__shape screen__background__shape2"></span>
                            <span class="reset__password__screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}