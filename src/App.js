import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";
import cookie from "react-cookies";
import { get } from "./utils/API";
import { ACCESS_KEY, SECRET_KEY } from "./utils/Constants";
import Routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const { data } = await get(
        `/api/Access/PublicToken?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}`
      );
      cookie.save("PublicAuthKey", data.PublicAuthKey, { path: "/" });
    } catch (e) {
      console.log("data", e.message);
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
