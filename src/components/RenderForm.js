import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "./Dashboard/Header";
import { logout } from "../utils/API";
import { FORM_ID, PRIVATE_AUTH_KEY, LEAD_ID } from "../utils/Constants";

class RenderForm extends Component {
  constructor(props) {
    super(props);
  }

  loadOverrideCSS = () => {
    var applicationId = (this.lsqFormContainer.querySelector(
      ".lsq-form-action-back"
    ).innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;<a style=color:white href="/dashboard">Back</a>`);
    console.log("applicationId", applicationId);
  };

  componentDidMount() {
    window.lsq_setupForm({
      id: `${FORM_ID}`,
      authKeyProvider: `${PRIVATE_AUTH_KEY}`,
      leadId: `${LEAD_ID}`,
    });

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
                  value="cDZhK21LcnFkbFdTSDBnSC9Ja2wwbWs3aXdENEk0UlJRaVNSdUtGWEdybmZKZW9hNUJqbHNwTnloQ3pjckJBMUJIblBrR2cxL3F4d25FV3BPNGpWLzd3TEFxYzdxNXp4Mm1tM212dXpnOVFxbUhKblVJZzNSeS90cDRsbmtMZEpyaFhWK3kyeE9mZmwvSTZXYk9WNWdrbG1teEViMytaRktzSmtQRStPUURiZFFoVnUrNEFIdm8reDJvbDl4cDlxamliSXJTSVUrZWxnTnorQzVKeWJsUT09"
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
