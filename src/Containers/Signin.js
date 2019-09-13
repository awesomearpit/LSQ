import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";
import cookie from "react-cookies";
import { signIn } from "../Utils/API";


class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    if (this.emailValidity() && this.state.password) {
     const loginData = {
      "EmailAddress": this.state.email,
      "Password": this.state.password
     }

     try {
      const {data} = await signIn(loginData);
      cookie.save("AuthKey", data.AuthKey, { path: "/" });
      this.props.history.push("/dashboard");
    } catch (e) {
      console.log(e.message);
    }
    } else {
      alert("Enter valid email address and password");
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
    const { email, password, role } = this.state;
    return (
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ "max-width": "400px" }}>
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
            <button onClick={this.login} className="btn btn-primary btn-block">
              {" "}
              Login{" "}
            </button>
          </div>
          <p className="text-center">
            Not Registered? <Link to={`/`}>Create Account</Link>{" "}
          </p>
        </article>
      </div>
    );
  }
}

export default withRouter(Signin);
