import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
/**
 * BootStrap 4 NavBar
 */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">React-Base-App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">My Profile <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profileCards">ProfileCards</a>
            </li>
           
          </ul>

          {/* NavBar Search functionality */}
          {this.props.searchBar && (
             <form className="form-inline my-2 my-lg-0">
             <input className="form-control mr-sm-2" onChange={(e) => this.props.searchBar(e)} type="search" placeholder="Search" aria-label="Search" />
           </form>
          ) || <div/>}
         

          <Link to="/logout" className="btn btn-md btn-danger pull-right ">Logout</Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
