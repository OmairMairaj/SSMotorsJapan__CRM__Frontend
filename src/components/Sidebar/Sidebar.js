import React from 'react'
import './Sidebar.css'
import logo from '../../assets/images/logo.png'
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaFileInvoice } from 'react-icons/fa';
import { BsPersonAdd } from 'react-icons/bs';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ openSidebar, setOpenSidebar }) {
    const navigate = useNavigate();
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [logout, setLogout] = React.useState(false);

    const wrapperRef = React.useRef(null);
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenSidebar(false);
                // setOpenResearchDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    React.useEffect(() => {
        if (logout) {
            console.log("logout")
            axios
                .post("" + process.env.REACT_APP_BACKEND_URL + "api/user/logout")
                .then((res) => {
                    console.log(res);
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log(res.data);
                        navigate("/");
                        sessionStorage.clear();
                        // setLogout(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                }
                )
        }
    }, [logout])




    return (
        <div ref={wrapperRef} className='sidebar' style={{ width: openSidebar ? '10%' : null }}>
            <div className='sidebar__section'>
                <div className='sidebar__icon' onClick={() => setOpenSidebar(!openSidebar)} style={{ display: openSidebar ? "none" : null }}><FaBars /></div>
                <div className='sidebar__logo' style={{ display: !openSidebar ? "none" : null }}>
                    <img src={logo} alt="logo" />
                </div>
                <div className='sidebar__menu'>
                    {User.role === 'client' ?
                        <div className='sidebar__menu__pages'>
                            <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/dashboard')}>
                                <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaHome /></div>
                                <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >My Account</div>
                            </div>
                            <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/profile')}>
                                <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaUser /></div>
                                <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Update Profile</div>
                            </div>
                        </div>
                        :
                        User.role === 'sale' ?
                            <div className='sidebar__menu__pages'>
                                <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/dashboard')}>
                                    <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaHome /></div>
                                    <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >My Invoices</div>
                                </div>
                                <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/create-invoice')}>
                                    <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaFileInvoice /></div>
                                    <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Create Invoice</div>
                                </div>
                                <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/add-customer')}>
                                    <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><BsPersonAdd size={'25px'} /></div>
                                    <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Add Customer</div>
                                </div>
                                <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/customer')}>
                                    <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaUser /></div>
                                    <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Customers</div>
                                </div>
                            </div>
                            :
                            User.role === 'admin' ?
                                <div className='sidebar__menu__pages'>
                                    <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/dashboard')}>
                                        <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaHome /></div>
                                        <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Invoices</div>
                                    </div>
                                    <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/create-invoice')}>
                                        <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaFileInvoice /></div>
                                        <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Create Invoice</div>
                                    </div>
                                    <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/add-customer')}>
                                        <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><BsPersonAdd size={'25px'} /></div>
                                        <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Add Customer</div>
                                    </div>
                                    <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => navigate('/customer')}>
                                        <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaUser /></div>
                                        <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }} >Customers</div>
                                    </div>
                                </div>
                                : null
                    }
                    <div className='sidebar__menu__pages__item' style={!openSidebar ? { width: '40%', backgroundColor: 'transparent' } : null} onClick={() => setLogout(true)}>
                        <div className='sidebar__menu__pages__item__icon' style={!openSidebar ? { width: '100%', marginRight: '0px' } : null}><FaSignOutAlt /></div>
                        <div className='sidebar__menu__pages__item__name' style={{ display: !openSidebar ? 'none' : null }}>LOGOUT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
