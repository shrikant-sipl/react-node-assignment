import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"
import {reducer as toastrReducer} from "react-redux-toastr"
import UserReducer from './UserReducer'
/**
 * calling combineReducer and bind as a rootReducer
 * @params connect all reducer as a key-value pair 
 */
const rootReducer = combineReducers({
  form: formReducer, //Passing Redux form to our Reducer
  toastr: toastrReducer, // <- Mounted at toastr.
  users: UserReducer
});

export default rootReducer;