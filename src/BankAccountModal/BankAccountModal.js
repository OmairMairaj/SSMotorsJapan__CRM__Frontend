import React, { useState } from 'react'
import './BankAccountModal.css'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa';
axios.defaults.withCredentials = true

function BankAccountModal({ bankData, openBankModal, setOpenBankModal, refresh, setRefresh }) {

    const [bankName, setBankName] = useState(bankData.bankName);
    const [branchName, setBranchName] = useState(bankData.branchName);
    const [accountName, setAccountName] = useState(bankData.accountName);
    const [accountNumber, setAccountNumber] = useState(bankData.accountNumber);
    const [swiftCode, setSwiftCode] = useState(bankData.swiftCode);
    const [branchAddress, setBranchAddress] = useState(bankData.branchAddress);
    const [canUpdate, setCanUpdate] = useState(false);
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    React.useEffect(() => {
        let data = {
            bankName: bankName,
            branchName: branchName,
            accountName: accountName,
            accountNumber: accountNumber,
            swiftCode: swiftCode,
            branchAddress: branchAddress,
        }
        if (data.bankName !== bankData.bankName || data.branchName !== bankData.branchName || data.accountName !== bankData.accountName || data.accountNumber !== bankData.accountNumber || data.swiftCode !== bankData.swiftCode || data.branchAddress !== bankData.branchAddress) {
            setCanUpdate(true);
        } else {
            setCanUpdate(false);
        }
    }, [bankName, branchName, accountName, accountNumber, swiftCode, branchAddress]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (message) {
                setOpenBankModal(false);
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);


    const handleUpdate = async () => {
        let account = {
            _id: bankData._id,
            bankName: bankName,
            branchName: branchName,
            accountName: accountName,
            accountNumber: accountNumber,
            swiftCode: swiftCode,
            branchAddress: branchAddress,
        }
        if (bankName && branchName && accountName && accountNumber && swiftCode && branchAddress) {
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/bank-account/update-account/${account._id}`, account
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
                setMessage('Error while updating bank account');
            }
        } else {
            const newErrors = [];
            if (!bankName) {
                newErrors.push('Bank name is required');
            }
            if (!branchName) {
                newErrors.push('Branch name is required');
            }
            if (!accountName) {
                newErrors.push('Account name is required');
            }
            if (!accountNumber) {
                newErrors.push('Account number is required');
            }
            if (!swiftCode) {
                newErrors.push('Swift code is required');
            }
            if (!branchAddress) {
                newErrors.push('Branch address is required');
            }
            setErrors(newErrors);
        }
    };

    if (!openBankModal) return null;
    return (
        <div className="bank__modal" onClick={() => setOpenBankModal(false)}>
            <div className="bank__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='bank__modal__screen__clip'></div>
                <div className="bank__modal__screen__container">
                    <div className="bank__modal__close__button" onClick={() => setOpenBankModal(false)}><AiOutlineClose /></div>
                    <div className="bank__modal__screen__content">
                        <div className='bank__modal__screen__content__top'>
                            <div className='bank__modal__screen__content__heading'>Update Bank Account</div>
                        </div>
                        <div className="bank__modal__screen__content__bottom">
                            <div className="bank__modal__screen__content__bottom__input">
                                <div className='bank__modal__screen__content__bottom__input__label'>Bank Name*: </div>
                                <input
                                    className='bank__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Bank Name"
                                    value={bankName}
                                    onChange={e => setBankName(e.target.value)}
                                />
                            </div>
                            <div className="bank__modal__screen__content__bottom__input">
                                <div className='bank__modal__screen__content__bottom__input__label'>Branch Name*: </div>
                                <input
                                    className='bank__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Branch Name"
                                    value={branchName}
                                    onChange={e => setBranchName(e.target.value)}
                                />
                            </div>
                            <div className="bank__modal__screen__content__bottom__input">
                                <div className='bank__modal__screen__content__bottom__input__label'>Account Name*: </div>
                                <input
                                    className='bank__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Account Name"
                                    value={accountName}
                                    onChange={e => setAccountName(e.target.value)}
                                />
                            </div>
                            <div className="bank__modal__screen__content__bottom__input">
                                <div className='bank__modal__screen__content__bottom__input__label'>Account Number*: </div>
                                <input
                                    className='bank__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Account Number"
                                    value={accountNumber}
                                    onChange={e => setAccountNumber(e.target.value)}
                                />
                            </div>
                            <div className="bank__modal__screen__content__bottom__input">
                                <div className='bank__modal__screen__content__bottom__input__label'>Swift Code*: </div>
                                <input
                                    className='bank__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Swift Code"
                                    value={swiftCode}
                                    onChange={e => setSwiftCode(e.target.value)}
                                />
                            </div>
                            <div className="bank__modal__screen__content__bottom__input">
                                <div className='bank__modal__screen__content__bottom__input__label'>Branch Address*: </div>
                                <input
                                    className='bank__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Enter Branch Address"
                                    value={branchAddress}
                                    onChange={e => setBranchAddress(e.target.value)}
                                />
                            </div>
                            <div className="bank__modal__error__message">
                                {/* {errors.map((error, index) => ( */}
                                <div>{errors.length > 0 ? <FaExclamationCircle style={{marginRight: '5px'}} />: null}{errors[0]}</div>
                                {/* ))} */}
                            </div>
                            <div className={canUpdate ? "bank__submit-button" : "bank__submit-button__disabled"} disabled={!canUpdate} onClick={canUpdate ? handleUpdate : null} >
                                Update Account
                            </div>
                            <p className="bank__message">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankAccountModal