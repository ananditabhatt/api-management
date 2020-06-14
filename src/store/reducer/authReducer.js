import * as actionTypes from '../actions/constants'
import { updateObject } from "../utility";

let initialState = {
    token: null,
    userId: null,
    error: null,
    spinner: null,
    email: null
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, spinner: true });
}
const authSuccess = (state, action) => {
    return updateObject(state, { error: null, spinner: false, token: action.idToken, userId: action.userId });
}

const authFailure = (state, action) => {
    return updateObject(state, { error: action.error, spinner: false });
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
}

const authReset_Start = (state, action) => {
    return updateObject(state, { error: null, spinner: true, email: null });
}
const authReset_Success = (state, action) => {
    return updateObject(state, { error: null, spinner: false, email: action.email });
}

const authReset_Failure = (state, action) => {
    return updateObject(state, { error: action.error, spinner: false });
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAILED: return authFailure(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.AUTH_RESET_START: return authReset_Start(state, action)
        case actionTypes.AUTH_RESET_SUCCESS: return authReset_Success(state, action)
        case actionTypes.AUTH_RESET_FAILED: return authReset_Failure(state, action)
        default: return state;
    }
};
export default auth;
