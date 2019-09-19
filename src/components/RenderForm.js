import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "./Dashboard/Header";
import { logout } from "../utils/API";
import { FORM_ID } from "../utils/Constants";

class RenderForm extends Component {
  constructor(props) {
    super(props);
  }

  loadOverrideCSS = () => {
    var applicationId = (this.lsqFormContainer.querySelector(
      ".lsq-form-action-back"
    ).innerHTML =
      "<i class=`material-icons`></i><a href=`/dashboard`>Back</a>");
    console.log("applicationId", applicationId);
  };

  componentDidMount() {
    window.lsq_setupForm({ id: `${FORM_ID}` });

    this.lsqFormContainer.addEventListener(
      "lsqformloadcomplete",
      this.loadOverrideCSS
    );
  }

  logout = async () => {
    logout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <Header logout={this.logout} />
        <div className="col-md-6 offset-3">
          <div className="activity-box">
            <div
              id="lsq-form-modal"
              ref={elem => (this.lsqFormContainer = elem)}
              data-form-id={`${FORM_ID}`}
              className="modal-v4 fullscreen external lsq-external-form-container"
            >
              <div className="lsq-form-container-wrapper"></div>
              <div className="lsq-form-hidden-fields">
                <input
                  id="lsq-authKey"
                  name="lsq-authKey"
                  type="hidden"
                  value="VnBTTUE1NjlTTDlTN2tRUW8vbE5NYi9sUDEwbHQ0cVNkRGtnOUI2bHk5RlhuVVFrSXlPOHQxWjVxcUhLbngyZmY5MXdzbUpsOWRiSFpVUEhBS1EzdWszNUpjVHdRQWVLWEFqcFdaU2NCUmVGVUZKcDd0N2xmM2lubG5iMmtnaWdGVklKdURRbmdlcldyeWN1c0VLcHFtZzByMTZrR090bW9tNUNmcHQwMXZQNVA4WjJrU1BNWFlpRXRhQlE1VzRsMUMvMEJMd3QzL3NjakRLM0oyS0QrZz09"
                />
                <input
                  id="lsq-api-service-url"
                  name="lsq-api-service-url"
                  type="hidden"
                  value="https://portalapi-in21.leadsquared.com/api/Form"
                />
                <input
                  id="lsq-app-url"
                  name="lsq-app-url"
                  type="hidden"
                  value="https://in21.leadsquared.com"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(RenderForm);
