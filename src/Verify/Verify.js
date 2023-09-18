import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Verify.css";
import { FaRegCheckCircle } from "react-icons/fa";
axios.defaults.withCredentials = true;

export default function Verify() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const confirmationCode = new URLSearchParams(search).get("code");
  const [myText, setMyText] = useState("Verifying Email...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, []);

  useEffect(() => {
    if (!confirmationCode) {
      setMyText("Invalid Link");
      setIsLoading(false);
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/user/verify/${confirmationCode}`)
        .then((res) => {
          console.log(res);
          if (res.data.error) {
            setMyText(res.data.message + "\n" + "Redirecting to login...");
          } else if (!res.data.error) {
            setMyText(res.data.message + "\n" + "Redirecting to login...");
          }
          setIsLoading(false);
          setTimeout(() => navigate("/"), 5000);
        })
        .catch((err) => {
          setMyText("Unexpected Error Occured \n Please try again");
          setIsLoading(false);
          navigate("/");
        });
    }
  }, [confirmationCode]);

  return (
    <div className="verify">
      <div className="verify__modal">
        <div className="verify__screen">
          <div className="verify__screen__content__success">
            <div className='successful__verify'>
              <FaRegCheckCircle className='successful__verify__icon' />
              {isLoading ? (
                <div className='successful__verify__text'>Verifying Email...</div>
              ) : (
                <div className='successful__verify__text'>{myText}</div>
              )}
            </div>
          </div>
          <div className="verify__screen__background">
            <span className="verify__screen__background__shape screen__background__shape4"></span>
            <span className="verify__screen__background__shape screen__background__shape3"></span>
            <span className="verify__screen__background__shape screen__background__shape2"></span>
            <span className="verify__screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
