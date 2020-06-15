import React, { useState, useEffect } from 'react';
import KeyGenerator from '../../components/KeyGenerator/KeyGenerator';
import { APIGateway, S3 } from 'aws-sdk';
import ApiData from '../../components/ApiData/ApiData';
import { connect } from 'react-redux';
import loginBackground from "../../assets/Login.mp4";
import classes from './ApiManagement.css';
import * as actionCreators from '../../store/actions/actionCreators';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-users';
import SuccessModal from '../../components/SuccessModal/SuccessModal'

const DEFAULT_ROLE = 'user';
const apigateway = new APIGateway({
    apiVersion: '2015-07-09',
    region: process.env.REACT_APP_AWS_REGION,
    credentials: { accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY }
});

const ApiManagement = props => {
    const [keyGeneratorElements, setKeyGeneratorElement] = useState({
        keyGeneratorName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        }
    });

    const [scopetable, populateScopeTable] = useState(null);
    const [deleteAPIWarning, populateDeleteAPIWarning] = useState(null);
    const [editModalData, populateEditModal] = useState(null);
    const [successModal, showSuccessModal] = useState(false);
    const [tempToggleState, changeTempToggleState] = useState(false);
    const [tempApiName, changeTempApiName] = useState('');
    const [deleteWarningModal, showDeleteWarningModal] = useState(false);
    const [editModal, showEditModal] = useState(false);
    const [scopeModal, showScopeModal] = useState(false);
    const [showSpinnerForContent, toggleShowSpinnerForContent] = useState(false);
    const [errorModal, showErrorModal] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
        console.log("FIRST USE EFFECT CALLED props: ", props);
        props.onGetUserData();
        props.onGetRoles();
        props.getUserProfile(props.userId);
    }, []);

    const { profileInfo } = props;
    useEffect(() => {
        console.log("SECOND USE EFFECT CALLED props: ", props);
        if (props.profileInfo) {
            setIsSuperUser(props.profileInfo.role == 'superuser');
        }
      }, profileInfo);

    let keyGeneratorElementArray = [];
    for (let key in keyGeneratorElements) {
        keyGeneratorElementArray.push({
            id: key,
            config: keyGeneratorElements[key]
        });
    }

    const deletAWSApiKey = (key) => {
        var params = {
            apiKey: key
        };
        toggleShowSpinnerForContent(true);
        apigateway.deleteApiKey(params, function (err, data) {
            if (err) {
                console.log("Error occured!");
                console.log(err, err.stack);
                toggleShowSpinnerForContent(false);
            }
            else {
                Object.keys(props.apiData).map(keys => {
                    for (let id in props.apiData[keys]) {
                        console.log("ID IS ", id);
                        if (id === key) {
                            console.log("KEY TO DELETE IS", keys)
                            props.onDeleteUserData(keys);
                        }
                    }
                });
                toggleShowSpinnerForContent(false);
            }
        });
    }
    const toggleAWSApiKey = (data) => {
        //data.enabled = false;
        let params = {
            apiKey: data.client_id,
            patchOperations: [
                {
                    from: '',
                    op: 'replace',
                    path: '/enabled',
                    value: data.enabled ? 'true' : 'false'
                }
            ]
        };
        apigateway.updateApiKey(params, function (err, data) {
            if (err) { console.log(err, err.stack); }// an error occurred
            else {
                console.log("UPDATED ", data);
                let value = null
                let key = null
                Object.keys(props.apiData).map(keys => {
                    for (let id in props.apiData[keys]) {
                        console.log("ID IS ", id);
                        if (id === data['id']) {
                            value = props.apiData[keys][id].value;
                            key = keys;
                        }
                    }
                });
                let jsonData = {};
                jsonData[data['id']] = {
                    "createdDate": data['createdDate'],
                    "client_id": data['id'],
                    "role": DEFAULT_ROLE,
                    "enabled": data['enabled'],
                    "scope": {
                        "events": {
                            read: true,
                            write: false
                        },
                        "manageUsers": {
                            "read": false,
                            "write": false
                        }
                    },
                    "value": value,
                    "lastUpdatedDate": data['lastUpdatedDate'],
                    "userName": "annie",
                    "name": data['name']
                };
                props.onUpdateUserData(jsonData, key);

            }
        });
    }

    const updateAWSApiName = (data) => {
        let params = {
            apiKey: data.client_id,
            patchOperations: [
                {
                    from: '',
                    op: 'replace',
                    path: '/name',
                    value: data.name
                },
                {
                    from: '',
                    op: 'replace',
                    path: '/enabled',
                    value: data.enabled ? 'true' : 'false'
                }
            ]
        };
        toggleShowSpinnerForContent(true);
        apigateway.updateApiKey(params, function (err, data) {
            if (err) { console.log(err, err.stack); }// an error occurred
            else {
                console.log("UPDATED ", data);
                let value = null
                let key = null
                Object.keys(props.apiData).map(keys => {
                    for (let id in props.apiData[keys]) {
                        console.log("ID IS ", id);
                        if (id === data['id']) {
                            value = props.apiData[keys][id].value;
                            key = keys;
                        }
                    }
                });
                let jsonData = {};
                jsonData[data['id']] = {
                    "createdDate": data['createdDate'],
                    "client_id": data['id'],
                    "role": DEFAULT_ROLE,
                    "enabled": data['enabled'],
                    "scope": {
                        "events": {
                            read: true,
                            write: false
                        },
                        "manageUsers": {
                            "read": false,
                            "write": false
                        }
                    },
                    "value": value,
                    "lastUpdatedDate": data['lastUpdatedDate'],
                    "userName": "annie",
                    "name": data['name']
                };
                props.onUpdateUserData(jsonData, key);
                toggleShowSpinnerForContent(false);
            }
        });
    }

    const generateAWSApiKey = (event) => {
        event.preventDefault()
        if (!keyGeneratorElements.keyGeneratorName.valid) {
            alert("INVALID!");
            return;

        }
        var params = {
            description: 'Created by : ',
            enabled: true,
            name: keyGeneratorElements.keyGeneratorName.value
        };

        apigateway.createApiKey(params, function (err, data) {
            if (err) {

            }
            else {
                showSuccessModal(true);
                let jsonData = {};
                jsonData[data['id']] = {
                    "createdDate": data['createdDate'],
                    "client_id": data['id'],
                    "role": DEFAULT_ROLE,
                    "enabled": true,
                    "scope": {
                        "events": {
                            read: true,
                            write: false
                        },
                        "manageUsers": {
                            "read": false,
                            "write": false
                        }
                    },
                    "value": data['value'],
                    "lastUpdatedDate": data['lastUpdatedDate'],
                    "userName": "annie",
                    "name": keyGeneratorElements.keyGeneratorName.value
                };
                props.onPostUserData(jsonData);
            }
        });
    }

    const checkValidity = (value, validation) => {
        let isValid = true
        console.log(" value ", value);
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    const inputChangeListner = (event, id) => {
        console.log("input changelistner : ", id);
        switch (id) {
            case 'keyGeneratorName':
                const updatedElements = { ...keyGeneratorElements };
                const updatedElement = { ...updatedElements[id] };
                updatedElement.value = event.target.value;
                updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
                updatedElements[id] = updatedElement;
                let formISValid = true;
                for (let id in updatedElements) {
                    formISValid = updatedElements[id].valid && formISValid
                }
                setKeyGeneratorElement(updatedElements);
                break;
            default:
                return null;
        }
    }
    console.log('isSuperUser IN API MANAGEMENT ', isSuperUser);
    return (
        <div>
            <video
                className={classes.myVideo}
                loop
                autoplay="autoplay"
                id="myVideo">
                <source src={loginBackground} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <div className={classes.content}>
                <KeyGenerator
                    keyGeneratorElementArray={keyGeneratorElementArray}
                    generateAWSApiKey={generateAWSApiKey}
                    inputChangeListner={inputChangeListner} />
               <SuccessModal showSuccessModal={showSuccessModal} successModal={successModal}/>
                {(props.apiData && !showSpinnerForContent)? <ApiData
                    deletAWSApiKey={(data) => deletAWSApiKey(data)}
                    toggleAWSApiKey={(data) => toggleAWSApiKey(data)}
                    updateAWSApiName={(data) => updateAWSApiName(data)}
                    apiData={props.apiData}
                    scopeModal={scopeModal}
                    scopetable={scopetable}
                    populateScopeTableHandler={(data) => { populateScopeTable(data); showScopeModal(true); }}
                    showScopeModal={showScopeModal}
                    editModal={editModal}
                    showEditModal={showEditModal}
                    deleteWarningModal={deleteWarningModal}
                    showDeleteWarningModal={showDeleteWarningModal}
                    populateDeleteAPIWarning={(data) => { populateDeleteAPIWarning(data); showDeleteWarningModal(true); }}
                    populateEditModal={(data) => { populateEditModal(data); showEditModal(true); }}
                    editModalData={editModalData}
                    deleteAPIWarning={deleteAPIWarning}
                    tempToggleState={tempToggleState}
                    changeTempToggleState={changeTempToggleState}
                    tempApiName={tempApiName}
                    changeTempApiName={changeTempApiName}
                    showSpinnerForContent={showSpinnerForContent}
                    toggleShowSpinnerForContent={toggleShowSpinnerForContent}
                    isSuperUser={isSuperUser}
                    showSecret={showSecret}
                    setShowSecret={setShowSecret}
                    roles={props.roles} /> : <Spinner />}
            </div>
        </div>
    );

}
const mapDispatchToState = state => {
    return {
        apiData: state.manageUsersReducer.apiData,
        profileInfo: state.profilesReducer.profileInfo,
        userId: state.auth.userId
        // roles: state.rbacReducer.roles
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
