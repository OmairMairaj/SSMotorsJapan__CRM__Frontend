import React from 'react'
import './AdminInvoices.css'
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import { useNavigate } from 'react-router-dom';

function AdminInvoices() {
    const User = JSON.parse(sessionStorage.getItem('user'));
    console.log(User);
    const navigate = useNavigate();
    console.log("Admin Dashboard")
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('purchase');

    return (
        <div className='admin__invoices'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar}
                navigate={(nav) => navigate(nav)} />
            <div className='admin__invoices__container' style={{ width: openSidebar ? '90%' : null }}>
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
                <div className='admin__invoices__container__content'>
                    <div className='admin__invoices__container__content__heading'>INVOICES</div>
                    {/* <div className='admin__invoices__container__content__infoboxes'>
                        <div className='admin__invoices__container__content__infoboxes__box'>
                            <div className='admin__invoices__container__content__infoboxes__box__value'>$ 15,000</div>
                            <div className='admin__invoices__container__content__infoboxes__box__text'>Sale Amount</div>
                        </div>
                        <div className='admin__invoices__container__content__infoboxes__box'>
                            <div className='admin__invoices__container__content__infoboxes__box__value'>$ 16,575</div>
                            <div className='admin__invoices__container__content__infoboxes__box__text'>Payment Recieved</div>
                        </div>
                        <div className='admin__invoices__container__content__infoboxes__box'>
                            <div className='admin__invoices__container__content__infoboxes__box__value'>$ 0 Dr.</div>
                            <div className='admin__invoices__container__content__infoboxes__box__text'>Opening Balance</div>
                        </div>
                        <div className='admin__invoices__container__content__infoboxes__box'>
                            <div className='admin__invoices__container__content__infoboxes__box__value'>$ 1,575</div>
                            <div className='admin__invoices__container__content__infoboxes__box__text'>Balance</div>
                        </div>
                    </div> */}
                    <div className='admin__invoices__container__content__invoices'>
                        <div className='admin__invoices__container__content__invoices__tabs'>
                            <div className='admin__invoices__container__content__invoices__tabs__tab' style={activeTab === 'purchase' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('purchase')}>Purchase Units</div>
                            <div className='admin__invoices__container__content__invoices__tabs__tab' style={activeTab === 'history' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('history')}>Purchase History</div>
                        </div>
                        <div className='admin__invoices__container__content__invoices__filter'>
                            <div className='admin__invoices__container__content__invoices__filter__search'>
                                <input type='text' placeholder='Search' />
                            </div>
                            <div className='admin__invoices__container__content__invoices__filter__records__found'>Total Records Found: 1</div>
                        </div>
                        <div className='admin__invoices__container__content__invoices__table'>
                            <div className='admin__invoices__container__content__invoices__table__header'>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '5%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '8%' }}>Date</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '6%' }}>ETD</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '6%' }}>ETA</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='admin__invoices__container__content__invoices__table__header__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='admin__invoices__container__content__invoices__table__row'>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '5%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>Date</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETD</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETA</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='admin__invoices__container__content__invoices__table__row'>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '5%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>Date</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETD</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETA</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='admin__invoices__container__content__invoices__table__row'>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '5%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '15%' }}>INVOICE NO [Chassis No.]</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>Date</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '12%' }}>CUSTOMER'S NAME</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>Yard in Date</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETD</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>ETA</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>INVOICE</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '7%' }}>ALLOCATED</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>BALANCE DUE</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '6%' }}>Track URL</div>
                                <div className='admin__invoices__container__content__invoices__table__row__item' style={{ width: '8%' }}>BL Surrender</div>
                            </div>
                            <div className='admin__invoices__container__content__invoices__table__total'>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '5%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '15%' }}>Opening Balance: $ 0 Dr.</div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '8%' }}>Total</div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '12%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '8%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '6%' }}>$ 15,000</div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '7%' }}>$ 15,000</div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '8%' }}>$ 0 Dr.</div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '6%' }}></div>
                                <div className='admin__invoices__container__content__invoices__table__total__item' style={{ width: '8%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminInvoices
