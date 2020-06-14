import React, { useState, useEffect } from 'react';
import KeyGenerator from '../../components/KeyGenerator/KeyGenerator';
import { APIGateway, S3 } from 'aws-sdk';
import ApiData from '../../components/ApiData/ApiData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-users';

const DEFAULT_ROLE = 'user';
const apigateway = new APIGateway({
    apiVersion: '2015-07-09',
    region: process.env.REACT_APP_AWS_REGION,
    credentials: { accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY }
});

const ApiManagement = props => {
    const [elements, setElement] = useState({
        name: {
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
        // },
        // name: {
        //     elementType: 'input',
        //     elementConfig: {
        //         type: 'text',
        //         placeholder: 'Name'
        //     },
        //     value: '',
        //     validation: {
        //         required: true
        //     },
        //     valid: false
        // }
    });
    const [successModal, showSuccessModal] = useState(false);

    useEffect(() => {
        props.onGetUserData();
        props.onGetRoles();
    }, []);

    let elementArray = [];
    for (let key in elements) {
        elementArray.push({
            id: key,
            config: elements[key]
        });
    }

    const deletAWSApiKey = (key) => {
        var params = {
            apiKey: key
        };
        apigateway.deleteApiKey(params, function (err, data) {
            if (err) {
                console.log("Error occured!");
                console.log(err, err.stack);
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
        data.name = "ANAV_123";
        let params = {
            apiKey: data.client_id,
            patchOperations: [
                {
                    from: '',
                    op: 'replace',
                    path: '/name',
                    value: data.name
                },
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
                    "value": value,
                    "lastUpdatedDate": data['lastUpdatedDate'],
                    "userName": "annie",
                    "name": data['name']
                };
                props.onUpdateUserData(jsonData, key);
            }
        });
    }

    const generateAWSApiKey = (event) => {
        event.preventDefault()
        if (!elements.name.valid) {
            alert("INVALID!");
            return;

        }
        var params = {
            description: 'Created by : ',
            enabled: true,
            name: elements.name.value
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
                    "name": elements.name.value
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
        const updatedElements = { ...elements };
        const updatedElement = { ...updatedElements[id] };
        updatedElement.value = event.target.value;
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
        updatedElements[id] = updatedElement;
        let formISValid = true;
        for (let id in updatedElements) {
            formISValid = updatedElements[id].valid && formISValid
        }
        setElement(updatedElements);
    }

    console.log("apiData  in API MANAGEMENT", props.apiData);
    

    return (
        <div>
            {/* <Parallax /> */}
            <KeyGenerator
                elementArray={elementArray}
                generateAWSApiKey={generateAWSApiKey}
                inputChangeListner={inputChangeListner} />
            <Modal modalClosed={() => { showSuccessModal(false) }} show={successModal}>
                <i style={{ color: 'green' }} className="large material-icons">done_all</i>
                <span>API Key was successfully generated!</span>
                <div><i className="small material-icons">file_download</i></div>
            </Modal>
            {props.apiData ? <ApiData
                deletAWSApiKey={(data) => deletAWSApiKey(data)}
                toggleAWSApiKey={(data) => toggleAWSApiKey(data)}
                updateAWSApiName={(data) => updateAWSApiName(data)}
                apiData={props.apiData}
                elementArray={elementArray}
                inputChangeListner={inputChangeListner}
                roles={props.roles} /> : <Spinner />}
        </div>
    );

}
const mapDispatchToState = state => {
    return {
        apiData: state.manageUsersReducer.apiData,
        // roles: state.rbacReducer.roles
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: () => dispatch(actionCreators.getUserData()),
        onGetRoles: () => dispatch(actionCreators.getRoles()),
        onDeleteUserData: (userId) => dispatch(actionCreators.deleteUserData(userId)),
        onUpdateUserData: (userData, key) => dispatch(actionCreators.updateUserData(userData, key)),
        onPostUserData: (userData) => dispatch(actionCreators.postUserData(userData))
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(withErrorHandler(ApiManagement, axios));
