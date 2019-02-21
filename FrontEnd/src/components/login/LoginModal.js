import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../../actions/auth/AuthActions";
import { langs } from "../../config/localization";
import { validateEmail, validatePassword, required, number, maxLength30, alphabetsOnly, minLength10, maxLength10 } from "../../common/validation";
import { renderTextInputField, renderPasswordInputField, renderEmailInputField, renderFileInputField, focusOnError } from "../layouts/FormInputs";
import { toastr } from "react-redux-toastr";
import "../Toastr.css";
import "./LoginModal.css";

class LoginModal extends Component {
    constructor(props) {
        super(props);

        // default position of our state
        this.state = {

            name: "",
            username: "",
            visible: false,
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
        this.setState({
            visible: false
        });
    }

    /**
     * @name handleChange
     * @param {*} event 
     * @description Handle all input change set into state
     * @return {*}
     */
    handleChange = (event) => {
        alert("abc test")
        // for common fields   
        this.setState({
            [event.target.name]: event.target.value
        })

    }


 
   /**
     * Submit the login form
     * @param values
     * @desc Calling a login actions && redirecting page based on response and set session Items 
     */
    onSubmit(values) {
        // values.preventDefault();
        
        this.props.login(values, (res) => {

            if (res.status === 200) {

                toastr.success(langs.success, langs.messages.login_success)

                /**Store user credentials and login detail in sessionStorage variable */

                localStorage.setItem("rememberCredential", (values.rememberMe === true ? JSON.stringify(values) : ""))

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", res.data.user._id);
                localStorage.setItem("loggedInDetail", JSON.stringify(res.data));
                //Redirect to a dashBoard page
                setTimeout(function () {
                    window.location.assign("/dashboard");
                }, 1000)
            } else {

                //Showing Multiple Errors
                if (res.status === 400) {
                    alert("login failed ")

                    toastr.error(langs.error, langs.messages.invalid_credentials)
                } else {
                    toastr.error(langs.error, langs.messages.default_error);
                }
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <div>
                    <button className="btn btn-success deleteBtn" value="create" onClick={() => this.openModal()}>Login</button>
                </div>

                <Modal visible={this.state.visible} width="555" height="550" overflow="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="container">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                            <h3>Login User</h3>

                            <Field
                                name="email"
                                label="Email"
                                placeholder="Enter your Email"
                                validate={[required]}
                                required={true}
                                component={renderEmailInputField}
                            />
                            <Field
                                name="password"
                                label="Password"
                                placeholder="Enter Password"
                                validate={[required]}
                                required={true}
                                component={renderPasswordInputField}
                            />
                            <br />
                            <br />
                            <button className="btn btn-md btn-success submitBtn" type="submit" >Login</button>
                        </form>
                    </div>
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
LoginModal = connect(null, { login })(LoginModal);

//Exporting our app class && provide the props about the form state
export default reduxForm({
    // a unique name for the form
    form: "Login",
    validate,
    onSubmitFail: (errors) => {
        focusOnError(errors)
    }
})(LoginModal)

