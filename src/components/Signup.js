import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";
import { register } from "../utils/API";
import {
  checkPassword,
  validateName,
  validateEmail,
  validateMobile,
} from "../utils/Validation";
import { ToastContainer, toast } from "react-toastify";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobileNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        nameError: null,
        mobileError: null,
        emailError: null,
        passwordError: null,
        confirmPasswordError: null,
      },
    };
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  signUp = async () => {
    this.validateAllInputs();
    if (this.validityCheck()) {
      const signupData = {
        LeadFields: [
          {
            Attribute: "FirstName",
            Value: `${this.state.name}`,
          },
          {
            Attribute: "Mobile",
            Value: `${this.state.mobileNo}`,
          },
          {
            Attribute: "mx_Portal_Confirm_Password",
            Value: `${this.state.confirmPassword}`,
          },
          {
            Attribute: "mx_Portal_Password",
            Value: `${this.state.password}`,
          },
          {
            Attribute: "EmailAddress",
            Value: `${this.state.email}`,
          },
        ],
      };
      try {
        const { data } = await register(signupData);
        toast.success(data.Message, { autoClose: 2000 });
        setTimeout(() => this.props.history.push("/login"), 3000);
      } catch (e) {
        toast.error(e.response.data.ExceptionMessage);
      }
    } else {
      toast.error("Enter valid Details");
    }
  };

  validatePassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return;
    }
    return "Didn't Match, Try Again.";
  };

  validateAllInputs = () => {
    const errors = {
      nameError: null,
      mobileError: null,
      companyNameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
    };
    errors.nameError = validateName(this.state.name);
    errors.mobileError = validateMobile(this.state.mobileNo);
    errors.passwordError = checkPassword(this.state.password);
    errors.emailError = validateEmail(this.state.email);
    errors.confirmPasswordError = this.validatePassword(
      this.state.password,
      this.state.confirmPassword
    );
    this.setState({ errors });
  };

  validityCheck = () => {
    return (
      this.state.name &&
      this.state.mobileNo &&
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword
    );
  };

  render() {
    const { name, mobileNo, email, password, confirmPassword } = this.state;

    return (
      <>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user" />{" "}
                </span>
              </div>
              <input
                name="name"
                className="form-control"
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={this.changeHandler}
              />
            </div>
            {this.state.errors.nameError ? (
              <span style={{ color: "red" }}>
                {this.state.errors.nameError}
              </span>
            ) : null}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-mobile" />{" "}
                </span>
              </div>
              <input
                name="mobileNo"
                className="form-control"
                placeholder="Mobile Number"
                type="text"
                value={mobileNo}
                onChange={this.changeHandler}
              />
            </div>
            {this.state.errors.mobileError ? (
              <span style={{ color: "red" }}>
                {this.state.errors.mobileError}
              </span>
            ) : null}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope" />{" "}
                </span>
              </div>
              <input
                name="email"
                className="form-control"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={this.changeHandler}
              />
            </div>
            {this.state.errors.emailError ? (
              <span style={{ color: "red" }}>
                {this.state.errors.emailError}
              </span>
            ) : null}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock" />{" "}
                </span>
              </div>
              <input
                name="password"
                className="form-control"
                placeholder="Create password"
                type="password"
                value={password}
                onChange={this.changeHandler}
              />
            </div>
            {this.state.errors.passwordError ? (
              <span style={{ color: "red" }}>
                {this.state.errors.passwordError}
              </span>
            ) : null}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock" />{" "}
                </span>
              </div>
              <input
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={this.changeHandler}
              />
            </div>
            {this.state.errors.confirmPasswordError ? (
              <span style={{ color: "red" }}>
                {this.state.errors.confirmPasswordError}
              </span>
            ) : null}
            <div className="form-group">
              <button
                onClick={this.signUp}
                className="btn btn-primary btn-block"
              >
                {" "}
                Create Account{" "}
              </button>
            </div>
            <p className="text-center">
              Have an account? <Link to={`/login`}>Log In</Link>{" "}
            </p>
          </article>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
