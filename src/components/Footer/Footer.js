import React from 'react'
import './Footer.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import logo from '../../assets/images/logo.png';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <div className="footer__img">
                    <img src={logo} alt="logo" />
                </div>
                <div className='footer__section'>
                    <div className='footer__main'>
                        <div className="footer__main__address">Address: 550-295 Kamojimachō Inoo, Yoshinogawa, Tokushima 776-0033, Japan</div>
                        <div className="footer__main__contact">Contact: +81 9051476612</div>
                    </div>
                    <div className='footer__sub'>
                        <div className='footer__copyright'>
                            Copyright © 2023. SSMotors Japan
                        </div>
                        <div className='footer__social'>
                            <div className='footer__social__item'>
                                <a href='https://www.facebook.com/ssmotorjapan' target='__blank'><FaFacebook /></a>
                            </div>
                            <div className='footer__social__item'>
                                <a href='https://www.instagram.com/ssmotorsjapan/' target='__blank'><FaInstagram /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
