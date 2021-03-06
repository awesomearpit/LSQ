import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, post, activityPost, get } from "../utils/API";
import { ACCESS_KEY, SECRET_KEY, LEAD_ID } from "../utils/Constants";
import Header from "./Dashboard/Header";
import Loader from "react-loader-spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allActivity: [],
      recordCount: "",
      leadsInfo: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const { data } = await activityPost(
        `https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Retrieve?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}&leadId=${LEAD_ID}`
      );
      console.log("data", data);
      let dataActivity = data.ProspectActivities.map(
        item => item["ActivityFields"]
      );
      dataActivity = dataActivity.filter(activity => activity !== undefined);
      this.setState({
        allActivity: dataActivity,
        recordCount: data.RecordCount,
        isLoading: false,
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  logout = async () => {
    logout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <Header logout={this.logout} />
        <div className="col-md-10 offset-1">
          <div className="activity-box">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Car Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.isLoading ? (
                  <DataLoader />
                ) : (
                  <Data state={this.state} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Dashboard);

const NoDataTable = props => {
  return (
    <tr>
      <th colspan="2" className="text-center">
        There is No Data Available
      </th>
    </tr>
  );
};

const DataTable = props => {
  return (
    <>
      {props.allActivity.map((activity, index) => {
        return (
          <tr key={index}>
            <th scope="row">{activity.mx_Custom_1}</th>
            <td>{activity.Status}</td>
          </tr>
        );
      })}
    </>
  );
};

const Data = props => {
  return (
    <>
      {props.state.recordCount == 0 ? (
        <NoDataTable />
      ) : (
        <DataTable allActivity={props.state.allActivity} />
      )}
    </>
  );
};

const DataLoader = props => {
  return (
    <tr>
      <th colspan="2" className="text-center">
        <Loader type="ThreeDots" color="#212529" height={50} width={50} />
      </th>
    </tr>
  );
};
