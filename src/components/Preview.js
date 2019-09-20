import React, { Component } from "react";
import { get, logout } from "../utils/API";
import { SECRET_KEY, LEAD_ID, ACCESS_KEY } from "../utils/Constants";
import Header from "./Dashboard/Header";
import Loader from "react-loader-spinner";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadsInfo: {},
      displayName: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const { data } = await get(
        `https://api-in21.leadsquared.com/v2/LeadManagement.svc/Leads.GetById?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}&id=${LEAD_ID}`
      );
      this.setState({
        leadsInfo: data[0],
        displayName: data[0].FirstName,
        isLoading: false,
      });
      console.log("data leads", data);
    } catch (e) {
      console.log("error leads info", e);
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

        {this.state.isLoading ? (
          <DataLoader />
        ) : (
          <div className="col-md-10 offset-1">
            <div className="activity-box">
              <h3 className="padding-box">Personal Details</h3>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Name
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.FirstName}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Email
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.EmailAddress}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Mobile
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.Mobile}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  City
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.mx_City}
                </div>
              </div>
            </div>
            <div className="activity-box">
              <h3 className="padding-box">Comapny Details</h3>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Comapny
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.Company}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  JobTitle
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.JobTitle}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Phone
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.Phone}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Website
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.Website}
                </div>
              </div>
              <div className="col-md-12 padding-box">
                <div className="col-md-1 d-inline-block font-weight-bold">
                  Address
                </div>
                <div className="col-md-11 d-inline-block">
                  {this.state.leadsInfo.mx_Street2}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Preview;

const DataLoader = props => {
  return (
    <div style={{ marginTop: "200px", textAlign: "center" }}>
      <Loader type="ThreeDots" color="#212529" height={100} width={100} />
    </div>
  );
};
