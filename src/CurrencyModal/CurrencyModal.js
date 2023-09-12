import React from 'react'
import './CurrencyModal.css'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa';
axios.defaults.withCredentials = true

function CurrencyModal({ currency, openCurrencyModal, setOpenCurrencyModal, refresh, setRefresh }) {

    const [currencyName, setCurrencyName] = React.useState(currency.name);
    const [currencyCode, setCurrencyCode] = React.useState(currency.code);
    const [currencySymbol, setCurrencySymbol] = React.useState(currency.symbol);
    const [canUpdate, setCanUpdate] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);


    React.useEffect(() => {
        let data = {
            currencyName: currencyName,
            currencyCode: currencyCode,
            currencySymbol: currencySymbol,
        }
        console.log(data)
        if (data.currencyName !== currency.name || data.currencyCode !== currency.code || data.currencySymbol !== currency.symbol) {
            setCanUpdate(true);
        } else {
            setCanUpdate(false);
        }
    }, [currencyName, currencyCode, currencySymbol]);


    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (message) {
                setOpenCurrencyModal(false);
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);


    const handleUpdate = async () => {
        let data = {
            _id: currency._id,
            name: currencyName,
            code: currencyCode,
            symbol: currencySymbol
        }
        if (currencyName && currencyCode && currencySymbol) {
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/currency/update-currency/${data._id}`, data
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
                setMessage('Error creating currency');
            }
        } else {
            const newErrors = [];

            if (!currencyName) {
                newErrors.push('Currency name is required');
            }
            if (!currencyCode) {
                newErrors.push('Currency code is required');
            }
            if (!currencySymbol) {
                newErrors.push('Currency symbol is required');
            }
            setErrors(newErrors);
        }
    };

    if (!openCurrencyModal) return null;
    return (
        <div className="currency__modal" onClick={() => setOpenCurrencyModal(false)}>
            <div className="currency__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='currency__modal__screen__clip'></div>
                <div className="currency__modal__screen__container">
                    <div className="currency__modal__close__button" onClick={() => setOpenCurrencyModal(false)}><AiOutlineClose /></div>
                    <div className="currency__modal__screen__content">
                        <div className='currency__modal__screen__content__top'>
                            {/* <FaUserPlus style={{ color: '#153e4d' }} size={40} /> */}
                            <div className='currency__modal__screen__content__heading'>Update Currency</div>
                        </div>
                        <div className="currency__modal__screen__content__bottom">
                            {/* <h2>Add currency</h2> */}
                            <div className="currency__modal__screen__content__bottom__input">
                                <div className='currency__modal__screen__content__bottom__input__label'>Currency Name*: </div>
                                <input
                                    className='currency__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Currency Name"
                                    value={currencyName}
                                    onChange={e => setCurrencyName(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="currency__modal__screen__content__bottom__input">
                                <div className='currency__modal__screen__content__bottom__input__label'>Currency Code*: </div>
                                <input
                                    className='currency__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Currency Code"
                                    value={currencyCode}
                                    onChange={e => setCurrencyCode(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>
                            <div className="currency__modal__screen__content__bottom__input">
                                <div className='currency__modal__screen__content__bottom__input__label'>Currency Symbol*: </div>
                                <input
                                    className='currency__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Currency Symbol"
                                    value={currencySymbol}
                                    onChange={e => setCurrencySymbol(e.target.value)}
                                // onBlur={checkDuplicatecurrency}
                                />
                            </div>

                            <div className="currency__modal__error__message">
                                {/* {errors.map((error, index) => ( */}
                                    <div>{errors.length > 0 ? <FaExclamationCircle style={{marginRight: '5px'}} />: null}{errors[0]}</div>
                                {/* ))} */}
                            </div>
                            <div className={canUpdate ? "currency__modal__submit-button" : "currency__modal__submit-button__disabled"} disabled={!canUpdate} onClick={canUpdate ? handleUpdate : null}>
                                Update Currency
                            </div>
                            <p className="currency__modal__message">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrencyModal