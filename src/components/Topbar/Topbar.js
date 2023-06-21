import React from 'react'
import './Topbar.css';
import logoBlack from '../../assets/images/logo-black.png'
import { useLocation, useParams } from 'react-router-dom';

function Topbar({ openSidebar, User }) {
    const fullName = "Omair Mairaj";
    const company_name = "OMA PVT LTD";
    const email = "omairmairaj@gmail.com"
    const location = useLocation();
    return (
        <div className="topbar">
            <div className="topbar__left">
                <div className='topbar__logo' style={{ display: openSidebar ? "none" : null }}>
                    <img src={logoBlack} alt="logo" />
                </div>
                <div className="topbar__greeting">
                    <div className='topbar__greeting__text'>Hi, {User.fullName}</div>
                    <div className='topbar__greeting__subtext'>{location.pathname === '/dashboard' ? `Here's all your invoices` : 
                    location.pathname === '/profile' ? `Heres all your personal information` :
                    location.pathname === '/customer' ? `Here's all your customers` :
                    location.pathname === '/add-customer' ? 'Add a new Customer' : null}</div>
                </div>
            </div>
            <div className='topbar__profile'>
                <div className='topbar__profile__image'>{User.fullName.charAt(0).toUpperCase()}</div>
                <div className='topbar__profile__info'>
                    <div className='topbar__profile__info__name'>{User.fullName}</div>
                    <div className='topbar__profile__info__email'>{User.email}</div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
