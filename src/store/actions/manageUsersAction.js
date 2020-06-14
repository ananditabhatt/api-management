import * as actionTypes from './constants';
import axios from '../../axios-users'

//add user data
export const addUserApiCallStart = () => {
    return {
        type: actionTypes.ADD_USER_API_CALL_START
    };
}

export const addUserApiCallFailure = (err) => {
    return {
        type: actionTypes.ADD_USER_API_CALL_FAIL,
        err: err
    };
}

export const addUserApiCallSuccess = (data) => {
    return {
        type: actionTypes.ADD_USER_API_CALL_SUCCESS,
        data: data
    };
}
//delete user data
export const deleteUserApiCallStart = () => {
    return {
        type: actionTypes.DELETE_USER_API_CALL_START
    };
}

export const deleteUserApiCallFailure = (err) => {
    return {
        type: actionTypes.DELETE_USER_API_CALL_FAIL,
        err: err
    };
}

export const deleteUserApiCallSuccess = (data) => {
    return {
        type: actionTypes.DELETE_USER_API_CALL_SUCCESS,
        data: data
    };
}
//update user data
export const updateUserApiCallStart = () => {
    return {
        type: actionTypes.UPDATE_USER_API_CALL_START
    };
}

export const updateUserApiCallFailure = (err) => {
    return {
        type: actionTypes.UPDATE_USER_API_CALL_FAIL,
        err: err
    };
}

export const updateUserApiCallSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_USER_API_CALL_SUCCESS,
        data: data
    };
}
// get users
export const getUsersApiCallStart = () => {
    return {
        type: actionTypes.GET_USER_API_CALL_START
    };
}

export const getUsersApiCallfailure = (err) => {
    return {
        type: actionTypes.GET_USER_API_CALL_FAIL,
        err: err
    };
}

export const getUsersApiCallSuccess = (data) => {
    return {
        type: actionTypes.GET_USERS_API_CALL_SUCCESS,
        data: data
    };
}
// get user call
export const getUserData = () => {
    return(dispatch => {
        dispatch(getUsersApiCallStart());  
        axios.get('/userData.json')
            .then(res => { 
                dispatch(getUsersApiCallSuccess(res.data));           
            })
            .catch(err => 
                {
                    console.log("in get get UserData");
                    dispatch(getUsersApiCallfailure(err));
                })

    });
}
// add user call
export const postUserData = (data) => {
    return(dispatch => {
        dispatch(addUserApiCallStart());  
        axios.post('/userData.json', data)
            .then(res => { 
                dispatch(getUserData()); 
                dispatch(addUserApiCallSuccess(data));          
            })
            .catch(err => {
                console.log("in post user data");
                dispatch(addUserApiCallFailure(err));
            } )

    });
}
// delete user call
export const deleteUserData = (userId) => {
    return(dispatch => {
        dispatch(deleteUserApiCallStart()); 
        console.log("userId TO DELETE IS",userId) 
        axios.delete(`/userData/${userId}.json`)
            .then(res => { 
                dispatch(getUserData()); 
                dispatch(deleteUserApiCallSuccess(userId));          
            })
            .catch(err => {
                console.log("in user user data");
                dispatch(deleteUserApiCallFailure(err));
            } )

    });
}
//update user call
export const updateUserData = (userData,key) => {
    return(dispatch => {
        dispatch(updateUserApiCallStart());  
        axios.put(`/userData/${key}.json`, userData)
            .then(res => { 
                dispatch(getUserData()); 
                dispatch(updateUserApiCallSuccess(userData));          
            })
            .catch(err => {
                console.log("in user user data");
                dispatch(updateUserApiCallFailure(err));
            } )

    });
}
