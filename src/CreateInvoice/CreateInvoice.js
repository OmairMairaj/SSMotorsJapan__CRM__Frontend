import React, { useState } from 'react'
import './CreateInvoice.css'
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import html2pdf from 'html2pdf.js';
import { Document, Page, pdfjs } from 'react-pdf';
import "pdfjs-dist/build/pdf.worker.entry";
import axios from 'axios';
import PDFPreviewDialog from '../PDFPreviewDialog/PDFPreviewDialog';
axios.defaults.withCredentials = true

function CreateInvoice() {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [clientType, setClientType] = useState('individual');
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState('---Select Customer---');
    const [hasConignee, setHasConignee] = React.useState(false);
    const [consignee, setConsignee] = React.useState('');
    const [selectedAccount, setSelectedAccount] = React.useState({
        accountName: '',
        accountNumber: '',
        bankName: '',
        branchName: '',
        swiftCode: '',
        branchAddress: '',
    });
    const [paymentTerm, setPaymentTerm] = React.useState('---Payment Term---');
    // const [bankAccount, setBankAccount] = React.useState('---Bank Account---');
    const [tradeTerm, setTradeTerm] = React.useState('');
    const [portDischarging, setPortDischarging] = React.useState('');
    const [paymentTermsList, setPaymentTermsList] = React.useState([]);
    const [bankAccountsList, setBankAccountsList] = React.useState([]);
    const [customerList, setCustomerList] = React.useState([]);
    const [currenciesList, setCurrenciesList] = React.useState([]);
    // const [selectedCurrency, setSelectedCurrency] = React.useState('---Select Currency---');
    const [vehicles, setVehicles] = React.useState([{
        vehicleName: '',
        chassisNo: '',
        color: '',
        mileage: '',
        steering: '',
        mfg: '',
        fuel: '',
        engine: '',
        unitPrice: '',
        currency: ''
        // Add other vehicle details properties here
    }]);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});
    
    const [pdfBlob, setPdfBlob] = useState(null);

    const pdfViewerRef = React.useRef(null);

    React.useEffect(() => {
        // Convert the PDF blob to a URL when invoiceData changes
        if (invoiceData) {
            setPdfBlob(invoiceData);
        }
    }, [invoiceData]);


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
        fetchCustomerList();
        fetchCurrenciesList();
    }, [])

    const fetchCustomerList = async () => {
        console.log(User);
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/customer/get-customers');
            setCustomerList(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    };

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

    const fetchCurrenciesList = async () => {
        console.log(User);
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/currency/getAll');
            setCurrenciesList(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching currencies', error);
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
    }

    // const handleChangeCurrency = event => {
    //     console.log(event.target.value);
    //     setSelectedCurrency(event.target.value);
    // };

    const handleChangeCustomer = event => {
        console.log(event.target.value);
        customerList.map((item, index) => {
            if (item.fullname === event.target.value) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const invoice = {
            agentName: User.fullname,
            date: new Date().toJSON().slice(0, 10),
            customerName: selectedCustomer.fullname,
            hasConignee: hasConignee,
            consignee: consignee,
            address: selectedCustomer.address,
            tel: selectedCustomer.contact,
            email: selectedCustomer.email,
            bankAccount: selectedAccount,
            paymentTerm: paymentTerm,
            tradeTerm: tradeTerm,
            loadingPort: "ANY PORT IN JAPAN, Japan",
            dischargingPort: portDischarging,
            vehicles: vehicles
        }
        console.log(invoice);
        generatePDF();
    }

    React.useEffect(() => {
        console.log(vehicles)
    }, [vehicles])

    // Function to handle adding a new vehicle
    const addVehicle = () => {
        setVehicles([...vehicles, {}]);
    };

    // Function to handle removing a vehicle
    const removeVehicle = (index) => {
        const updatedVehicles = [...vehicles];
        updatedVehicles.splice(index, 1);
        setVehicles(updatedVehicles);
    };

    // Function to handle changes in vehicle fields
    const handleVehicleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedVehicles = [...vehicles];
        updatedVehicles[index][name] = value;
        console.log(updatedVehicles)
        setVehicles(updatedVehicles);
    };


    const generatePDF = () => {
        const element = document.getElementById('form');
        html2pdf()
            .from(element)
            .outputPdf()
            .then((pdf) => {
                // Set the PDF blob
                setPdfBlob(pdf);
                setShowPdfPreview(true);
            });
    };

    const handleSaveAndFinish = async () => {
        try {
            // Call the API to create a new invoice here
            // ...

            // Close the PDF preview dialog
            setShowPdfPreview(false);

            // Reset your form or perform any other necessary actions
            // ...
        } catch (error) {
            // Handle API error
            console.error('Error creating invoice:', error);
        }
    };

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
                                        <select required name="dealer__name" placeholder='---Select Customer---' value={selectedCustomer.fullname} onChange={handleChangeCustomer}>
                                            <option value="" selected hidden>---Select Customer---</option>
                                            {customerList.map((item, index) => {
                                                return (
                                                    <option key={item.fullname} value={item.fullname}>{item.fullname}</option>
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
                                            disabled
                                            value={selectedCustomer ? selectedCustomer.contact : ''}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Email: <span>*</span></label>
                                        <input required
                                            type="email"
                                            name="email"
                                            placeholder='Customer Email'
                                            disabled
                                            value={selectedCustomer ? selectedCustomer.email : ''}
                                        />
                                    </div>
                                </div>
                                <div className='create__invoice__container__form__payment__shipping__info'>
                                    <label className='create__invoice__container__form__section__label'>Payment and Shipping</label>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Bank Account: <span>*</span></label>
                                        <select required name='bankAccount' placeholder='---Bank Account---' value={selectedAccount.accountName} onChange={handleChangeAccount}>
                                            <option value="" selected hidden>---Bank Account---</option>
                                            {bankAccountsList.map((item) => {
                                                return (
                                                    <option key={item.accountName} value={item.accountName}>{item.accountName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Payment Terms: <span>*</span></label>
                                        <select required name='paymentTerm' placeholder='---Payment Term---' value={paymentTerm} onChange={changePaymentTerm}>
                                            <option value="" selected hidden>---Payment Term---</option>
                                            {paymentTermsList.map((item) => {
                                                return (
                                                    <option key={item.percentage} value={item.percentage}>{item.percentage}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Trade Terms: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="trade__term"
                                            placeholder='Enter Trade Terms'
                                            value={tradeTerm}
                                            onChange={(e) => setTradeTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Port of Loading: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="port__loading"
                                            disabled
                                            value={"ANY PORT IN JAPAN, Japan"}
                                        />
                                    </div>
                                    <div className='create__invoice__container__form__group'>
                                        <label>Port of Discharging: <span>*</span></label>
                                        <input required
                                            type="text"
                                            name="port__discharging"
                                            placeholder='Enter Port of Discharging'
                                            value={portDischarging}
                                            onChange={(e) => setPortDischarging(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='create__invoice__container__form__sections'>
                                <div className='create__invoice__container__form__vehicle__details'>
                                    <label className='create__invoice__container__form__section__label'>Vehicle Details</label>
                                    {vehicles.map((vehicle, index) => (
                                        <div key={index} className='create__invoice__container__form__vehicle'>
                                            <div className='create__invoice__container__form__vehicle__heading'>{`Vehicle No ${index + 1}`}</div>
                                            <div className='create__invoice__container__form__column'>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Vehicle Name: <span>*</span></label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder='Enter Vehicle Name'
                                                        name={`vehicleName`}
                                                        value={vehicle.vehicleName}
                                                        onChange={(e) => handleVehicleChange(e, index)}
                                                    />
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Chassis No: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        placeholder='Enter Chassis No'
                                                        name={`chassisNo`}
                                                        value={vehicle.chassisNo}
                                                        onChange={(e) => handleVehicleChange(e, index)}
                                                    />
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Color: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        name="color"
                                                        placeholder='Enter Vehicle Color'
                                                        value={vehicle.color}
                                                        onChange={(e) => handleVehicleChange(e, index)}
                                                    />
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Mileage: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        name="mileage"
                                                        placeholder='Enter Vehicle Mileage'
                                                        value={vehicle.mileage}
                                                        onChange={(e) => handleVehicleChange(e, index)}
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
                                                        value={vehicle.steering}
                                                        onChange={(e) => handleVehicleChange(e, index)}

                                                    />
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Mfg. Year/Month: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        name="mfg"
                                                        placeholder='Enter Mfg. Year/Month'
                                                        value={vehicle.mfg}
                                                        onChange={(e) => handleVehicleChange(e, index)}

                                                    />
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Fuel: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        name="fuel"
                                                        placeholder='Enter Fuel Type'
                                                        value={vehicle.fuel}
                                                        onChange={(e) => handleVehicleChange(e, index)}

                                                    />
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Engine CC: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        name="engine"
                                                        placeholder='Enter Engince CC'
                                                        value={vehicle.engine}
                                                        onChange={(e) => handleVehicleChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='create__invoice__container__form__column' style={{ width: '22%' }}>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Currency: <span>*</span></label>
                                                    <select required placeholder="---Select Currency---" value={vehicle.selectedCurrency}
                                                        onChange={(e) => handleVehicleChange(e, index)} name="currency"
                                                    >
                                                        <option value="" selected hidden>---Select Currency---</option>
                                                        {currenciesList.map((item) => {
                                                            return (
                                                                <option value={item.symbol}>{`${item.code} - (${item.symbol})`}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className='create__invoice__container__form__group2'>
                                                    <label>Unit Price: <span>*</span></label>
                                                    <input required
                                                        type="text"
                                                        name="unitPrice"
                                                        placeholder='Enter Unit Price'
                                                        value={vehicle.unitPrice}
                                                        onChange={(e) => handleVehicleChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='create__invoice__container__form__vehicle__remove'>
                                                <button type="button" onClick={() => removeVehicle(index)}>Remove Vehicle</button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='create__invoice__container__form__vehicle__add'>
                                        <button type="button" onClick={addVehicle}>Add Vehicle</button>
                                    </div>
                                </div>
                            </div>
                            <div className='create__invoice__container__form__group'>
                                <button type="submit">Register New Customer</button>
                            </div>
                        </form>
                    </div>
                    {showPdfPreview && (
                        <PDFPreviewDialog
                            pdfBlob={pdfBlob}
                            handleSaveAndFinish={handleSaveAndFinish}
                            onClose={() => setShowPdfPreview(false)}
                        />
                    )}
                </div>
                <Footer />
            </div>
        </div >
    )
}

export default CreateInvoice
