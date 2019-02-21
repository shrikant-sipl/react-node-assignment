import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import defaultImage from "../defaultProfile.png";
import { focusOnError, renderLoginTextInputField, renderLoginPasswordInputField, renderCheckboxInputField } from "./layouts/FormInputs";
import {Imagepath} from "../common/serverimagePath"



import { toastr } from "react-redux-toastr";
// import "./login./LoginModal.css";

class MyModal extends Component {
    constructor(props) {
        super(props);

        // default position of our state
        this.state = {

            name: "",
            username: "",
            visible: true,
        }
    }

    /**
     * @name openModal
     * @param {*}
     * @description open model box on click
     * @return {*} 
     */
    openModal() {
        this.setState({
            visible: true
        });
    }

    /**
    * @name closeModal
    * @param {*}
    * @description close model box on click
    * @return {*} 
    */
    closeModal() {
        this.props.handleClose();

    }





    render() {
        const { handleSubmit } = this.props;
        
        const Imagepath = this.props.user.profileImage ? Imagepath +this.props.user.profileImage : defaultImage

        return (
            <div>
                <div>
                    <button className="btn btn-success deleteBtn" value="create" onClick={() => this.openModal()}>New User</button>
                </div>

                <Modal visible={this.state.visible} width="555" height="550" overflow="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>

                    <center>

                        <p><img src={Imagepath} alt="Avatar" className="profileImage" /></p>
                        <p><label>Name :</label><span>{this.props.user.name}</span></p>
                        <p> <label>Email :</label><span>{this.props.user.email}</span></p>
                    </center>
                </Modal>
            </div>
        );
    }
}

/**
 * Form validations
 * @name validate
 * @param values
 * @returns errors
 */
function validate(values) {
    let errors = {};

    //Check the value should not be empty
    //Checks Email validation with .com & @
    // if (!values.email) {
    //     errors.email = langs.validation_messages.email_required;
    // } else if (validateEmail(values.email)) {
    //     errors.email = langs.validation_messages.email_pattern;
    // }

    //Validate password - must have Alphanumeric
    // if (!values.password) {
    //     errors.password = langs.validation_messages.password_required;
    // } else if (validatePassword(values.password)) {
    //     errors.password = langs.validation_messages.password_pattern;
    // }
    return errors;
}


//  connect with redux through connect methode
MyModal = connect(null)(MyModal);

//Exporting our app class && provide the props about the form state
export default reduxForm({
    // a unique name for the form
    form: "Login",
    validate,
    onSubmitFail: (errors) => {
        // focusOnError(errors)
    }
})(MyModal)

