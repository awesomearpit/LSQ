import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import cookie from "react-cookies";
import { logout } from "../Utils/API";
import axios from "axios";
import Safe from "react-safe"


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount(){
  //   this.loadDynamicScript(()=>{lsq_setupForm({ id: '7fe94a69-d3ba-11e9-aebf-02b00a4d022c' })})
  // }

  // loadDynamicScript = (callback) => {
  //   const existingScript = document.getElementById('lsq-script');
  
  //   if (!existingScript) {
  //     const script = document.createElement('script');
  //     script.src = 'https://dhx9mmhpfsala.cloudfront.net/cdn/externalforms/js/lsq.form.js?v=59.0.12';
  //     document.body.appendChild(script);
  //     setTimeout(()=>{script.onload = () => {
  //       if (callback) {
  //         console.log("callback")
  //       }
  //     }},10000)
  //   }
  
  //   // if (existingScript && callback) callback();
  // };
  

  logout = async () => {
    logout();
    alert("User logged out");
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <h1 className="text-center">Welcome to LSQ PORTAL</h1>
        <br />
        <br />
        <button onClick={this.logout} className="btn btn-primary">
          Logout
        </button>

        {/* <div id="lsq-form-modal" data-form-id="7fe94a69-d3ba-11e9-aebf-02b00a4d022c" class="modal-v4 fullscreen external lsq-external-form-container">
            <div class="lsq-form-container-wrapper">
            </div>
            <div class="lsq-form-hidden-fields">
                <input id="lsq-authKey" name="lsq-authKey" type="hidden" value="amRZRkhIUzhMMmRIbEF4aTF1Y0dCVEFhRVk3NUM1NkJldFhoNHdhQmIrWXE1Rm0vekJ2QTBCcHU0UWlFdE1saW9vSXg0VnlhWXA2eFd4cUQ1MVdxZGFlOGpoNnM1dmFTUHFWVGFGTjNyK3ZsWWRldnY4MXZJaUlUNVo0eTI3MThwREkzSXFVYXkveVVSbW9RNm01OUJ0blF0d0pwU1c3MGNJbld0WW1SZlpIZzhmRENDdi8wWmhxL0tqSi9ZU3MwK0tuclV6em1DVHJkSThFU0VkcHdmUT09" /> 
                <input id="lsq-api-service-url" name="lsq-api-service-url" type="hidden" value="https://portalapi-in21.leadsquared.com/api/Form" />
                <input id="lsq-app-url" name="lsq-app-url" type="hidden" value="https://in21.leadsquared.com" />
            </div>
            <div class="lsq-form-script-wrapper" id="lsq-script">

            </div>
        </div> */}
        
      </>
    );
  }
}

export default withRouter(Dashboard);
