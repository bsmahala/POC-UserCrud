import { userActionNames } from './actionNames';
import { httpClient } from "../http/HttpClient";
import { URLS } from "../constants/URL";

// fetch user action
export const fetchUsers = (successcallback) => httpClient
           .get(URLS.userlist)
           .ok(userActionNames.LIST, successcallback);
// select user dispatch
export const selectUser = (user) => ({type: userActionNames.SELECTUSER,  payload: user});
// add user action
export const addUpdateUser = (data, successcallback) => httpClient
           .post(URLS.useraddupdate, data)
           .ok(userActionNames.ADDUPDATE, successcallback);
// delete user action
export const deleteUser = (data, successcallback) => httpClient
           .post(URLS.deleteuser, data)
           .ok(userActionNames.DELETEUSER, successcallback);