import {createStore,applyMiddleware} from "redux";
import rootReducer from "../reducers/index";
import promise from 'redux-promise';
import thunk from "redux-thunk";

/**
 * @name:create store
 * @description:create common store for all components and apply redux thunk middleware 
 */
const StoreWithMiddleware=applyMiddleware(thunk,promise)(createStore);

/**
 *passing rootreducer in this store
*/

export default StoreWithMiddleware(rootReducer) 
