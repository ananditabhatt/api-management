import * as actionTypes from '../actions/constants'
import { updateObject } from "../utility";

let initialState = {
    token: null,
    userId: null,
    error: null,
    spinner: null,
    email: null,
    apiData: null,
    profileInfo: null,
    isSuperUser: null,
    isSignUpWindow:null
};

const authStart = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        error: null,
        email: null,
        apiData: null,
        profileInfo: null,
        isSuperUser: null,
        spinner: true,
        
    });
}
const authSuccess = (state, action) => {
    return updateObject(state, { error: null, spinner: false, token: action.idToken, userId: action.userId, email: action.email,isSignUpWindow:null });
}

const authFailure = (state, action) => {
    return updateObject(state, { error: action.error, spinner: false });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        error: null,
        email: null,
        apiData: null,
        profileInfo: null,
        isSuperUser: null,
        spinner: false
    });
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
const authSignUp_Window = (state, action) => {
    return updateObject(state, {  isSignUpWindow: true });
}

const authCancel_Window = (state, action) => {
    return updateObject(state, {  isSignUpWindow: false });
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
        case actionTypes.AUTH_SIGNUP_WINDOW: return authSignUp_Window(state, action)
        case actionTypes.AUTH_CANCEL_WINDOW: return authCancel_Window(state, action)
        
        default: return state;
    }
};
export default auth;
