import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class RenderForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.lsq_setupForm({ id: "43b43361-d865-11e9-aebf-02b00a4d022c" });
  }

  render() {
    return (
      <>
        <h1 className="text-center">Application Form</h1>
        <div className="col-md-6 offset-3">
          <div
            id="lsq-form-modal"
            data-form-id="43b43361-d865-11e9-aebf-02b00a4d022c"
            class="modal-v4 fullscreen external lsq-external-form-container"
          >
            <div class="lsq-form-container-wrapper"></div>
            <div class="lsq-form-hidden-fields">
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
            <div class="lsq-form-script-wrapper"></div>
          </div>
        </div>

        <br />
        <Link to="/dashboard">Back</Link>
      </>
    );
  }
}

export default withRouter(RenderForm);
