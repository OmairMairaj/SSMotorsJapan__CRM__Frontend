import React, { useState } from 'react'
import './CreateInvoice.css'
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import customerList from '../data/Customer.json';
import bankAccounts from '../data/BankAccounts.json';
import axios from 'axios';
axios.defaults.withCredentials = true

function CreateInvoice() {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [clientType, setClientType] = useState('individual');
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState({});
    const [hasConignee, setHasConignee] = React.useState(false);
    const [consignee, setConsignee] = React.useState('');
    const [selectedAccount, setSelectedAccount] = React.useState({});
    const [paymentTerm, setPaymentTerm] = React.useState('---Payment Term---');
    const [bankAccount, setBankAccount] = React.useState('---Bank Account---');
    const [tradeTerm, setTradeTerm] = React.useState('');
    const [portDischarging, setPortDischarging] = React.useState('');
    const [vehicles, setVehicles] = React.useState([]);
    const [paymentTermsList, setPaymentTermsList] = React.useState([]);
    const [bankAccountsList, setBankAccountsList] = React.useState([]);


    const wrapperRef = React.useRef(null);
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenSidebar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    React.useEffect(() => {
        fetchPaymentTermsList();
        fetchBankAccountsList();
        
    }, [])

    const fetchPaymentTermsList = async () => {
        console.log(User);
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/payment-term/getAll');
            setPaymentTermsList(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching payment terms', error);
        }
    };

    const fetchBankAccountsList = async () => {
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/bank-account/getAll');
            setBankAccountsList(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching accounts', error);
        }
    };

    const changePaymentTerm = (event) => {
        setPaymentTerm(event.target.value);
        // setCities(countriesList.find(ctr => ctr.name === event.target.value).cities)
    }
    // const changeBankAccount = (event) => {
    //     setBankAccount(event.target.value);
    //     // setCities(countriesList.find(ctr => ctr.name === event.target.value).cities)
    // }

    const handleChangeCustomer = event => {
        console.log(event.target.value);
        customerList.map((item, index) => {
            if (item.fullName === event.target.value) {
                setSelectedCustomer(item);
            }
        })
    };


    const handleChangeAccount = event => {
        console.log(event.target.value);
        bankAccountsList.map((item, index) => {
            if (item.accountName === event.target.value) {
                setSelectedAccount(item);
            }
        })
    };

    // const getBankDetails = () => {
    //     const details = {
    //         "Bank Name": selectedAccount.bankName,
    //         "Branch Name": selectedAccount.branchName,
    //         "Account Name": selectedAccount.accountName,
    //         "Account Number": selectedAccount.accountNumber,
    //         "Swift Code": selectedAccount.swiftCode,
    //         "Branch Address": selectedAccount.branchAddress
    //     }
    //     return JSON.stringify(details).toString();
    // }


    const handleSubmit = (e) => {
        e.preventDefault();
        const invoice = {
            invoice_id: "P-01001",
            agentName: User.fullname,
            date: new Date().toJSON().slice(0, 10),
            dealerName: selectedCustomer.fullName,
            hasConignee: hasConignee,
            consignee: consignee,
            address: selectedCustomer.address,
            tel: selectedCustomer.contactNo,
            email: selectedCustomer.email,
            bankName: selectedAccount.bankName,
            branchName: selectedAccount.branchName,
            accountName: selectedAccount.accountName,
            accountNumber: selectedAccount.accountNumber,
            swiftCode: selectedAccount.swiftCode,
            branchAddress: selectedAccount.branchAddress,
            paymentTerm: paymentTerm,
            tradeTerm: tradeTerm,
            loadingPort: "ANY PORT IN JAPAN, Japan",
            dischargingPort: portDischarging
        }

        console.log(invoice);
    }



    return (
        <div className='create__invoice'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar} />
            <div className='create__invoice__container' style={{ width: openSidebar ? '90%' : null }}>
                <Topbar openSidebar={openSidebar} />
                <div className='create__invoice__container__content'>
                    <div className='create__invoice__container__content__heading'>CREATE NEW INVOICE</div>
                    <div className='create__invoice__container__content__edit__info'>
                        <form id="form" className='create__invoice__container__form' onSubmit={handleSubmit}>
                            <div className='create__invoice__container__form__sections'>
                                <div className='create__invoice__container__form__dealer__info'>
                                    <label className='create__invoice__container__form__section__label'>Dealer Information</label>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Dealer Name: <span>*</span></label>
                                        <select required name="dealer__name" placeholder='Select Customer' value={selectedCustomer.fullName} onChange={handleChangeCustomer}>
                                            <option value="" selected hidden>Select Customer</option>
                                            {customerList.map((item, index) => {
                                                return (
                                                    <option key={item.fullName} value={item.fullName}>{item.fullName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Consignee: <span style={{ display: !hasConignee ? 'none' : null }}>*</span></label>
                                        <input
                                            type='checkbox'
                                            name='hasConsignee'
                                            value={hasConignee}
                                            // checked={false} 
                                            onChange={(e) => setHasConignee(!hasConignee)}
                                        />
                                        <input style={{ width: '80%' }}
                                            required={hasConignee ? true : false}
                                            disabled={hasConignee ? false : true}
                                            type='text'
                                            name='consignee'
                                            placeholder='Enter Consignee Name'
                                            value={consignee}
                                            onChange={(e) => setConsignee(e.target.value)}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Address: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="address"
                                            // id="date"
                                            placeholder='Customer Address'
                                            disabled
                                            value={selectedCustomer ? selectedCustomer.address : ''}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>TEL: <span>*</span></label>
                                        <input required
                                            type="phone"
                                            name="phone"
                                            placeholder='Customer Contact No'
                                            // id="date"
                                            disabled
                                            value={selectedCustomer ? selectedCustomer.contactNo : ''}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Email: <span>*</span></label>
                                        <input required
                                            type="email"
                                            name="email"
                                            placeholder='Customer Email'
                                            // id="date"
                                            disabled
                                            value={selectedCustomer ? selectedCustomer.email : ''}
                                        />
                                    </div>
                                </div>
                                <div className='create__invoice__container__form__payment__shipping__info'>
                                    <label className='create__invoice__container__form__section__label'>Payment and Shipping</label>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Bank Account: <span>*</span></label>
                                        {/* <select required name="bank__account" placeholder='Select Bank Account' value={selectedAccount.accountName} onChange={handleChangeAccount}>
                                            <option value="" selected hidden>Select Bank Account</option>
                                            {bankAccounts.map((item, index) => {
                                                return (
                                                    <option key={item.accountName} value={item.accountName}>{item.accountName}</option>
                                                )
                                            })}
                                        </select> */}
                                        <select required value={selectedAccount.accountName} onChange={handleChangeAccount}>
                                            <option hidden>---Bank Account---</option>
                                            {/* {console.log(cities)} */}
                                            {bankAccountsList.map((item) => {
                                                return (
                                                    <option value={item.accountName}>{item.accountName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    {/* <div className='create__invoice__container__form__group' style={{ height: '110px' }}>
                                        <label>Bank Details: <span>*</span></label>
                                        <textarea
                                            type='text'
                                            name='bank__details'
                                            value={getBankDetails()}
                                            disabled
                                        />
                                    </div> */}
                                    <div className='create__invoice__container__form__group'>
                                        <label>Payment Terms: <span>*</span></label>
                                        {/* <select required name="payment__terms" placeholder='Select Payment Term' value={paymentTerm} onChange={(e) => setPaymentTerm(e.target.value)}>
                                            <option value="" selected hidden>Select Payment Term</option>
                                            <option value='30%'>30%</option>
                                            <option value='50%'>50%</option>
                                            <option value='70%'>70%</option>
                                            <option value='100%'>100%</option>
                                        </select> */}
                                        <select required value={paymentTerm} onChange={changePaymentTerm}>
                                            <option hidden>---Payment Term---</option>
                                            {/* {console.log(cities)} */}
                                            {paymentTermsList.map((item) => {
                                                return (
                                                    <option value={item.percentage}>{item.percentage}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Trade Terms: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="trade__term"
                                            // id="date"
                                            placeholder='Enter Trade Terms'
                                            // disabled
                                            value={tradeTerm}
                                            onChange={(e) => setTradeTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Port of Loading: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="port__loading"
                                            // id="date"
                                            disabled
                                            value={"ANY PORT IN JAPAN, Japan"}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Port of Discharging: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="port__discharging"
                                            // id="date"
                                            placeholder='Enter Port of Discharging'
                                            // disabled
                                            value={portDischarging}
                                            onChange={(e) => setPortDischarging(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='create__invoice__container__form__sections'>
                                <div className='create__invoice__container__form__vehicle__details'>
                                    <label className='create__invoice__container__form__section__label'>Vehicle Details</label>
                                    <div className='create__invoice__container__form__column'>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Vehicle Name: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="vehicle__name"
                                                placeholder='Enter Vehicle Name'
                                            // id="date"
                                            // disabled
                                            // value={tradeTerm}
                                            // onChange={(e) => setTradeTerm(e.target.value)}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Chassis No: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="chassis__no"
                                                placeholder='Enter Chassis No'
                                            // id="date"
                                            // disabled
                                            // value={"ANY PORT IN JAPAN, Japan"}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Color: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="color"
                                                placeholder='Enter Vehicle Color'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Mileage: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="mileage"
                                                placeholder='Enter Vehicle Mileage'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='create__invoice__container__form__column'>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Steering: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="steering"
                                                placeholder='Enter Vehicle Steering'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Mfg. Year/Month: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="mfg"
                                                placeholder='Enter Mfg. Year/Month'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Fuel: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="fuel"
                                                placeholder='Enter Fuel Type'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Engine CC: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="engine"
                                                placeholder='Enter Engince CC'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='create__invoice__container__form__column' style={{ width: '22%' }}>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Unit Price: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="unit__price"
                                                placeholder='Enter Unit Price'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                        <div className='create__invoice__container__form__group2'>
                                            <label>Quantity: <span>*</span></label>
                                            <input required
                                                type="text"
                                                name="quantity"
                                                placeholder='Enter Quantity'
                                            // id="date"
                                            // disabled
                                            // value={portDischarging}
                                            // onChange={(e) => setPortDischarging(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='create__invoice__container__form__group'>
                                <button type="submit">Register New Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CreateInvoice
