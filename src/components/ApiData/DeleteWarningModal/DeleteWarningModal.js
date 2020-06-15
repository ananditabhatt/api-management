import React from 'react';
import classes from './DeleteWarningModal.css';
import CustomButton from '../../UI/Button/Button'

const deleteWarningModal = props => (
    <div>
        <div className={classes.DeleteModal}>
            <span style={{ color: '#ffcc009c' }}><i className="material-icons medium">warning</i></span>
            <span className={classes.DeleteWarningText}><h6>Do you want to delete {props.details.name} API key?</h6></span>
        </div>
        <div className={classes.DelBtns}>
            <CustomButton btnType='Success' clicked={() => { props.deletAWSApiKeyHandler(props.details.client_id); props.showDeleteWarningModal(false) }} >
                <i className="material-icons">check</i>
            </CustomButton>
            <CustomButton btnType='Danger' clicked={() => { props.showDeleteWarningModal(false) }}>
                <i className="material-icons">clear</i>
            </CustomButton>
        </div>
    </div>
)

export default deleteWarningModal;
