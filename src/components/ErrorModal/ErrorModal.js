import React from 'react';
import classes from './ErrorModal.css';

const errorModal = props => (
    <div>
        <div className={classes.ErrorModal}>
            <span style={{ color: '#c50303bd' }}><i className="material-icons medium">cancel</i></span>
            <span className={classes.WarningText}><h6>Error Occured! {props.error} Please Try Again.</h6></span>
        </div>
    </div>
)

export default errorModal;
