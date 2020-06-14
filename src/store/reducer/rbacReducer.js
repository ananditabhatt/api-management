import * as actionTypes from '../actions/constants';

const initialState = {};

const rbacReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROLES_API_CALL_START:
            console.log("GET_ROLES_API_CALL_START");
            return {
                ...state
            };
        case actionTypes.GET_ROLES_API_CALL_FAIL:
            console.log("GET_ROLES_API_CALL_FAIL");
            return {
                ...state
            };
        case actionTypes.GET_ROLE_API_CALL_SUCCESS:
            console.log("GET_ROLE_API_CALL_SUCCESS", action.data);
            return {
                ...state,
                roles: action.data
            };
        default:
            return state;
    }
};

export default rbacReducer;