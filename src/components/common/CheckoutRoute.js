import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const Token = localStorage.getItem("token");

const CheckoutRoute = ({ component: Component, ...rest }) => {
  const IsCheckingOut = localStorage.getItem("checkout");

  return (
    <Route
      {...rest}
      render={(props) =>
        IsCheckingOut ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  userIsCheckingout: state.checkout.isCheckingOut,
});

export default connect(mapStateToProps)(CheckoutRoute);
