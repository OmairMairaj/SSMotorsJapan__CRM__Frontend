import React, { useState } from 'react'
import './PaymentTermModal.css'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa';
axios.defaults.withCredentials = true

function PaymentTermModal({ paymentTerm, openPaymentTermModal, setOpenPaymentTermModal, refresh, setRefresh }) {

    // console.log(paymentTerm)
    const [paymentTermName, setPaymentTermName] = useState(paymentTerm.name);
    const [paymentTermPercentage, setPaymentTermPercentage] = useState(paymentTerm.percentage);
    const [canUpdate, setCanUpdate] = useState(false);
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    React.useEffect(() => {
        let data = {
            paymentTermName: paymentTermName,
            paymentTermPercentage: paymentTermPercentage,
        }
        console.log(data)
        if (data.paymentTermName !== paymentTerm.name || data.paymentTermPercentage !== paymentTerm.percentage) {
            setCanUpdate(true);
        } else {
            setCanUpdate(false);
        }
    }, [paymentTermName, paymentTermPercentage]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (message) {
                setOpenPaymentTermModal(false);
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);


    const handleUpdate = async () => {
        let term = {
            _id: paymentTerm._id,
            name: paymentTermName,
            percentage: paymentTermPercentage
        }
        console.log(term);
        if (paymentTermName && paymentTermPercentage) {
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/payment-term/update-payment-term/${term._id}`, term
                ).then((res) => {
                    console.log(res.data);
                    setMessage(res.data.message);
                    setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                    setMessage(err.message);
                });
                setErrors([]);
            } catch (error) {
                setMessage('Error while updating payment term');
            }
        } else {
            const newErrors = [];
            if (!paymentTermName) {
                newErrors.push('Payment Term Name is required');
            }
            if (!paymentTermPercentage) {
                newErrors.push('Payment Term Percentage is required');
            }
            setErrors(newErrors);
        }
    };

    if (!openPaymentTermModal) return null;
    return (
        <div className="payment__term__modal" onClick={() => setOpenPaymentTermModal(false)}>
            <div className="payment__term__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='payment__term__modal__screen__clip'></div>
                <div className="payment__term__modal__screen__container">
                    <div className="payment__term__modal__close__button" onClick={() => setOpenPaymentTermModal(false)}><AiOutlineClose /></div>
                    <div className="payment__term__modal__screen__content">
                        <div className='payment__term__modal__screen__content__top'>
                            <div className='payment__term__modal__screen__content__heading'>Update Payment Term</div>
                        </div>
                        <div className="payment__term__modal__screen__content__bottom">
                            <div className="payment__term__modal__screen__content__bottom__input">
                                <div className='payment__term__modal__screen__content__bottom__input__label'>Payment Term Name*: </div>
                                <input
                                    className='payment__term__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Payment Term Name"
                                    value={paymentTermName}
                                    onChange={e => setPaymentTermName(e.target.value)}
                                />
                            </div>
                            <div className="payment__term__modal__screen__content__bottom__input">
                                <div className='payment__term__modal__screen__content__bottom__input__label'>Payment Term Percentage*: </div>
                                <input
                                    className='payment__term__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Payment Term Percentage (include %)"
                                    value={paymentTermPercentage}
                                    onChange={e => setPaymentTermPercentage(e.target.value)}
                                />
                            </div>
                            <div className="payment__term__modal__error__message">
                                {/* {errors.map((error, index) => ( */}
                                <div>{errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}</div>
                                {/* ))} */}
                            </div>
                            <div className={canUpdate ? "payment__term__modal__submit-button" : "payment__term__modal__submit-button__disabled"} disabled={!canUpdate} onClick={canUpdate ? handleUpdate : null}>
                                Update Payment Term
                            </div>
                            <p className="payment__term__modal__message">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentTermModal