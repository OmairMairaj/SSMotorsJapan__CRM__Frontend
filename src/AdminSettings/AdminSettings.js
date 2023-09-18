import React from 'react'
import { ReactSortable } from "react-sortablejs";
import './AdminSettings.css'
import Sidebar from '../components/Sidebar/Sidebar';
import { FaBars, FaEdit, FaPlusCircle, FaSort, FaTrash } from 'react-icons/fa';
import Topbar from '../components/Topbar/Topbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import BankAccountModal from '../BankAccountModal/BankAccountModal';
import PaymentTermModal from '../PaymentTermModal/PaymentTermModal';
import CountryModal from '../CountryModal/CountryModal';
import CurrencyModal from '../CurrencyModal/CurrencyModal';
import CreateCountryModal from '../CreateCountryModal/CreateCountryModal';
import CreateCurrencyModal from '../CreateCurrencyModal/CreateCurrencyModal';
import CreatePaymentTermModal from '../CreatePaymentTermModal/CreatePaymentTermModal';
import CreateBankAccountModal from '../CreateBankAccountModal/CreateBankAccountModal';
import Modal from 'react-modal';
import axios from 'axios';
axios.defaults.withCredentials = true

function AdminSettings() {
    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const hasWindow = typeof window !== "undefined";
    const [refresh, setRefresh] = React.useState(false);
    const [oldBankIndex, setOldBankIndex] = React.useState(null);
    const [newBankIndex, setNewBankIndex] = React.useState(null);
    const [oldTermIndex, setOldTermIndex] = React.useState(null);
    const [newTermIndex, setNewTermIndex] = React.useState(null);
    const [countryName, setCountryName] = React.useState('');
    const [cityName, setCityName] = React.useState('');
    const [cities, setCities] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const [countriesList, setCountriesList] = React.useState([]);
    const [currenciesList, setCurrenciesList] = React.useState([]);
    const [paymentTermsList, setPaymentTermsList] = React.useState([]);
    const [paymentTermsListFiltered, setPaymentTermsListFiltered] = React.useState(paymentTermsList);
    const [paymentTermsListSorted, setPaymentTermsListSorted] = React.useState(paymentTermsList);
    const [bankAccountsList, setBankAccountsList] = React.useState([]);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [selectedCountryId, setSelectedCountryId] = React.useState(null);
    const [selectedCountryName, setSelectedCountryName] = React.useState(null);
    const [selectedCountryCities, setSelectedCountryCities] = React.useState(null);
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState(false);
    const [openCreateCountryModal, setOpenCreateCountryModal] = React.useState(false);
    const [country, setCountry] = React.useState({});
    const [openCountryModal, setOpenCountryModal] = React.useState(false);
    const [openCreateCurrencyModal, setOpenCreateCurrencyModal] = React.useState(false);
    const [currency, setCurrency] = React.useState({});
    const [openCurrencyModal, setOpenCurrencyModal] = React.useState(false);
    const [openCreatePaymentTermModal, setOpenCreatePaymentTermModal] = React.useState(false);
    const [paymentTerm, setPaymentTerm] = React.useState({});
    const [openPaymentTermModal, setOpenPaymentTermModal] = React.useState(false);
    const [openCreateBankAccountModal, setOpenCreateBankAccountModal] = React.useState(false);
    const [bankData, setBankData] = React.useState({});
    const [openBankModal, setOpenBankModal] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [confirm, setConfirm] = React.useState(false);
    const [deletionField, setDeletionField] = React.useState('');
    const [deletionID, setDeletionId] = React.useState('');
    const [searchBank, setSearchBank] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchCurrency, setSearchCurrency] = React.useState('');
    const [searchCountry, setSearchCountry] = React.useState('');
    const [countriesListFiltered, setCountriesListFiltered] = React.useState(countriesList);
    const [currenciesListFiltered, setCurrenciesListFiltered] = React.useState(currenciesList);
    const [bankAccountsListSorted, setBankAccountsListSorted] = React.useState(bankAccountsList);
    const [bankAccountsListFiltered, setBankAccountsListFiltered] = React.useState(bankAccountsList);
    const [isSorting, setIsSorting] = React.useState(false);
    const [windowDimensions, setWindowDimensions] = React.useState(
        getWindowDimensions()
    );

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        return {
            width,
        };
    }

    React.useEffect(() => {
        if (
            openCreateCountryModal || openCreateCurrencyModal || openCreatePaymentTermModal || openCreateBankAccountModal
            || openCurrencyModal || openPaymentTermModal || openBankModal || openCountryModal || openConfirmationModal
        ) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
            document.body.style.paddingRight = "15px";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.height = "unset";
            document.body.style.paddingRight = "unset";
        }
    }, [openCreateCountryModal, openCreateCurrencyModal, openCreatePaymentTermModal, openCreateBankAccountModal
        , openCurrencyModal, openPaymentTermModal, openBankModal || openCountryModal || openConfirmationModal]);

    React.useEffect(() => {
        fetchCountriesList();
        fetchCurrenciesList();
        fetchPaymentTermsList();
        fetchBankAccountsList();
    }, [refresh]);

    const fetchCountriesList = async () => {
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/country/getAll');
            setCountriesList(response.data.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchCurrenciesList = async () => {
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/currency/getAll');
            setCurrenciesList(response.data.data);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const fetchPaymentTermsList = async () => {
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/payment-term/getAll');
            setPaymentTermsList(response.data.data);
        } catch (error) {
            console.error('Error fetching payment terms', error);
        }
    };

    const fetchBankAccountsList = async () => {
        try {
            const response = await axios.get("" + process.env.REACT_APP_BACKEND_URL + 'api/bank-account/getAll');
            setBankAccountsList(response.data.data);
        } catch (error) {
            console.error('Error fetching accounts', error);
        }
    };

    React.useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    const handleCountrySearch = (e) => {

        if (countriesList) {
            const searchText = e.target.value.toLowerCase();
            setSearchCountry(searchText);

            const filteredRecords = [];
            countriesList.filter(record => {
                if (record.name.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else {
                    let exists = false;
                    record.cities.filter(city => {
                        if (city.name.toLowerCase().includes(searchText)) {
                            exists = true;
                        }
                    })
                    if (exists) {
                        filteredRecords.push(record);
                    }
                }
            }
            );
            console.log(filteredRecords)
            setCountriesListFiltered(filteredRecords);
        }
    };

    const handleUpdateCountry = (data) => {
        setCountry(data);
        setOpenCountryModal(true)
        // }
    }

    const handleDeleteCountry = async (countryId) => {
        try {
            const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/country/deleteCountry/${countryId}`);
            if (response.status === 200) {
                console.log('Country and its cities deleted successfully');
                fetchCountriesList();
                setDeletionField('');
                setConfirm(false);
                setDeletionId(''); // Refresh the countries list after deletion
            }
        } catch (error) {
            console.log('Error deleting country and its cities');
        }
    }

    const handleCurrencySearch = (e) => {

        if (currenciesList) {
            const searchText = e.target.value.toLowerCase();
            setSearchCurrency(searchText);

            const filteredRecords = currenciesList.filter(record =>
                record.name.toLowerCase().includes(searchText)
            );
            console.log(filteredRecords)
            setCurrenciesListFiltered(filteredRecords);
        }
    };

    const handleUpdateCurrency = (data) => {
        setCurrency(data);
        setOpenCurrencyModal(true)
        // }
    }

    const handleDeleteCurrency = async (currencyId) => {
        try {
            const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/currency/delete-currency/${currencyId}`);
            if (response.status === 200) {
                console.log('Currency deleted successfully');
                fetchCurrenciesList(); // Refresh the countries list after deletion
                setDeletionField('');
                setDeletionId('');
                setConfirm(false);
            }
        } catch (error) {
            console.log('Error deleting currency');
        }
    }

    const handleTermSearch = (e) => {

        if (paymentTermsList) {
            const searchText = e.target.value.toLowerCase();
            setSearchTerm(searchText);

            const filteredRecords = paymentTermsList.filter(record =>
                record.name.toLowerCase().includes(searchText)
            );
            console.log(filteredRecords)
            setPaymentTermsListFiltered(filteredRecords);
        }
    };

    const handleUpdatePaymentTerm = (data) => {
        setPaymentTerm(data);
        setOpenPaymentTermModal(true)
        // }
    }

    const handleDeletePaymentTerm = async (paymentTermId) => {
        try {
            const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/payment-term/delete-payment-term/${paymentTermId}`);
            if (response.status === 200) {
                console.log('Payment term deleted successfully');
                fetchPaymentTermsList(); // Refresh the countries list after deletion
                setDeletionField('');
                setDeletionId('');
                setConfirm(false);
            }
        } catch (error) {
            console.log('Error deleting payment term');
        }
    }

    React.useEffect(() => {
        setCountriesListFiltered(countriesList);
    }, [countriesList]);

    React.useEffect(() => {
        setCurrenciesListFiltered(currenciesList);
    }, [currenciesList]);

    React.useEffect(() => {
        setPaymentTermsListFiltered(paymentTermsList);
        setPaymentTermsListSorted(paymentTermsList);
        // console.log(paymentTermsList)
    }, [paymentTermsList]);

    React.useEffect(() => {
        setBankAccountsListFiltered(bankAccountsList);
        setBankAccountsListSorted(bankAccountsList);
        // console.log(bankAccountsList)
    }, [bankAccountsList]);

    const handleBankSearch = (e) => {

        if (bankAccountsList) {
            const searchText = e.target.value.toLowerCase();
            setSearchBank(searchText);

            const filteredRecords = bankAccountsList.filter(record =>
                record.accountName.toLowerCase().includes(searchText)
            );
            console.log(filteredRecords)
            setBankAccountsListFiltered(filteredRecords);
        }
    };

    const handleUpdateBankAccount = (data) => {
        setBankData(data);
        setOpenBankModal(true);
        // }
    }

    const handleDeleteBankAccount = async (bankAccountId) => {
        try {
            const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/bank-account/delete-account/${bankAccountId}`);
            if (response.status === 200) {
                console.log('Bank Account deleted successfully');
                fetchBankAccountsList(); // Refresh the countries list after deletion
                setDeletionField('');
                setDeletionId('');
                setConfirm(false);
            }
        } catch (error) {
            console.log('Error deleting account');
        }
    }


    const handleDelete = (field, id) => {
        setOpenConfirmationModal(true);
        setDeletionField(field);
        setDeletionId(id);
    }

    React.useEffect(() => {
        if (confirm) {
            if (deletionField === 'country') {
                handleDeleteCountry(deletionID);
            } else if (deletionField === 'currency') {
                handleDeleteCurrency(deletionID);
            } else if (deletionField === 'paymentTerm') {
                handleDeletePaymentTerm(deletionID);
            } else if (deletionField === 'bankAccount') {
                handleDeleteBankAccount(deletionID);
            }
        }
        setDeletionField('');
        setDeletionId('');
        setRefresh(!refresh);
    }, [confirm]);


    // const handleBankSortChange = (evt) => {
    // Update the UI with the new order
    // const order = e.map((item) => item);
    // const newBankIndex = evt.newBankIndex;
    // console.log(evt);
    // console.log("Z");
    // console.log(bankAccountsListSorted.splice(newBankIndex, 1));
    // console.log(bankAccountsListSorted);
    // console.log(order);
    // setBankAccountsListSorted(order);
    // setIsSorting(true);

    // Send the new order to the backend to update the database
    // }

    React.useEffect(() => {

        if (oldBankIndex !== null && newBankIndex !== null) {
            console.log(oldBankIndex)
            console.log(newBankIndex);
            // let item = bankAccountsListSorted.splice(oldBankIndex);
            // console.log(item);
            // console.log(bankAccountsListSorted)
            // bankAccountsListSorted.splice(newBankIndex, 0, item[0]);
            // console.log(bankAccountsListSorted);

            updateBankDatabaseOrder();

        }
        // console.log(newBankIndex)
    }, [oldBankIndex, newBankIndex])

    React.useEffect(() => {

        if (oldTermIndex !== null && newTermIndex !== null) {
            console.log(oldTermIndex)
            console.log(newTermIndex);
            // let item = TermAccountsListSorted.splice(oldTermIndex);
            // console.log(item);
            // console.log(TermAccountsListSorted)
            // TermAccountsListSorted.splice(newTermIndex, 0, item[0]);
            // console.log(TermAccountsListSorted);

            updateTermDatabaseOrder();

        }
        // console.log(newTermIndex)
    }, [oldTermIndex, newTermIndex])
    const updateTermDatabaseOrder = async () => {
        console.log("sorted");
        console.log(paymentTermsListSorted);
        try {
            await axios.post("" + process.env.REACT_APP_BACKEND_URL + 'api/payment-term/updateOrder', { order: paymentTermsListSorted })
                .then((res) => {
                    console.log(res.data);
                    // setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                });
            setIsSorting(false);
        } catch (error) {
            console.error('Error updating order:', error);
            setIsSorting(false);
        }
        console.log(paymentTermsList);
    };

    const updateBankDatabaseOrder = async () => {
        console.log("sorted");
        console.log(bankAccountsListSorted);
        try {
            await axios.post("" + process.env.REACT_APP_BACKEND_URL + 'api/bank-account/updateOrder', { order: bankAccountsListSorted })
                .then((res) => {
                    console.log(res.data);
                    // setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                });
            setIsSorting(false);
        } catch (error) {
            console.error('Error updating order:', error);
            setIsSorting(false);
        }
        console.log(bankAccountsList);
    };


    return (
        <div className='admin__settings'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar}
            />
            <div className='admin__settings__container' style={{ width: openSidebar ? '90%' : null }}>
                <ul class="bg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    {/* Add other <li> elements here */}
                </ul>
                <Topbar openSidebar={openSidebar} />
                <div className='admin__settings__container__section'>
                    <div className='admin__settings__container__section__heading'>SETTINGS</div>
                    <div className='admin__settings__container__content'>
                        <div className='admin__settings__container__content__countries'>
                            <div className='admin__settings__container__content__countries__heading'>Countries and Cities:</div>
                            <div className='admin__settings__container__content__countries__create__button'>
                                <button className='admin__settings__container__content__countries__create__button__btn' onClick={() => setOpenCreateCountryModal(true)} ><FaPlusCircle /><span style={{ marginLeft: '5px' }}>Create New Country</span></button>
                            </div>
                            <div className='admin__settings__container__content__countries__filter'>
                                <div className='admin__settings__container__content__countries__filter__search'>
                                    <input type='text' placeholder='Search by Country Name or City Name' value={searchCountry} onChange={handleCountrySearch} />
                                </div>
                                {searchCountry && countriesListFiltered ?
                                    <div className='admin__settings__container__content__countries__filter__records__found'>Showing Records: {countriesListFiltered.length}/{countriesList.length}</div>
                                    :
                                    <div className='admin__settings__container__content__countries__filter__records__found'>Total Records Found: {countriesList.length}</div>
                                }
                                {/* <div className='admin__settings__container__content__countries__filter__records__found'>Total Records Found: {countriesList.length}</div> */}
                            </div>
                            <div className='admin__settings__container__content__countries__table'>
                                <div className='admin__settings__container__content__countries__table__header'>
                                    <div className='admin__settings__container__content__countries__table__header__item' style={{ width: '15%' }}>Country</div>
                                    <div className='admin__settings__container__content__countries__table__header__item' style={{ width: '70%' }}>Cities</div>
                                    <div className='admin__settings__container__content__countries__table__header__item' style={{ width: '8%' }}>Edit</div>
                                    <div className='admin__settings__container__content__countries__table__header__item' style={{ width: '9%' }}>Delete</div>
                                </div>
                                <div className='admin__settings__container__content__countries__table__rows'>
                                    {countriesListFiltered ? countriesListFiltered.map((country, index) => (
                                        <div className='admin__settings__container__content__countries__table__row' key={index}>
                                            <div className='admin__settings__container__content__countries__table__row__item' style={{ width: '15%' }}>{country.name}</div>
                                            <div className='admin__settings__container__content__countries__table__row__item' style={{ width: '70%', alignItems: 'left', display: 'flex', flexWrap: 'wrap' }}>
                                                {country.cities.map((city, cityIndex) => (
                                                    <span style={{ marginRight: '5px' }} key={cityIndex}>{city.name}, </span>
                                                ))}
                                            </div>
                                            <div className='admin__settings__container__content__countries__table__row__item' style={{ width: '8%' }}>
                                                <button className='admin__settings__container__content__countries__table__button__btn' onClick={() => handleUpdateCountry(country)}>Edit</button>
                                            </div>
                                            <div className='admin__settings__container__content__countries__table__row__item' style={{ width: '8%' }}>
                                                <button className='admin__settings__container__content__countries__table__button__btn2' onClick={() => handleDelete('country', country._id)}>Delete</button>
                                            </div>
                                        </div>
                                    )) : null}
                                </div>
                            </div>
                        </div>
                        <div className='admin__settings__container__content__currencies__and__payment__terms'>
                            <div className='admin__settings__container__content__currencies'>
                                <div className='admin__settings__container__content__currencies__heading'>Currencies:</div>
                                <div className='admin__settings__container__content__currencies__create__button'>
                                    <button className='admin__settings__container__content__currencies__create__button__btn' onClick={() => setOpenCreateCurrencyModal(true)} ><FaPlusCircle /><span style={{ marginLeft: '5px' }}>Create New Currency</span></button>
                                </div>
                                <div className='admin__settings__container__content__currencies__filter'>
                                    <div className='admin__settings__container__content__currencies__filter__search'>
                                        <input type='text' placeholder='Search by Currency Name' value={searchCurrency} onChange={handleCurrencySearch} />
                                    </div>
                                    {searchCurrency && currenciesListFiltered ?
                                        <div className='admin__settings__container__content__currencies__filter__records__found'>Showing Records: {currenciesListFiltered.length}/{currenciesList.length}</div>
                                        :
                                        <div className='admin__settings__container__content__currencies__filter__records__found'>Total Records Found: {currenciesList.length}</div>
                                    }
                                    {/* <div className='admin__settings__container__content__currencies__filter__records__found'>Total Records Found: {currenciesList.length}</div> */}
                                </div>
                                <div className='admin__settings__container__content__currencies__table'>
                                    <div className='admin__settings__container__content__currencies__table__header'>
                                        <div className='admin__settings__container__content__currencies__table__header__item' style={{ width: '35%' }}>Currency</div>
                                        <div className='admin__settings__container__content__currencies__table__header__item' style={{ width: '20%' }}>Code</div>
                                        <div className='admin__settings__container__content__currencies__table__header__item' style={{ width: '20%' }}>Symbol</div>
                                        <div className='admin__settings__container__content__currencies__table__header__item' style={{ width: '12%' }}>Edit</div>
                                        <div className='admin__settings__container__content__currencies__table__header__item' style={{ width: '13%' }}>Delete</div>
                                    </div>
                                    <div className='admin__settings__container__content__currencies__table__rows'>
                                        {currenciesListFiltered ? currenciesListFiltered.map((currency, index) => (
                                            <div className='admin__settings__container__content__currencies__table__row' key={index}>
                                                <div className='admin__settings__container__content__currencies__table__row__item' style={{ width: '35%' }}>{currency.name}</div>
                                                <div className='admin__settings__container__content__currencies__table__row__item' style={{ width: '20%' }}>{currency.code}</div>
                                                <div className='admin__settings__container__content__currencies__table__row__item' style={{ width: '20%' }}>{currency.symbol}</div>
                                                <div className='admin__settings__container__content__currencies__table__row__item' style={{ width: '12%' }}>
                                                    <button className='admin__settings__container__content__currencies__table__button__btn' onClick={() => handleUpdateCurrency(currency)}>Edit</button>
                                                </div>
                                                <div className='admin__settings__container__content__currencies__table__row__item' style={{ width: '11%' }}>
                                                    <button className='admin__settings__container__content__currencies__table__button__btn2' onClick={() => handleDelete('currency', currency._id)}>Delete</button>
                                                </div>
                                            </div>
                                        )) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='admin__settings__container__content__payment__terms'>
                                <div className='admin__settings__container__content__payment__terms__heading'>Payment Terms:</div>
                                <div className='admin__settings__container__content__payment__terms__create__button'>
                                    <button className='admin__settings__container__content__payment__terms__create__button__btn' onClick={() => setOpenCreatePaymentTermModal(true)} ><FaPlusCircle /><span style={{ marginLeft: '5px' }}>Create New Payment Term</span></button>
                                </div>
                                <div className='admin__settings__container__content__payment__terms__filter'>
                                    <div className='admin__settings__container__content__payment__terms__filter__search'>
                                        <input type='text' placeholder='Search by Term Name' value={searchTerm} onChange={handleTermSearch} />
                                    </div>
                                    {searchTerm && paymentTermsListFiltered ?
                                        <div className='admin__settings__container__content__payment__terms__filter__records__found'>Showing Records: {paymentTermsListFiltered.length}/{paymentTermsList.length}</div>
                                        :
                                        <div className='admin__settings__container__content__payment__terms__filter__records__found'>Total Records Found: {paymentTermsList.length}</div>
                                    }
                                    {/* <div className='admin__settings__container__content__payment__terms__filter__records__found'>Total Records Found: {paymentTermsList.length}</div> */}
                                </div>
                                <div className='admin__settings__container__content__payment__terms__table'>
                                    <div className='admin__settings__container__content__payment__terms__table__header'>
                                        <div className='admin__settings__container__content__payment__terms__table__header__item' style={{ width: '10%' }}></div>
                                        <div className='admin__settings__container__content__payment__terms__table__header__item' style={{ width: '25%' }}>Name</div>
                                        <div className='admin__settings__container__content__payment__terms__table__header__item' style={{ width: '25%' }}>Percentage</div>
                                        <div className='admin__settings__container__content__payment__terms__table__header__item' style={{ width: '20%' }}>Edit</div>
                                        <div className='admin__settings__container__content__payment__terms__table__header__item' style={{ width: '20%' }}>Delete</div>
                                    </div>
                                    <div className='admin__settings__container__content__payment__terms__table__rows'>
                                        {searchTerm === '' ?
                                            <ReactSortable list={paymentTermsListSorted} setList={setPaymentTermsListSorted}
                                                disabled={searchTerm !== '' ? true : false}
                                                // onChange={handleBankSortChange}
                                                // onStart={(e) => setIsSorting(true)}
                                                // onEnd={(e) => {setNewBankIndex(e.newBankIndex); setOldBankIndex(e.oldBankIndex)}}
                                                animation={200}
                                                onUpdate={(e) => { setNewTermIndex(e.newIndex); setOldTermIndex(e.oldIndex) }}
                                                forceAutoScrollFallback={true}
                                                swap

                                            >
                                                {paymentTermsListSorted ? paymentTermsListSorted.map((paymentTerm, index) => (
                                                    <div className='admin__settings__container__content__payment__terms__table__row' key={index}>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '10%' }}><FaBars className='row__item__bars' /></div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '25%' }}>{paymentTerm.name}</div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '25%' }}>{paymentTerm.percentage}</div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '20%' }}>
                                                            <button className='admin__settings__container__content__payment__terms__table__button__btn' onClick={() => handleUpdatePaymentTerm(paymentTerm)}>Edit</button>
                                                        </div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '19%' }}>
                                                            <button className='admin__settings__container__content__payment__terms__table__button__btn2' onClick={() => handleDelete('paymentTerm', paymentTerm._id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                ))
                                                    : null}
                                            </ReactSortable>
                                            :
                                            <>
                                                {paymentTermsListFiltered ? paymentTermsListFiltered.map((paymentTerm, index) => (
                                                    <div className='admin__settings__container__content__payment__terms__table__row' key={index}>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '10%' }}><FaBars className='row__item__bars__disabled' /></div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '25%' }}>{paymentTerm.name}</div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '25%' }}>{paymentTerm.percentage}</div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '20%' }}>
                                                            <button className='admin__settings__container__content__payment__terms__table__button__btn' onClick={() => handleUpdatePaymentTerm(paymentTerm)}>Edit</button>
                                                        </div>
                                                        <div className='admin__settings__container__content__payment__terms__table__row__item' style={{ width: '19%' }}>
                                                            <button className='admin__settings__container__content__payment__terms__table__button__btn2' onClick={() => handleDelete('paymentTerm', paymentTerm._id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                ))
                                                    : null}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='admin__settings__container__content__bank__accounts'>
                            <div className='admin__settings__container__content__bank__accounts__heading'>Bank Accounts:</div>
                            <div className='admin__settings__container__content__bank__accounts__create__button'>
                                <button className='admin__settings__container__content__bank__accounts__create__button__btn' onClick={() => setOpenCreateBankAccountModal(true)} ><FaPlusCircle /><span style={{ marginLeft: '5px' }}>Add Bank Account</span></button>
                            </div>
                            <div className='admin__settings__container__content__bank__accounts__filter'>
                                <div className='admin__settings__container__content__bank__accounts__filter__search'>
                                    <input type='text' placeholder='Search by Account Name' value={searchBank} onChange={handleBankSearch} />
                                </div>
                                {searchBank && bankAccountsListFiltered ?
                                    <div className='admin__settings__container__content__bank__accounts__filter__records__found'>Showing Records: {bankAccountsListFiltered.length}/{bankAccountsList.length}</div>
                                    :
                                    <div className='admin__settings__container__content__bank__accounts__filter__records__found'>Total Records Found: {bankAccountsList.length}</div>
                                }
                            </div>
                            <div className='admin__settings__container__content__bank__accounts__table'>
                                <div className='admin__settings__container__content__bank__accounts__table__header'>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '3%' }}></div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '15%' }}>Account Name</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '15%' }}>Bank Name</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '12%' }}>Branch Name</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '10%' }}>Account Number</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '10%' }}>Swift Code</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '24%' }}>Branch Address</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '5%' }}>Edit</div>
                                    <div className='admin__settings__container__content__bank__accounts__table__header__item' style={{ width: '6%' }}>Delete</div>
                                </div>
                                <div className='admin__settings__container__content__bank__accounts__table__rows'>
                                    {searchBank === '' ?
                                        <ReactSortable list={bankAccountsListSorted} setList={setBankAccountsListSorted}
                                            disabled={searchBank !== '' ? true : false}
                                            // onChange={handleBankSortChange}
                                            // onStart={(e) => setIsSorting(true)}
                                            // onEnd={(e) => {setNewBankIndex(e.newBankIndex); setOldBankIndex(e.oldBankIndex)}}
                                            animation={200}
                                            onUpdate={(e) => { setNewBankIndex(e.newBankIndex); setOldBankIndex(e.oldBankIndex) }}
                                            forceAutoScrollFallback={true}
                                            swap

                                        >

                                            {bankAccountsListSorted ? bankAccountsListSorted.map((bankAccount, index) => (
                                                <div className='admin__settings__container__content__bank__accounts__table__row' key={bankAccount.position}>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '3%' }}><FaBars className='row__item__bars' /></div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '15%' }}>{bankAccount.accountName}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '15%' }}>{bankAccount.bankName}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '12%' }}>{bankAccount.branchName}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '10%' }}>{bankAccount.accountNumber}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '10%' }}>{bankAccount.swiftCode}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '24%' }}>{bankAccount.branchAddress}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '5%' }}>
                                                        <button className='admin__settings__container__content__bank__accounts__table__button__btn' onClick={() => handleUpdateBankAccount(bankAccount)}>Edit</button>
                                                    </div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '5.5%' }}>
                                                        <button className='admin__settings__container__content__bank__accounts__table__button__btn2' onClick={() => handleDelete('bankAccount', bankAccount._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            ))
                                                : null}


                                        </ReactSortable>
                                        :
                                        <>
                                            {bankAccountsListFiltered ? bankAccountsListFiltered.map((bankAccount, index) => (
                                                <div className='admin__settings__container__content__bank__accounts__table__row' key={bankAccount.position}>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '3%' }}><FaBars className='row__item__bars__disabled' /></div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '15%' }}>{bankAccount.accountName}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '15%' }}>{bankAccount.bankName}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '12%' }}>{bankAccount.branchName}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '10%' }}>{bankAccount.accountNumber}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '10%' }}>{bankAccount.swiftCode}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '24%' }}>{bankAccount.branchAddress}</div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '5%' }}>
                                                        <button className='admin__settings__container__content__bank__accounts__table__button__btn' onClick={() => handleUpdateBankAccount(bankAccount)}>Edit</button>
                                                    </div>
                                                    <div className='admin__settings__container__content__bank__accounts__table__row__item' style={{ width: '5.5%' }}>
                                                        <button className='admin__settings__container__content__bank__accounts__table__button__btn2' onClick={() => handleDelete('bankAccount', bankAccount._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            ))
                                                : null}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {openCreateCountryModal && (
                <CreateCountryModal
                    openCreateCountryModal={openCreateCountryModal}
                    setOpenCreateCountryModal={setOpenCreateCountryModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openCountryModal && (
                <CountryModal
                    country={country}
                    openCountryModal={openCountryModal}
                    setOpenCountryModal={setOpenCountryModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openCreateCurrencyModal && (
                <CreateCurrencyModal
                    openCreateCurrencyModal={openCreateCurrencyModal}
                    setOpenCreateCurrencyModal={setOpenCreateCurrencyModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openCurrencyModal && (
                <CurrencyModal
                    currency={currency}
                    openCurrencyModal={openCurrencyModal}
                    setOpenCurrencyModal={setOpenCurrencyModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openCreatePaymentTermModal && (
                <CreatePaymentTermModal
                    openCreatePaymentTermModal={openCreatePaymentTermModal}
                    setOpenCreatePaymentTermModal={setOpenCreatePaymentTermModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openPaymentTermModal && (
                <PaymentTermModal
                    paymentTerm={paymentTerm}
                    openPaymentTermModal={openPaymentTermModal}
                    setOpenPaymentTermModal={setOpenPaymentTermModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openCreateBankAccountModal && (
                <CreateBankAccountModal
                    openCreateBankAccountModal={openCreateBankAccountModal}
                    setOpenCreateBankAccountModal={setOpenCreateBankAccountModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openBankModal && (
                <BankAccountModal
                    bankData={bankData}
                    openBankModal={openBankModal}
                    setOpenBankModal={setOpenBankModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openConfirmationModal && (
                <ConfirmationModal
                    setConfirm={setConfirm}
                    openConfirmationModal={openConfirmationModal}
                    setOpenConfirmationModal={setOpenConfirmationModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </div>
    )
}

export default AdminSettings
