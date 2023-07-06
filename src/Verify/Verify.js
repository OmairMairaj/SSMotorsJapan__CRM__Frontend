import axios from "axios";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Verify.css";
import { FaRegCheckCircle } from "react-icons/fa";
axios.defaults.withCredentials = true

export default function Verify() {
    const navigate = useNavigate();
    console.log("VERIFY PAGE")
    const search = useLocation().search;
    const confirmationCode = new URLSearchParams(search).get("code")
    const [MyText, setMyText] = React.useState("Verifying Email...")


    React.useEffect(() => {
        if(sessionStorage.getItem('user')){
            navigate('/dashboard');
        }
    }, []);

    React.useEffect(() => {
        console.log(confirmationCode);
        if (!confirmationCode) {
            setMyText("Invalid Link")
        }
        else {
            axios.get("" + process.env.REACT_APP_BACKEND_URL + "api/user/verify/" + confirmationCode)
                .then((res) => {
                    console.log(res);
                    if (res.data.error) {
                        setMyText(res.data.message + "\n" + "Redirecting to login...")
                    }
                    else if (!res.data.error) {
                        setMyText(res.data.message + "\n" + "Redirecting to login...")
                    }
                    setTimeout(() => { navigate("/") }, 5000)
                    // setTimeout(() => 5000)
                })
                .catch((err) => {
                    setMyText("Unexpected Error Occured \n Please try again")
                    navigate("/")
                })
        }
    }, [])
    return (
        <div className="verify">
            <div className="verify__modal" >
                <div class="verify__screen" >
                    <div class="verify__screen__content__success">
                        <div className='successful__verify'>
                            <FaRegCheckCircle className='successful__verify__icon' />
                            <div className='successful__verify__text'>{MyText}</div>
                        </div>
                    </div>
                    <div class="verify__screen__background">
                        <span class="verify__screen__background__shape screen__background__shape4"></span>
                        <span class="verify__screen__background__shape screen__background__shape3"></span>
                        <span class="verify__screen__background__shape screen__background__shape2"></span>
                        <span class="verify__screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}