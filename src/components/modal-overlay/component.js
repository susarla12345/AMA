import React from 'react';
import '../modal-overlay/style.scss';
import FormButton from '../form-button/component';
import { ReactSVG } from 'react-svg'

const ModalOverlay = (props) => {
    return (
        <div className="overlay-modal-wrapper">
            <div className="modal-wrapper modal">

                <div className="modal--header">
                    {
                        props.headerIcon ? <div className="header-icon">
                            <ReactSVG className="close-modal" src="cross.svg" />
                        </div> : false
                    }

                    <h4 className="header-title">{props.title}</h4>

                    <button className="close-button" onClick={props.closeModal}>
                        <ReactSVG className="close-modal" src="cross.svg" />
                    </button>
                </div>
                
                <div className="modal--body">
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default ModalOverlay;