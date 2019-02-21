import React, { Component } from "react";
import LoginModal from "./login/LoginModal";

class HomePage extends Component {
   
    render() {
        return (
            <div>
                <h1>Welcome to the HomePage</h1>
                <LoginModal />
            </div>
        );
    }
}

export default HomePage;
