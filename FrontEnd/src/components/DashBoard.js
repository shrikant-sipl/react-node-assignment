import React, { Component } from "react";
import NavBar from './NavBar'
// import StandardTabel from './UserTabel';
import UserProfilecard from "./UserProfileCard";
import "./DashBoard.css";

class DashBoard extends Component {

  render() {
    return (
      <div >
        <NavBar />
        <UserProfilecard />
      </div>
    );
  }
}

//  Connect with redux through connect methode
export default DashBoard;

