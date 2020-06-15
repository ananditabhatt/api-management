import React from 'react';
import Modal from '../UI/Modal/Modal';
import { Link } from 'react-router-dom';
import classes from './SuccessModal.css'

const successModal = props => (
    <Modal classes={classes.SuccessModalContainer} modalClosed={() => { props.showSuccessModal(false) }} show={props.successModal}>
        <div className={classes.Content}>
            <span><i style={{ color: 'green' }} className="large material-icons">done_all</i></span>
            <span className={classes.Text}>API Key was successfully generated!</span>
        </div>
        <Link to="/files/myfile.pdf" target="_blank" download><div className={classes.Icon}><i className="small material-icons">file_download</i></div></Link>
    </Modal>
)

export default successModal;
