import * as actionTypes from './constants';
import axios from '../../axios-users'

// get roles
export const getRolesApiCallStart = () => {
    return {
        type: actionTypes.GET_ROLES_API_CALL_START
    };
}

export const getRolesApiCallfailure = (err) => {
    return {
        type: actionTypes.GET_ROLES_API_CALL_FAIL,
        err: err
    };
}
export const getRolesApiCallSuccess = (data) => {
    return {
        type: actionTypes.GET_ROLE_API_CALL_SUCCESS,
        data: data
    };
}
// get roles call
export const getRoles = () => {
    return(dispatch => {
        dispatch(getRolesApiCallStart());  
        axios.get('/roles.json')
            .then(res => { 
                dispatch(getRolesApiCallSuccess(res.data));           
            })
            .catch(err => 
                {
                    console.log("in get role");
                    dispatch(getRolesApiCallfailure(err));
                } 
                )

    });
}