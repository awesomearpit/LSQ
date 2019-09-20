import React, { Component } from "react";
import Loader from "react-loader-spinner";

class FullScreenLoader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="fullScreen-loader">
          <Loader
            type="puff"
            color="#212529"
            height={100}
            width={100}
            timeout={10000}
          />
        </div>
      </>
    );
  }
}

export default FullScreenLoader;
