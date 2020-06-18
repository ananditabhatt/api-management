import { APIGateway, S3 } from 'aws-sdk';

const DEFAULT_ROLE = 'user';
const apiTypes = { messaging: "i6axpo", iot: "xaxg8h" };
const apigateway = new APIGateway({
    apiVersion: '2015-07-09',
    region: process.env.REACT_APP_AWS_REGION,
    credentials: { accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY }
});

const createAWSjson = (data, userId, type) => {
    console.log("data update ",data);
    let jsonData = {}
    let scope = {}
    let permitted = {
        read: true,
        write: true
    }
    let notPermitted = {
        read: false,
        write: false
    }
    if (type === 'iot') {
        scope = {"Messaging": notPermitted,"Iot": permitted}
    } else if (type == 'messaging'){
        scope = {"Messaging": permitted,"Iot": notPermitted}
    }else {
        scope = {"Messaging": permitted,"Iot": notPermitted}
    }
    jsonData[data['id']] = {
        "createdDate": data['createdDate'],
        "client_id": data['id'],
        "role": DEFAULT_ROLE,
        "enabled": data['enabled'],
        "scope": scope,
        "value": data['value'],
        "lastUpdatedDate": data['lastUpdatedDate'],
        "userId": userId,
        "name": data['name']
    };
    return jsonData;
}

//generate new AWS api key
export const generateAWSApiKey = (value, type, userId, showSuccessModal, onPostUserData, setErrorModal) => {
    let params = {
        description: 'Test API',
        enabled: true,
        name: value
    };
    apigateway.createApiKey(params, function (err, data) {
        if (err) {
            setErrorModal(err)
        }
        else {
            let updatedObj = { ...data }
            data['name'] = value
            let jsonData = createAWSjson(updatedObj, userId, type);
            onPostUserData(jsonData); 
            let planID = apiTypes[type]
            let param = { usagePlanId: planID, keyId: data['id'], keyType: "API_KEY" }
            apigateway.createUsagePlanKey(param, function (err, data) {
                if (err) {
                    setErrorModal(err)
                } else {
                    showSuccessModal(true);
                }
            });
        }
    });
}

// update name and status of the AWS api key
export const updateAWSApi = (data, apiData, userId, onUpdateUserData, toggleFunction, setErrorModal) => {
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
            let type='update';
            let jsonData = createAWSjson(updatedObj, userId, type);
            onUpdateUserData(jsonData, key);
            toggleFunction(false)
        }
    });
}
// delete AWS api key
export const deletAWSApiKey = (key, toggleShowSpinnerForContent, apiData, onDeleteUserData, setErrorModal) => {
    console.log("key is", key);
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

