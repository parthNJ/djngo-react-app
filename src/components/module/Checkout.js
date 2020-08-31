import React, { Fragment } from "react";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import propTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import CheckoutItems from "./CheckoutItems";
import store from "../../Store";
import { getUserPrograms } from "../../actions/module";

class Checkout extends React.Component {
  componentDidMount() {
    this.props.getUserPrograms();
  }
  render() {
    const progID = this.props.user_program.map((prog) => prog.program.id);
    if (progID.length >= 1) {
      return (
        <div className="container">
          <CheckoutItems />
          <CheckoutForm />
        </div>
      );
    } else {
      return (
        <Fragment>
          <Redirect to="admin/cart" />
        </Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user_program: state.module.user_program,
  };
}

export default connect(mapStateToProps, {
  getUserPrograms,
})(Checkout);
