import React, { Component } from "react";
import "./UserProfileCard.css";
import defaultImage from "../defaultProfile.png";
import { getAllUser, updateUser, setUserData } from "../actions/UserActions"
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form"
import { focusOnError, renderLoginTextInputField, renderLoginPasswordInputField, renderCheckboxInputField } from "./layouts/FormInputs";
import { validateEmail, required } from "../common/validation";
import axios from "axios";
import {Imagepath} from "../common/serverimagePath"
import { toastr } from "react-redux-toastr";
import "./Toastr.css";




class UserProfileCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: "",
            //Default data send to API
            APIdata: {
                pageNo: 1,
                pageLimit: "",
                searchBy: "",
                searchFor: "",
                sortBy: "firstName",
                sortType: -1,
            },
            currentUser: "",
            firstName: "",
            lastName: "",
            userId: "",
            selectedFile: null,
            file: "",
            imagePreviewUrl: "",
            uploadedFileUrl: "",
            profileImage:defaultImage
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    //Call UserList API for fetch the list of alert history of
    getUserList() {
        var self = this;
        let loggedInUserId = localStorage.getItem("userId");
        self.props.getAllUser(this.state.APIdata, function (response) {
            
            response.data.map((el, i) => {
                if (el._id === loggedInUserId) {
                   
                    self.setState({
                        currentUser: el,
                        userId: el._id,
                        profileImage:Imagepath+el.profileImage
                    });
                    self.props.setUserData({
                        currentUser: el,
                        firstName: el.firstName,
                        lastName: el.lastName,
                        userId: el._id
                    })

                    
                }
            })

        });
    }

    /**
    * @desc Calling a Action with Default props
    */
    componentWillMount() {
        this.getUserList();
    }


    /**
        * Submit the login form
        * @param values
        * @desc Calling a login actions && redirecting page based on response and set session Items 
        */
    onSubmit(values) {
        let updateValues = {
            values: {
                firstName: values.firstName,
                lastName: values.lastName,
                profileImage: this.state.uploadedFileUrl

            },
            userId: this.state.userId
        }
        this.props.updateUser(updateValues, (res) => {
            toastr.success("Success","Your Profile has been Updated Succefully!!")
            // window.location.reload();
        })
    }
    fileChangedHandler = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    uploadHandler = () => {
        const data = new FormData()
        data.append('file', this.state.file, this.state.file.name)
        const request = axios.post(`${process.env.REACT_APP_API_URL}upload`, data)
        request.then((response) => {
            this.setState({
                uploadedFileUrl: response.data.fileName
            })
        })
            .catch(function (error) {
                return error
            });
    }

   

    render() {
        const { handleSubmit } = this.props;


        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="profileImage" />);
        } else {
            $imagePreview = (<img src={this.state.profileImage} alt="Avatar" className="profileImage" />);
        }


        if (this.state.currentUser) {

            return (
                <div className=" container">
                    <div className="user-card">

                        <center>{$imagePreview}</center>
                        
                        <div className="container">
                            <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))} >

                                <div className="input-group form-group">
                                    {/* Login Page Fields */}
                                    <Field
                                        name="firstName"
                                        label="First Name"
                                    
                                        onChange={this.handlefirstNameChange}
                                        component={renderLoginTextInputField} />
                                    {/* <input type="text" name="firstName" value={this.state.firstName} onChange={this.handlefirstNameChange} /> */}
                                </div>
                                <div className="input-group form-group">
                                    <Field
                                        name="lastName"
                                        label="Last Name"
                                        placeholder={this.state.currentUser.lastName}
                                        onChange={this.handlelastNameChange}
                                        component={renderLoginTextInputField} />
                                    {/* <input type="text" name="lastName" value={this.state.lastName} onChange={this.handlelastNameChange} /> */}

                                </div>
                                <div className="input-group form-group">
                                    <input type="file" onChange={this.fileChangedHandler} />
                                    <button type="button" onClick={this.uploadHandler}>Upload!</button>
                                </div>

                                <div className="justify-content-center  ">
                                    <input type="submit" style={{ width: "100%", marginBottom: 10 }} value="Update" className="btn btn-md btn-primary "></input>
                                    <input type="button" style={{ width: "100%" }} value="Cancel" className="btn btn-md btn-danger "></input>
                                </div>

                            </form>
                        </div>
                    </div>
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
    const {userData} = state.users;
    returnObj.initialValues= {
        firstName: userData.firstName,
        lastName: userData.lastName
    } 
    return returnObj;
}


export default connect(mapStateToProps, {getAllUser, updateUser, setUserData})(reduxForm({
    form: 'ProfileCard',
    //validate: validate,
    enableReinitialize: true
})(UserProfileCard));
