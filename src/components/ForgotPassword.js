import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";
import { post } from "../utils/API";
import { SECRET_KEY, ACCESS_KEY } from "../utils/Constants";
import { ToastContainer, toast } from "react-toastify";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  forgotPassword = async () => {
    if (this.emailValidity()) {
      const forgotPassData = {
        EmailAddress: this.state.email,
      };

      try {
        const { data } = await post(
          `/api/Authentication/ForgotPassword?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}`,
          forgotPassData
        );
        toast.success("Email Sent", { autoClose: 2000 });
        setTimeout(() => this.props.history.push("/login"), 3000);
        this.props.history.push("/login");
      } catch (e) {
        toast.error(e.response.data.ExceptionMessage);
      }
    } else {
      toast.error("Enter valid email address");
    }
  };

  emailValidity = () => {
    return (
      this.state.email &&
      this.state.email.includes("@") &&
      this.state.email.includes(".")
    );
  };

  render() {
    const { email } = this.state;
    return (
      <>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Forgot Password</h4>
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
            <div className="form-group">
              <button
                onClick={this.forgotPassword}
                className="btn btn-primary btn-block"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
            <p className="text-center">
              Not Registered? <Link to={`/`}>Create Account</Link>{" "}
            </p>
            <p className="text-center">
              <Link to={`/login`}>Sign In</Link>{" "}
            </p>
          </article>
        </div>
      </>
    );
  }
}

export default withRouter(ForgotPassword);
