import * as actionTypes from '../actions/constants';

const initialState = {
    profileInfo: null
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
            console.log("ADD_PROFILE_API_CALL_SUCCESS");
            return {
                ...state
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
        case actionTypes.GET_PROFILE_API_CALL_SUCCESS:
            console.log("GET_PROFILE_API_CALL_SUCCESS", action.data);
            return {
                ...state,
                profileInfo: action.data
            };
        default:
            return state;
    }
};

export default profilesReducer;