import axios from 'axios';
import { GET_USER, GET_ALL_USERS, UPDATE_USER, DELETE_USERS, CREATE_USER, USER_DATA } from './Types';


/**
 * GetAll user action
 * @param data
 * @param callback
 * @returns {function(*)}
 */
export function getAllUser(data, callback) {
    const request = axios.post(`${process.env.REACT_APP_API_URL}allUsers`, data);
    return (dispatch) => {
        request.then((response) => {
            callback(response);
            dispatch({
                type: GET_ALL_USERS,
                payload: response.data
            })
        })
            .catch(function (error) {
                return error
            });
    }
}





/**
 * UpdateUser action
 * @param data
 * @param callback
 * @returns {function(*)}
 */
export function updateUser(data, callback) {
    const request = axios.put(`${process.env.REACT_APP_API_URL}updateUser`, data);
    return (dispatch) => {
        request.then((response) => {
            callback(response);
            dispatch({
                type: UPDATE_USER,
                payload: response.data
            })
        })
            .catch(function (error) {
                return error
            });
    }
}

export function setUserData(data) {
   
    return (dispatch) => {
        dispatch({
            type: USER_DATA,
            payload: data
        })
    }
}

