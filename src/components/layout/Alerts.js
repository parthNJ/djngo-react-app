import React, { Fragment } from "react";
import { withAlert } from "react-alert";

import { connect } from "react-redux";
import propTypes from "prop-types";

class Alerts extends React.Component {
  static propTypes = {
    error: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`email: ${error.msg.email.join()}`);
      if (error.msg.message)
        alert.error(`message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username);
    }
    if (message !== prevProps.message) {
      if (message.deleteLead) alert.success(message.deleteLead);
      if (message.addedLead) alert.success(message.addedLead);
      if (message.loading) alert.success(message.loading);
      if (message.editLeadSuccess) alert.success(message.editLeadSuccess);
      if (message.ProgramAdded) alert.success(message.ProgramAdded);
      if (message.deleteProgram) alert.success(message.deleteProgram);

      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
      if (message.NothingInCart) alert.error(message.NothingInCart);

      if (message.alreadyInCart) alert.error(message.alreadyInCart);
      if (message.alreadyEnrolled) alert.error(message.alreadyEnrolled);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
