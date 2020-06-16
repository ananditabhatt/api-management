import * as actionTypes from '../actions/constants';

const initialState = {
    profileInfo: null,
    isSuperUser: null
};

const profilesReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_PROFILE_API_CALL_START:
            console.log("ADD_PROFILE_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.ADD_PROFILE_API_CALL_FAIL:
            console.log("ADD_PROFILE_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.ADD_PROFILE_API_CALL_SUCCESS:
            console.log("ADD_PROFILE_API_CALL_SUCCESS", action.data);
            return {
                ...state,
                profileInfo: action.data,
            };
        case actionTypes.GET_PROFILE_API_CALL_START:
            console.log("GET_PROFILE_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.GET_PROFILE_API_CALL_FAIL:
            console.log("GET_PROFILE_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.CLEAR_PROFILE_DATA:
            console.log("CLEAR_PROFILE_DATA");
            return {
                state: { ...initialState }
            };
        case actionTypes.GET_PROFILE_API_CALL_SUCCESS:
            console.log("GET_PROFILE_API_CALL_SUCCESS", action.data);
            console.log("ACTION DATA IN REDUCER : ", action.data);
            let isSuperUser = false;
            if (action.data.role && action.data.role === 'superuser') {
                isSuperUser = true
            }
            return {
                ...state,
                profileInfo: action.data,
                isSuperUser: isSuperUser
            };
        default:
            return state;
    }
};

export default profilesReducer;