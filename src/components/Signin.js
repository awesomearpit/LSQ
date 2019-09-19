import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";
import cookie from "react-cookies";
import { signIn } from "../utils/API";
import { ToastContainer, toast } from "react-toastify";
import { validateEmail } from "../utils/Validation";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        emailError: null,
        passwordError: null,
      },
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    this.validateAllInputs();
    if (this.isPresentAllInputs()) {
      const loginData = {
        EmailAddress: this.state.email,
        Password: this.state.password,
      };

      try {
        const { data } = await signIn(loginData);
        console.log("data login", data);
        cookie.save("AuthKey", data.AuthKey, { path: "/" });
        cookie.save("LeadId", data.LeadId, { path: "/" });
        this.props.history.push("/dashboard");
      } catch (e) {
        toast.error(e.response.data.ExceptionMessage);
      }
    } else {
      toast.error("Enter valid email address and password");
    }
  };

  validateAllInputs = () => {
    const errors = {
      passwordError: null,
    };
    errors.emailError = validateEmail(this.state.email);
    this.setState({ errors });
  };

  isPresentAllInputs = () => {
    return this.state.email && this.state.password;
  };

  render() {
    const { email, password } = this.state;
    return (
      <>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Login</h4>
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </div>
            <div className="text-right">
              <Link to={`/forgotPassword`}>Forgot Password?</Link>
            </div>
            <div className="form-group">
              <button
                onClick={this.login}
                className="btn btn-primary btn-block"
              >
                {" "}
                Login{" "}
              </button>
            </div>
            <p className="text-center">
              Not Registered? <Link to={`/`}>Create Account</Link>{" "}
            </p>
          </article>
        </div>
      </>
    );
  }
}

export default withRouter(Signin);
