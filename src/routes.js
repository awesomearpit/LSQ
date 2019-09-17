import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import RenderForm from "./Components/RenderForm";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.Routes = [
      {
        path: "/",
        exact: true,
        component: Signup,
        title: "register",
      },
      {
        path: "/login",
        exact: true,
        component: Signin,
        title: "login",
      },
      {
        path: "/forgotPassword",
        exact: true,
        component: ForgotPassword,
        title: "forgotPassword",
      },
      {
        path: "/:leadId/:tempPassword",
        exact: true,
        component: ResetPassword,
        title: "resetPassword",
      },
      {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
        title: "dashboard",
      },
      {
        path: "/forms",
        exact: true,
        component: RenderForm,
        title: "renderForm",
      },
    ];
  }

  isAllowed = (props, RouteComponent, title) => {
    if (this.isCurrentUser()) {
      if (
        title !== "login" &&
        title !== "register" &&
        title !== "forgotPassword" &&
        title !== "resetPassword"
      ) {
        return <RouteComponent {...props} />;
      }
    } else {
      if (title === "login") {
        return <Signin {...props} />;
      } else if (title === "register") {
        return <Signup {...props} />;
      } else if (title === "forgotPassword") {
        return <ForgotPassword {...props} />;
      } else if (title === "resetPassword") {
        return <ResetPassword {...props} />;
      } else if (
        title !== "login" &&
        title !== "signup" &&
        title !== "forgotPassword" &&
        title !== "resetPassword"
      ) {
        return <Redirect to="/login" />;
      }
    }
  };

  isCurrentUser = () => {
    return !!cookie.load("AuthKey");
  };

  render() {
    return (
      <div>
        <main>
          <Switch>
            {this.Routes.map((route, i) => (
              <Route
                key={i}
                exact={route.exact}
                path={route.path}
                render={props =>
                  this.isAllowed(props, route.component, route.title)
                }
              />
            ))}
            <Route />
          </Switch>
        </main>
      </div>
    );
  }
}

export default Routes;
