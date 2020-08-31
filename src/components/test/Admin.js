import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TestSidebar from "./TestSidebar";
import routes from "./routes";
import AdminNavbar from "./AdminNavbar";

import "../../assets/css/pp_style.css";

class Admin extends React.Component {
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <TestSidebar {...this.props} routes={routes} />
        <div className="main-content" ref="mainContent">
          <AdminNavbar {...this.props} />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
        </div>
      </>
    );
  }
}

export default Admin;
