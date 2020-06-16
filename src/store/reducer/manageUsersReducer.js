import * as actionTypes from '../actions/constants';

const initialState = { apiData: null };

const manageUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_API_CALL_START:
            console.log("ADD_USER_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.ADD_USER_API_CALL_FAIL:
            console.log("ADD_USER_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.DELETE_USER_API_CALL_START:
            console.log("DELETE_USER_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.DELETE_USER_API_CALL_FAIL:
            console.log("DELETE_USER_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.UPDATE_USER_API_CALL_START:
            console.log("UPDATE_USER_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.UPDATE_USER_API_CALL_FAIL:
            console.log("UPDATE_USER_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.GET_USER_API_CALL_START:
            console.log("GET_USER_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.GET_USER_API_CALL_FAIL:
            console.log("GET_USER_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.GET_USERS_API_CALL_SUCCESS:
            console.log("GET_USERS_API_CALL_SUCCESS", action.data);
            return {
                ...state,
                apiData: action.data
            };
        case actionTypes.ADD_USER_API_CALL_SUCCESS:
            console.log("ADD_USER_API_CALL_SUCCESS", action.data);
            return {
                ...state,
                apiData: { ...state.apiData }
            };
        case actionTypes.DELETE_USER_API_CALL_SUCCESS:
            console.log("DELETE_USER_API_CALL_SUCCESS");
            return {
                ...state
            };
        case actionTypes.UPDATE_USER_API_CALL_SUCCESS:
            console.log("UPDATE_USER_API_CALL_SUCCESS");
            return {
                ...state
            };
        case actionTypes.CLEAR_API_DATA:
            console.log("CLEAR_API_DATA");
            return {
                state: { ...initialState}
            };
        default:
            return state;
    }
};

export default manageUsersReducer;