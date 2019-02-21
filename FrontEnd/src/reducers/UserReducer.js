/** Import constant */
import { GET_ALL_USERS, USER_DATA } from "../actions/Types";

/** initialize the state */
const INITIAL_STATE = {
    userList: [],
    userData: {
        firstName: '',
        lastName: ''
    }  
    
}
export default (state = INITIAL_STATE, action) =>
{    
    switch(action.type)
    {   
        case GET_ALL_USERS:
                    return { ...state, userList:action.payload };
                    case USER_DATA:
                    return { ...state, userData:action.payload };           
        default:
            return state;
    }
}