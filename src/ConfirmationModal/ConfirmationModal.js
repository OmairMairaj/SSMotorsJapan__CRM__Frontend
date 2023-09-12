import React from 'react'
import './ConfirmationModal.css'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
axios.defaults.withCredentials = true

function ConfirmationModal({ setConfirm, openConfirmationModal, setOpenConfirmationModal, refresh, setRefresh }) {

    const handleConfirm = async () => {
        setConfirm(true);
        setOpenConfirmationModal(false);
    }

    if (!openConfirmationModal) return null;
    return (
        <div className="confirmation__modal" onClick={() => setOpenConfirmationModal(false)}>
            <div class="confirmation__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className="confirmation__modal__screen__clip"></div>
                <div class="confirmation__modal__screen__container">
                    <div class="confirmation__modal__close__button" onClick={() => setOpenConfirmationModal(false)}><AiOutlineClose /></div>
                    <div class="confirmation__modal__screen__content">
                        <div className="confirmation__modal__screen__content__top">
                            <div className="confirmation__modal__screen__content__heading">Confirm Deletetion</div>
                            <div className="confirmation__modal__screen__content__message">Are you sure you want to delete this record? This process cannot be undone.</div>
                        </div>
                        <div className="confirmation__modal__screen__content__bottom">                         
                            <div className="confirmation__modal__confirm__button" onClick={handleConfirm}>
                                Confirm
                            </div>
                            <div className="confirmation__modal__cancel__button"  onClick={() => setOpenConfirmationModal(false)} >
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmationModal