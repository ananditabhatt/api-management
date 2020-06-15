import { APIGateway, S3 } from 'aws-sdk';

const DEFAULT_ROLE = 'user';
const apigateway = new APIGateway({
    apiVersion: '2015-07-09',
    region: process.env.REACT_APP_AWS_REGION,
    credentials: { accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY }
});

const createAWSjson = (data, userId) => {
    let jsonData = {}
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
        "value": data['value'],
        "lastUpdatedDate": data['lastUpdatedDate'],
        "userId": userId,
        "name": data['name']
    };
    return jsonData;
}

//generate new AWS api key
export const generateAWSApiKey = (event, value, userId, showSuccessModal, onPostUserData, setErrorModal) => {
    event.preventDefault();
    let params = {
        description: 'Test API',
        enabled: true,
        name: value
    };
    apigateway.createApiKey(params, function (err, data) {
        if (err) {
            console.log(err)
            setErrorModal(err)
        }
        else {
            showSuccessModal(true);
            let updatedObj = { ...data }
            data['name'] = value
            let jsonData = createAWSjson(updatedObj, userId);
            onPostUserData(jsonData);
        }
    });
}

// update name and status of the AWS api key
export const updateAWSApi = (data, apiData,userId, onUpdateUserData, toggleFunction, setErrorModal) => {
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
    toggleFunction(true);
    apigateway.updateApiKey(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            setErrorModal(err.message)
            toggleFunction(false);
        }
        else {
            let value = null
            let key = null
            Object.keys(apiData).map(keys => {
                for (let id in apiData[keys]) {
                    if (id === data['id']) {
                        value = apiData[keys][id].value;
                        key = keys;
                    }
                }
            });
            let updatedObj = { ...data };
            updatedObj['value'] = value;
            let jsonData = createAWSjson(updatedObj,userId);
            onUpdateUserData(jsonData, key);
            toggleFunction(false)
        }
    });
}
// delete AWS api key
export const deletAWSApiKey = (key, toggleShowSpinnerForContent, apiData,onDeleteUserData,setErrorModal ) => {
    var params = {
        apiKey: key
    };
    toggleShowSpinnerForContent(true);
    apigateway.deleteApiKey(params, function (err, data) {
        if (err) {
            toggleShowSpinnerForContent(false);
            setErrorModal(err.message);
        }
        else {
            Object.keys(apiData).map(keys => {
                for (let id in apiData[keys]) {
                    if (id === key) {
                        onDeleteUserData(keys);
                    }
                }
            });
            toggleShowSpinnerForContent(false);
        }
    });
}

