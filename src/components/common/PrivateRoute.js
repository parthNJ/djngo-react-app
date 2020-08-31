import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import auth from "../../reducers/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const Token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        Token ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
