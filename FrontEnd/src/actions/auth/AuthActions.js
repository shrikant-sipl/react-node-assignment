import axios from "axios";
require("dotenv").config();


/**
 * User login action
 * @param data
 * @param callback
 * @returns {function(*)}
 */
export function login(data,callback){   
    const request = axios.post(`${process.env.REACT_APP_API_URL}auth/login`, data);

    return (dispatch)=> {
        request.then((data) => {

            callback(data);
        })
        .catch(function (error) {
            callback(error);
        });
    }
}

