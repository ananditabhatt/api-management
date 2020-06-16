import React, { useState, useEffect } from 'react';
import KeyGenerator from '../../components/KeyGenerator/KeyGenerator';
import img from '../../assets/background.jpg';
import { Parallax } from 'react-parallax';
import ApiData from '../../components/ApiData/ApiData';
import { connect } from 'react-redux';
import loginBackground from "../../assets/Login.mp4";
import classes from './ApiManagement.css';
import * as actionCreators from '../../store/actions/actionCreators';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-users';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal'
import { updateAWSApi, generateAWSApiKey, deletAWSApiKey } from '../../PublicAPI/AWS/awsApiCalls';
import Modal from '../../components/UI/Modal/Modal';


const ApiManagement = props => {
    const [scopetable, populateScopeTable] = useState(null);
    const [deleteAPIWarning, populateDeleteAPIWarning] = useState(null);
    const [editModalData, populateEditModal] = useState(null);
    const [successModal, showSuccessModal] = useState(false);
    const [deleteWarningModal, showDeleteWarningModal] = useState(false);
    const [editModal, showEditModal] = useState(false);
    const [scopeModal, showScopeModal] = useState(false);
    const [showSpinnerForContent, toggleShowSpinnerForContent] = useState(false);
    const [errorModal, setErrorModal] = useState('');
    const [showSecret, setShowSecret] = useState(false);
    const [keyGeneratorElements, setKeyGeneratorElement] = useState({
        keyGeneratorName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            touched: false,
            validation: {
                required: true
            },
            valid: false
        }
    });

    useEffect(() => {
        props.getUserProfile(props.userId);
    }, []);

    const deletAWSApiKeyHandler = key => {
        deletAWSApiKey(key, toggleShowSpinnerForContent, props.apiData, props.onDeleteUserData, setErrorModal);
    }

    const updateAWSApiHandler = data => {
        updateAWSApi(data, props.apiData, props.userId, props.onUpdateUserData, toggleShowSpinnerForContent, setErrorModal);

    }

    const generateAWSApiKeyHandler = event => {
        if (!keyGeneratorElements.keyGeneratorName.valid) {
            event.preventDefault();
            setErrorModal('Invalid Input Provided.');
            return;
        }
        generateAWSApiKey(event, keyGeneratorElements.keyGeneratorName.value, props.userId, showSuccessModal, props.onPostUserData, setErrorModal);
        const updatedElements = { ...props.keyGeneratorElements };
        const updatedElement = { ...updatedElements['keyGeneratorName'] };
        updatedElement.value = '';
        updatedElement.touched = false;
        updatedElement.valid = false
        updatedElements['keyGeneratorName'] = updatedElement;
        setKeyGeneratorElement(updatedElements);
    }

    return (
        <div>
            <video className={classes.myVideo} loop autoplay="autoplay" id="myVideo"><source src={loginBackground} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <div className={classes.content}>
                <Modal modalClosed={() => setErrorModal('')} show={errorModal}><ErrorModal error={errorModal} /></Modal>
                <div style={{ height: '12vh' }}></div>
                <KeyGenerator
                    keyGeneratorElements={keyGeneratorElements}
                    setKeyGeneratorElement={setKeyGeneratorElement}
                    generateAWSApiKeyHandler={generateAWSApiKeyHandler} />
                <div style={{ height: '12vh' }}></div>
                {(props.apiData != null && !showSpinnerForContent && props.profileInfo) ? <ApiData
                    deletAWSApiKeyHandler={(data) => deletAWSApiKeyHandler(data)}
                    updateAWSApiHandler={(data) => updateAWSApiHandler(data)}
                    apiData={props.apiData}
                    scopeModal={scopeModal}
                    showScopeModal={showScopeModal}
                    scopetable={scopetable}
                    populateScopeTableHandler={(data) => { populateScopeTable(data); showScopeModal(true); }}
                    editModal={editModal}
                    showEditModal={showEditModal}
                    populateEditModal={(data) => { populateEditModal(data); showEditModal(true); }}
                    deleteWarningModal={deleteWarningModal}
                    showDeleteWarningModal={showDeleteWarningModal}
                    populateDeleteAPIWarning={(data) => { populateDeleteAPIWarning(data); showDeleteWarningModal(true); }}
                    deleteAPIWarning={deleteAPIWarning}
                    editModalData={editModalData}
                    showSpinnerForContent={showSpinnerForContent}
                    toggleShowSpinnerForContent={toggleShowSpinnerForContent}
                    isSuperUser={props.isSuperUser}
                    showSecret={showSecret}
                    setShowSecret={setShowSecret}
                    profileInfo={props.profileInfo}
                    roles={props.roles} /> : <Spinner />}
                <div style={{ height: '50vh' }}></div>
            </div>
        </div>
    );

}
const mapDispatchToState = state => {
    return {
        apiData: state.manageUsersReducer.apiData,
        profileInfo: state.profilesReducer.profileInfo,
        userId: state.auth.userId,
        isSuperUser: state.profilesReducer.isSuperUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: () => dispatch(actionCreators.getUserData()),
        getUserProfile: (userId) => dispatch(actionCreators.getUserProfile(userId)),
        onGetRoles: () => dispatch(actionCreators.getRoles()),
        onDeleteUserData: (userId) => dispatch(actionCreators.deleteUserData(userId)),
        onUpdateUserData: (userData, key) => dispatch(actionCreators.updateUserData(userData, key)),
        onPostUserData: (userData) => dispatch(actionCreators.postUserData(userData))
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(withErrorHandler(ApiManagement, axios));
