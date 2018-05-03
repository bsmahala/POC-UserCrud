import { loginActions } from './actionNames';
import { httpClient } from "../http/HttpClient";
import { URLS } from "../constants/URL";

// login dispatch
export const login = (logindata={}) => {
    return dispatch => dispatch({type: loginActions.LOGIN, payload : logindata})
}
// login action for rest api
export const loginAction = (data, successcallback) => httpClient
           .post(URLS.login, data)
           .then((dispatch, token)=> {
                dispatch({type: loginActions.LOGIN, payload : {token} })
                successcallback(token)
            }
        );

// logout dispatch
export const dispatchLogout = (dispatch) => {
    dispatch({type: loginActions.LOGIN, payload : {}})
}