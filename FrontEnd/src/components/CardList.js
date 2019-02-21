import React, { Component } from "react";
import "./ProfileCard.css";
import defaultImage from "../defaultProfile.png";
import { getAllUser } from "../actions/UserActions"
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form"
import { focusOnError, renderLoginTextInputField, renderLoginPasswordInputField, renderCheckboxInputField } from "./layouts/FormInputs";
import { validateEmail, required } from "../common/validation";
import ProfileCard from "./ProfileCard";
import NavBar from "./NavBar"
import {Imagepath} from "../common/serverimagePath"



class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            searchedData: [],
            //Default data send to API
            APIdata: {
                pageNo: 1,
                pageLimit: "",
                searchBy: "",
                searchFor: "",
                sortBy: "firstName",
                sortType: -1,
                showModal: false,
                searchValue: ""
            },

        }
    }

    //Call UserList API for fetch the list of alert history of
    getUserList() {
        var self = this;

        self.props.getAllUser(this.state.APIdata, function (response) {

            self.setState({
                userList: response.data
            })
        });
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    showModalData = (userData) => {
        this.setState({ showModal: true, userData: userData })
    }

    renderCard = () => {
        let min = Math.ceil(0);
        let max = Math.floor(this.state.userList.length);
        let random1 = Math.floor(Math.random() * (max - min) + min);
        let random2 = Math.floor(Math.random() * (max - min) + min);
        let ImagepathLocal = "";

        if (this.state.searchedData.length > 0) {
            return this.state.searchedData.map((el, i) => {
                ImagepathLocal = el.profileImage ? Imagepath + el.profileImage : defaultImage

                return (

                    <div key={i} className="card" onClick={() => this.showModalData(el)}>
                        {this.state.showModal && <ProfileCard user={el} />}
                        <center><img src={ImagepathLocal} alt="Avatar" className="profileImage" /></center>
                        <div className="container">
                            <center> <h4><b>{el.name}</b></h4></center>
                        </div>
                    </div>
                )
            })
        }
        else {
            return this.state.userList.map((el, i) => {
                if (random1 == i || random2 === i) {
                    ImagepathLocal = el.profileImage ? Imagepath+ el.profileImage : defaultImage
                    return (

                        <div key={i} className="card" onClick={() => this.showModalData(el)}>

                            <center><img src={ImagepathLocal} alt="Avatar" className="profileImage" /></center>
                            <div className="container">
                                <center> <h4><b>{el.name}</b></h4></center>
                            </div>
                        </div>
                    )
                }
            })
        }
    }
    // {thistate.showModal && <LoginModal/>}
    /**
    * @desc Calling a Action with Default props
    */
    componentWillMount() {
        this.getUserList();
    }

    searchChange = (e) => {
        // console.log()
        let MatchedData = this.state.userList.filter(v => v.name.toLowerCase().includes(e.target.value));
        this.setState({
            searchedData: MatchedData
        })
    }

    render() {
        if (this.state.userList.length > 0 || this.state.searchedData.length > 0) {
            return (
                <div >
                   <NavBar searchBar  = {this.searchChange}/>

                    <div className="card-list">
                        {this.renderCard()}
                    </div>

                    {this.state.showModal && <ProfileCard user={this.state.userData} handleClose={this.handleClose} />}
                </div>
            )
        } else {
            return <div>Loading...</div>
        }

    }
}

function mapStateToProps(state) {
    let returnObj = {};
    returnObj.usersList = state.users.userList;
    return returnObj;
}

//  Connect with redux through connect methode
CardList = connect(mapStateToProps, { getAllUser })(CardList);

//Exporting our app class && provide the props about the form state
export default reduxForm({

    // Assign unique name for the form
    form: "CardList",
    // validate,
    onSubmitFail: (errors) => {
        focusOnError(errors)
    }
})(CardList)
