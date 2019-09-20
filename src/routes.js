import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import RenderForm from "./components/RenderForm";
import Preview from "./components/Preview";

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
        path: "/form",
        exact: true,
        component: RenderForm,
        title: "renderForm",
      },
      {
        path: "/profile",
        exact: true,
        component: Preview,
        title: "profile",
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
      return <Redirect to="/dashboard" />;
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
