import React from 'react'
import './Customer.css'
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import data from '../data/Customer.json'
import CustomerModal from '../CustomerModal/CustomerModal';

function Customer() {
    const navigate = useNavigate();
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [openSidebar, setOpenSidebar] = React.useState(false);
    // const data = [];
    // for (let i = 0; i < 50; i++) {
    //     data.push(i);
    // }
    const [totalCards, setTotalCards] = React.useState(data.length);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [cardsPerPage] = React.useState(50);
    const [searchField, setSearchField] = React.useState("");
    const [customerData, setCustomerData] = React.useState();
    const [openCustomerModal, setOpenCustomerModal] = React.useState(false);
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

    React.useEffect(() => {
        if (
            openCustomerModal
        ) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
            document.body.style.paddingRight = "15px";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.height = "unset";
            document.body.style.paddingRight = "unset";
        }
    }, [openCustomerModal]);

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
        if (data.salePerson === User.fullname) {
            setCustomerData(data);
            setOpenCustomerModal(true)
        }
    }


    const paginate = (pageNumber) => {
        navigate("/customer?q=" + searchField + "&pag=" + pageNumber)
        window.scrollTo(0, 0);
    };

    return (
        <div className='customer'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar}
                 />
            <div className='customer__container' style={{ width: openSidebar ? '90%' : null }}>
                <Topbar openSidebar={openSidebar} />
                <div className='customer__container__content'>
                    <div className='customer__container__content__heading'>CUSTOMERS</div>
                    <div className='customer__container__content__invoices'>
                        <div className='customer__container__content__invoices__filter'>
                            <div className='customer__container__content__invoices__filter__search'>
                                <input type='text' placeholder='Search' />
                            </div>
                            <div className='customer__container__content__invoices__filter__records__found'>Total Records Found: {data.length}</div>
                        </div>
                        <div className='customer__container__content__invoices__table'>
                            <div className='customer__container__content__invoices__table__header'>
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '5vw' }}></div> */}
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '10vw' }}>Customer ID</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '12vw' }}>Customer's Name</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '15vw' }}>Company Name</div>
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '12vw' }}>Email</div> */}
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '9vw' }}>Contact no</div> */}
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '10vw' }}>Country</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '12vw' }}>Sale Person</div>
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '12vw' }}>Alt. Email</div> */}
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '8vw' }}>Alt Contact no</div> */}
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '6vw' }}>Type</div> */}
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '8vw' }}>Pref. Currency</div>
                                <div className='customer__container__content__invoices__table__header__item' style={{ width: '8vw' }}>Status</div>
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '6vw' }}>City</div> */}
                                {/* <div className='customer__container__content__invoices__table__header__item' style={{ width: '20vw' }}>Address</div> */}
                            </div>
                            <div className='customer__container__content__invoices__table__rows'>
                                {data.map((item, index) => {
                                    return (
                                        <div className='customer__container__content__invoices__table__row' style={{ cursor: item.salePerson === User.fullName ? 'cursor' : 'default' }} onClick={() => handleClickModal(item)}>
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '5vw' }}></div> */}
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '10vw' }}>{item.customer_id}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '12vw' }}>{item.fullName}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '15vw' }}>{item.companyName}</div>
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '12vw' }}>Email</div> */}
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '9vw' }}>Contact no</div> */}
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '10vw' }}>{item.country}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '12vw' }}>{item.salePerson}</div>
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '12vw' }}>Alt. Email</div> */}
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '8vw' }}>Alt Contact no</div> */}
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '6vw' }}>Type</div> */}
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '8vw' }}>{item.prefCurrency}</div>
                                            <div className='customer__container__content__invoices__table__row__item' style={{ width: '8vw' }}>{item.status}</div>
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '6vw' }}>City</div> */}
                                            {/* <div className='customer__container__content__invoices__table__row__item' style={{ width: '20vw' }}>Address</div> */}
                                        </div>
                                    )
                                }
                                )}
                                <Pagination
                                    cardsPerPage={50}
                                    totalcards={totalCards}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                />
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
            {openCustomerModal && (
                <CustomerModal
                    data={customerData}
                    openCustomerModal={openCustomerModal}
                    setOpenCustomerModal={setOpenCustomerModal}
                />
            )}
        </div>
    )
}

export default Customer
