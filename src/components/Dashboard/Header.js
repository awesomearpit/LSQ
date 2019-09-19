import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../../assets/css/dashboard.css";
import { get } from "../../utils/API";
import { SECRET_KEY, LEAD_ID, ACCESS_KEY } from "../../utils/Constants";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadsInfo: {},
      displayName: "",
    };
  }

  async componentDidMount() {
    try {
      const { data } = await get(
        `https://api-in21.leadsquared.com/v2/LeadManagement.svc/Leads.GetById?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}&id=${LEAD_ID}`
      );
      this.setState({ leadsInfo: data[0], displayName: data[0].FirstName });
    } catch (e) {
      console.log("error leads info", e);
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/dashboard">LSQ University</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="btn btn-info" href="/form">
              <span style={{ color: "#fff" }}>Apply Form</span>
            </Nav.Link>
            <NavDropdown
              title={`Welcome ${this.state.displayName}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Preview</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.props.logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
