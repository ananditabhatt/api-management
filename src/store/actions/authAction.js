import * as actionTypes from "./constants";
import axios from '../../axios-users';
import firebase from "firebase";
import { addUserProfile, clearProfileData } from './profilesAction';
import { clearAPIdata } from "./manageUsersAction";


export const authStart = () => {
    return ({
        type: actionTypes.AUTH_START
    })
}

export const authSuccess = (idToken, userId, email) => {
    return ({
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
        email:email
    })
}

export const authFailure = (error) => {
    return ({
        type: actionTypes.AUTH_FAILED,
        error: error
    })
}

export const AC_authLogout = () => {
    return (dispatch) => {
        dispatch(clearProfileData());
        dispatch(clearAPIdata());
        dispatch(AC_authClearLocalStorage());
    }
    
}

export const AC_authClearLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('ExpirationDate');
    localStorage.removeItem('userID');
    return ({
        type: actionTypes.AUTH_LOGOUT,
    })
}

export const authExpiration = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(AC_authLogout())
        }, expirationTime * 1000)
    }
}

export const AC_auth_google = () => {
    return (dispatch => {
        dispatch(authStart())
        try {
            firebase.initializeApp({
                apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            });
        } 
        catch (err) {
            if (!/already exists/.test(err.message))
                console.error("Firebase initialization error raised", err.stack);
        }
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log("GOOGLE RESULE ",result);
            let token = result.credential.idToken;
            let userId = result.user.uid;
            let email = result.user.email;
            const ExpirationDate = new Date(new Date().getTime() + 3600000)
            localStorage.setItem('token', token);
            localStorage.setItem('ExpirationDate', ExpirationDate);
            localStorage.setItem('userID', userId);
            dispatch(authSuccess(token, userId, email));
            dispatch(authExpiration(3600));
            let data = { userId: result.user.uid, email: result.user.email, role: 'user'}
            dispatch(addUserProfile(data));
        });
    })
}

export const AC_auth = (email, password, isSignUp) => {
    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let url = process.env.REACT_APP_FIREBASE_SIGNUP_URL
    if (!isSignUp) {
        url = process.env.REACT_APP_FIREBASE_SIGNIN_URL
    }
    return (dispatch => {
        dispatch(authStart())
        axios.post(url,data)
            .then(Response => {
                const ExpirationDate = new Date(new Date().getTime() + Response.data.expiresIn * 1000)
                localStorage.setItem('token', Response.data.idToken);
                localStorage.setItem('ExpirationDate', ExpirationDate);
                localStorage.setItem('userID', Response.data.localId);
                localStorage.setItem('email', Response.data.email);
                dispatch(authSuccess(Response.data.idToken, Response.data.localId,Response.data.email ));
                dispatch(authExpiration(Response.data.expiresIn));
                let role = 'user';
                if(Response.data.email.toUpperCase().includes('ROOT')){
                    role = 'superuser';
                }
                console.log("THE ROLE IS :");
                let data = { userId: Response.data.localId, email: Response.data.email, role: role}
                if(isSignUp)
                    dispatch(addUserProfile(data));

            })
            .catch(error => {
                console.log(error.response);
                dispatch(authFailure(error.response.data.error.message));
            });
    })
}

export const AC_Auth_CheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(AC_authLogout());
        }
        else {
            const ExpirationDate = new Date(localStorage.getItem('ExpirationDate'));
            const userID = localStorage.getItem('userID');
            const email = localStorage.getItem('email');
            if (ExpirationDate > new Date().getTime()) {
                dispatch(authSuccess(token, userID, email));
                dispatch(authExpiration((ExpirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else {
                dispatch(AC_authLogout());
            }
        }
    }

}

export const authReset_Start = () => {
    return ({
        type: actionTypes.AUTH_RESET_START
    })
}

export const authReset_Success = (email) => {
    return ({
        type: actionTypes.AUTH_RESET_SUCCESS,
        email: email,

    })
}

export const authReset_Failure = (error) => {
    return ({
        type: actionTypes.AUTH_RESET_FAILED,
        error: error
    })
}

export const AC_authReset = (email) => {
    const data = {
        requestType: 'PASSWORD_RESET',
        email: email
    }
    let url = process.env.REACT_APP_FIREBASE_RESET_URL;
    return dispatch => {
        dispatch(authReset_Start());
        axios.post(url, data)
            .then(Response => {
                console.log(" success console in reset ", Response.data)
                dispatch(authReset_Success(Response.data.email));
            })
            .catch(error => {
                console.log(" errorconsole in reset ", error.response.data.error.message)
                dispatch(authReset_Success(error.response.data.error.message));
            })
    }

}

export const AC_SignUpwindow= () => {
    return ({
        type: actionTypes.AUTH_SIGNUP_WINDOW,
        
    })
}