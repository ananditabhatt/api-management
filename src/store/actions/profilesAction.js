import * as actionTypes from './constants';
import axios from '../../axios-users';
import { getUserData } from './manageUsersAction';
import { getRoles } from './rbacAction';

//add user profile
export const addUserProfileApiCallStart = () => {
    return {
        type: actionTypes.ADD_PROFILE_API_CALL_START
    };
}
export const addUserProfileApiCallFailure = (err) => {
    return {
        type: actionTypes.ADD_PROFILE_API_CALL_FAIL,
        err: err
    };
}
export const addUserProfileApiCallSuccess = (data) => {
    return {
        type: actionTypes.ADD_PROFILE_API_CALL_SUCCESS,
        data: data
    };
}
// get user profile
export const getUserProfileApiCallStart = () => {
    return {
        type: actionTypes.GET_PROFILE_API_CALL_START
    };
}
export const getUserProfileApiCallfailure = (err) => {
    return {
        type: actionTypes.GET_PROFILE_API_CALL_FAIL,
        err: err
    };
}
export const getUserProfileApiCallSuccess = (data) => {
    return {
        type: actionTypes.GET_PROFILE_API_CALL_SUCCESS,
        data: data
    };
}
// add user profile api call
export const addUserProfile = (data) => {
    console.log("ADD PROFILE DATA ", data);
    return (dispatch => {
        dispatch(addUserProfileApiCallStart());
        axios.put(`/profiles/${data.userId}.json`, data)
            .then(res => {
                dispatch(addUserProfileApiCallSuccess(data));
                dispatch(getUserProfile(data.userId));
            })
            .catch(err => {
                console.log("in post user profile");
                dispatch(addUserProfileApiCallFailure(err));
            })

    });
}
// get user profile info
export const getUserProfile = (userId) => {
    return (dispatch => {
        dispatch(getUserProfileApiCallStart());
        axios.get(`/profiles/${userId}.json`)
            .then(res => {
                dispatch(getUserProfileApiCallSuccess(res.data));
                dispatch(getUserData());
                dispatch(getRoles());
            })
            .catch(err => {
                console.log("in get get UserData");
                dispatch(getUserProfileApiCallfailure(err));
            })

    });
}
//clear profile data
export const clearProfileData = () => {
    return {
        type: actionTypes.CLEAR_PROFILE_DATA
    };
}