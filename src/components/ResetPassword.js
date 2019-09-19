import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";
import { post } from "../utils/API";
import { SECRET_KEY, ACCESS_KEY } from "../utils/Constants";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      leadId: "",
      tempPassword: "",
    };
  }

  componentDidMount() {
    const { leadId, tempPassword } = this.props.match.params;
    this.setState({ leadId: leadId, tempPassword: tempPassword });
    console.log("idss", this.state.leadId, this.state.tempPassword);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetPassword = async () => {
    if (this.passwordValidity()) {
      const resetPassData = {
        Password: this.state.password,
        LeadId: this.state.leadId,
        TemporaryPassword: this.state.tempPassword,
      };

      try {
        const { data } = await post(
          `/api/Authentication/ResetPassword?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}`,
          resetPassData
        );
        console.log("Reset password", data);
        this.props.history.push("/login");
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert("Enter valid password");
    }
  };

  passwordValidity = () => {
    return this.state.password && this.state.confirmPassword;
  };

  render() {
    console.log("idss", this.state.leadId, this.state.tempPassword);
    const { password, confirmPassword } = this.state;
    return (
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
          <h4 className="card-title mt-3 text-center">Reset Password</h4>
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
              placeholder="New Password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
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
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button
              onClick={this.resetPassword}
              className="btn btn-primary btn-block"
            >
              {" "}
              Reset{" "}
            </button>
          </div>
          <p className="text-center">
            <Link to={`/login`}>Sign In</Link>{" "}
          </p>
        </article>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
