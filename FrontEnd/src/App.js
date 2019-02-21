import React, { Component } from "react";

import CustomRoutes from "./Router.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.logUserIn = this.logUserIn.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
  }

  componentDidMount() {
    const key = "isLoggedIn";
    if (localStorage.hasOwnProperty(key)) {
      let value = localStorage.getItem(key);
      value = value === "true";
      this.setState({ [key]: value });
    }
  }

  logUserIn() {
    this.setState({ isLoggedIn: true });
  }

  logUserOut() {
    const key = "rememberCredential";
    this.setState({ isLoggedIn: false });
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("loggedInDetail", "");

    let value = localStorage.getItem(key);
    value = (value !== "") ? JSON.parse(value) : "";
    if (value !== "") {
      if (!value.rememberMe && value.rememberMe !== null) {
        localStorage.setItem(key, "");
        this.setState({ [key]: "" });
      }
      // else{
      //   localStorage.setItem(key,value);
      // }
    }
    window.location.assign('/');
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" render={
              (props) => <CustomRoutes {...props}
                isLoggedIn={this.state.isLoggedIn}
                logUserIn={this.logUserIn}
                logUserOut={this.logUserOut}

              />
            } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
