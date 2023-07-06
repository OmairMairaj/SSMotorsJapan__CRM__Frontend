import React from 'react'
import './Topbar.css';
import logoBlack from '../../assets/images/logo-black.png'
import { useLocation } from 'react-router-dom';

function Topbar({ openSidebar }) {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const location = useLocation();
    return (
        <div className="topbar">
            <div className="topbar__left">
                <div className='topbar__logo' style={{ display: openSidebar ? "none" : null }}>
                    <img src={logoBlack} alt="logo" />
                </div>
                <div className="topbar__greeting">
                    <div className='topbar__greeting__text'>Hi, {User ? User.fullname.toUpperCase() : null}</div>
                    <div className='topbar__greeting__subtext'>{location.pathname === '/dashboard' ? `Here's all your invoices` : 
                    location.pathname === '/profile' ? `Heres all your personal information` :
                    location.pathname === '/customer' ? `Here's all customers` :
                    location.pathname === '/create-invoice' ? 'Create a new Invoice' :
                    location.pathname === '/add-customer' ? 'Add a new Customer' : null}</div>
                </div>
            </div>
            <div className='topbar__profile'>
                <div className='topbar__profile__image'>{User ? User.fullname.charAt(0).toUpperCase(): null}</div>
                <div className='topbar__profile__info'>
                    <div className='topbar__profile__info__name'>{User ? User.fullname : null}</div>
                    <div className='topbar__profile__info__email'>{User ? User.email : null}</div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
