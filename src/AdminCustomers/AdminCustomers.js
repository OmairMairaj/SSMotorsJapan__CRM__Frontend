import React from 'react'
import './AdminCustomers.css'
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
// import data from '../data/Customer.json'
import CustomerModal from '../CustomerModal/CustomerModal';
import CreateCustomerModal from '../CreateCustomerModal/CreateCustomerModal';
import CustomerUpdateModal from '../CustomerUpdateModal/CustomerUpdateModal';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
axios.defaults.withCredentials = true

function AdminCustomers() {
    const navigate = useNavigate();
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [openSidebar, setOpenSidebar] = React.useState(false);
    // const data = [];
    // for (let i = 0; i < 50; i++) {
    //     data.push(i);
    // }
    const [totalCards, setTotalCards] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [cardsPerPage] = React.useState(50);
    const [searchField, setSearchField] = React.useState("");
    const [customerData, setCustomerData] = React.useState();
    const [openCustomerModal, setOpenCustomerModal] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('All');
    const [activeCount, setActiveCount] = React.useState(0);
    const [retainerCount, setRetainerCount] = React.useState(0);
    const [suspendedCount, setSuspendedCount] = React.useState(0);
    const [refresh, setRefresh] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [allCount, setAllCount] = React.useState(0);
    const [finalData, setFinalData] = React.useState([]);
    const [finalDataFiltered, setFinalDataFiltered] = React.useState([]);
    const [openCreateCustomerModal, setOpenCreateCustomerModal] = React.useState(false);
    const [openCustomerUpdateModal, setOpenCustomerUpdateModal] = React.useState(false);
    const hasWindow = typeof window !== "undefined";
    const [windowDimensions, setWindowDimensions] = React.useState(
        getWindowDimensions()
    );

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        return {
            width,
        };
    }

    const fetchCustomers = () => {
        try {
            axios.get(
                "" + process.env.REACT_APP_BACKEND_URL + "api/customer/get-customers",
            ).then((res) => {
                if (res.data.error) {
                    console.log(res.data.message)
                } else {
                    console.log(res.data.data);
                    setData(res.data.data);
                    setTotalCards(res.data.data.length);
                }

            })
        }
        catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    React.useEffect(() => {
        fetchCustomers();
        // Replace with your actual API URL
    }, [refresh]);

    React.useEffect(() => {
        if (data) {
            setAllCount(data.length);
            setActiveCount(data.filter(item => item.customerStatus === 'active').length);
            setRetainerCount(data.filter(item => item.customerStatus === 'retainer').length);
            setSuspendedCount(data.filter(item => item.customerStatus === 'suspended').length);
            if (activeTab === 'All') {
                setFinalData(data);
            } else if (activeTab === 'Active') {
                setFinalData(data.filter(item => item.customerStatus === 'active'));
            } else if (activeTab === 'Retainer') {
                setFinalData(data.filter(item => item.customerStatus === 'retainer'));
            } else if (activeTab === 'Suspended') {
                setFinalData(data.filter(item => item.customerStatus === 'suspended'));
            }
        }
    }, [data, activeTab])

    React.useEffect(() => {
        setFinalDataFiltered(finalData);
    }, [finalData])

    const handleSearch = (e) => {

        if (finalData) {
            const searchText = e.target.value.toLowerCase();
            setSearchField(searchText);

            const filteredRecords = [];
            finalData.filter(record => {
                if (record.fullname.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else if (record.company.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else if (record.country.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else if (record.salesPerson.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else if (record.prefCurrency.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                }
            }
            );
            console.log(filteredRecords)
            setFinalDataFiltered(filteredRecords);
        }
    };

    React.useEffect(() => {
        if (
            openCustomerModal || openCreateCustomerModal || openCustomerUpdateModal
        ) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
            document.body.style.paddingRight = "15px";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.height = "unset";
            document.body.style.paddingRight = "unset";
        }
    }, [openCustomerModal, openCreateCustomerModal || openCustomerUpdateModal]);

    React.useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    function handleClickModal(data) {
        console.log(data.fullName, User.fullname)
        // if (data.salePerson === User.fullname) {
        setCustomerData(data);
        setOpenCustomerModal(true)
        // }
    }

    function handleUpdateModal(data, e) {
        e.stopPropagation();
        setCustomerData(data);
        setOpenCustomerModal(false);
        setOpenCustomerUpdateModal(true);
    }

    // const paginate = (pageNumber) => {
    //     navigate("/customer?q=" + searchField + "&pag=" + pageNumber)
    //     window.scrollTo(0, 0);
    // };

    return (
        <div className='customer'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar}
            />
            <div className='customer__container' style={{ width: openSidebar ? '90%' : null }}>
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
                <div className='customer__container__content'>
                    <div className='customer__container__content__heading'>CUSTOMERS</div>
                    <div className='customer__container__content__invoices'>
                        <div className='customers__container__content__tabs'>
                            <div className='customers__container__content__tabs__tab' style={activeTab === 'All' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('All')}>{data.length !== 0 ? `All (${data.length})` : "All"}</div>
                            <div className='customers__container__content__tabs__tab' style={activeTab === 'Active' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('Active')}>{activeCount !== 0 ? `Active (${activeCount})` : "Active"}</div>
                            <div className='customers__container__content__tabs__tab' style={activeTab === 'Retainer' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('Retainer')}>{retainerCount !== 0 ? `Retainer (${retainerCount})` : "Retainer"}</div>
                            <div className='customers__container__content__tabs__tab' style={activeTab === 'Suspended' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('Suspended')}>{suspendedCount !== 0 ? `Suspended (${suspendedCount})` : "Suspended"}</div>
                        </div>
                        <div className='customers__container__content__create__button'>
                            <button className='customers__container__content__create__button__btn' onClick={() => setOpenCreateCustomerModal(true)}><FaPlusCircle /><span style={{ marginLeft: '5px' }}>Create New Customer</span></button>
                        </div>
                        <div className='customer__container__content__invoices__filter'>
                            <div className='customer__container__content__invoices__filter__search'>
                                <input type='text' placeholder='Search by Name, Company, Country, SalePerson or Preferred Currency' value={searchField} onChange={handleSearch} />
                            </div>
                            {searchField && finalDataFiltered ?
                                <div className='customer__container__content__invoices__filter__records__found'>Showing Records: {finalDataFiltered.length}/{finalData.length}</div>
                                :
                                <div className='customer__container__content__invoices__filter__records__found'>Total Records Found: {finalData.length}</div>
                            }
                            {/* <div className='customer__container__content__invoices__filter__records__found'>Total Records Found: {finalData.length}</div> */}
                        </div>
                        <div className='customer__container__content__invoices__table'>
                            <div className='customer__container__content__invoices__table__header'>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '12vw' }}>Customer ID</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '17vw' }}>Customer's Name</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '17vw' }}>Company Name</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '12vw' }}>Country</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '17vw' }}>Sale Person</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '9vw' }}>Pref. Currency</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '10vw' }}>Status</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '8vw' }}></div>
                            </div>
                            <div className='customer__container__content__invoices__table__rows'>
                                {finalDataFiltered ? finalDataFiltered.map((item, index) => {
                                    return (
                                        <div className='customer__container__content__invoices__table__row' onClick={() => handleClickModal(item)}>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '12vw', textAlign: 'center' }}>{item.customer_id}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '17vw' }}>{item.fullname}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '17vw' }}>{item.company}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '12vw', textAlign: 'center' }}>{item.country}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '17vw', textAlign: 'center' }}>{item.salesPerson}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '9vw', textAlign: 'center' }}>{item.prefCurrency}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '10vw', textAlign: 'center' }}>{item.customerStatus.toUpperCase()}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '7.5vw', textAlign: 'center', color: '#56a8ff' }} onClick={(e) => handleUpdateModal(item, e)}><FaEdit size={20} /></div>
                                        </div>
                                    )
                                }
                                ) :
                                    <div className='customer__container__content__invoices__table__row' style={{ justifyContent: 'center' }}>
                                        <div className='customer__container__content__invoices__table__row__item' style={{ width: '100%' }}>No Records Found</div>
                                    </div>
                                }
                                {/* <Pagination
                                    cardsPerPage={50}
                                    totalcards={totalCards}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                /> */}
                            </div>

                            {/* <div className='customer__container__content__invoices__table__total'>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '5%' }}></div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '15%' }}>Opening Balance: $ 0 Dr.</div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '8%' }}>Total</div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '12%' }}></div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '8%' }}></div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '6%' }}>$ 15,000</div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '7%' }}>$ 15,000</div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '8%' }}>$ 0 Dr.</div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='customer__container__content__invoices__table__total__item' style={{ width: '8%' }}></div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {openCustomerModal && !openCustomerUpdateModal && (
                <CustomerModal
                    data={customerData}
                    openCustomerModal={openCustomerModal}
                    setOpenCustomerModal={setOpenCustomerModal}
                />
            )}
            {openCreateCustomerModal && (
                <CreateCustomerModal
                    openCreateCustomerModal={openCreateCustomerModal}
                    setOpenCreateCustomerModal={setOpenCreateCustomerModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openCustomerUpdateModal && !openCustomerModal && (
                <CustomerUpdateModal
                    data={customerData}
                    openCustomerUpdateModal={openCustomerUpdateModal}
                    setOpenCustomerUpdateModal={setOpenCustomerUpdateModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </div>
    )
}

export default AdminCustomers
