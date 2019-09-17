import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import cookie from "react-cookies";
import { logout, get, post } from "../Utils/API";
import { ACCESS_KEY, SECRET_KEY, LEAD_ID } from "../Utils/Constants";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allActivity: {},
    };
  }

  // componentDidMount() {
  //   window.lsq_setupForm({ id: "43b43361-d865-11e9-aebf-02b00a4d022c" });
  // }

  async componentDidMount() {
    try {
      const { data } = await post(
        `https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Retrieve?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}&leadId=${LEAD_ID}`
      );
      console.log("lead data", data.ProspectActivities);
      let dataActivity = data.ProspectActivities.map(
        item => item["ActivityFields"]
      )[11];
      console.log("dataActivity", dataActivity);
      // var dataAct = [];
      // var dataMain = [];
      // for (let i = 0; i < dataActivity.length - 1; i++) {
      //   if (dataActivity[i] === {}) {
      //     dataAct.push(dataActivity[i]);
      //   } else {
      //     dataMain.push(dataActivity[i]);
      //   }
      // }
      // console.log("dataActivity", dataAct);
      this.setState({ allActivity: dataActivity });
    } catch (e) {
      console.log("error", e);
    }
  }

  logout = async () => {
    logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <h1 className="text-center">Application History</h1>
        <br />
        <br />

        <Link to={"/forms"}>Apply Form</Link>

        <br />
        <br />

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Application Id</th>
              <th scope="col">Creation Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{this.state.allActivity.mx_Custom_1}</th>
              <td>{this.state.allActivity.mx_Custom_3}</td>
              <td>{this.state.allActivity.Status}</td>
            </tr>
          </tbody>
        </table>

        <br />
        <br />
        <br />

        <button onClick={this.logout} className="btn btn-primary">
          Logout
        </button>
      </>
    );
  }
}

export default withRouter(Dashboard);
