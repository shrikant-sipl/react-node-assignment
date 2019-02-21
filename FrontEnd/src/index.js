import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index"
import * as serviceWorker from "./serviceWorker";
import ReduxToastr from "react-redux-toastr";
require('dotenv').config();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

// //Remove all console.* statements
// console.log = () => { };
// console.error = () => { };

/**
 * Finally Dom rendering of custom Routes in wrapper of store Provider
 */
ReactDOM.render(<Provider store={store}>

       <ReduxToastr
          timeOut={1000}
          newestOnTop={true}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          closeOnToastrClick
     /> 
     <App/>

</Provider >
     , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
