import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getUserPrograms, removeProgram } from "../../actions/module";
import propTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

class Checkoutitems extends React.Component {
  static propTypes = {
    auth: propTypes.object.isRequired,
    user_program: propTypes.array.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const priceArry = Object.values(
      this.props.user_program.map((program) => program.program.cost)
    );
    const totalCost = priceArry.reduce((a, b) => a + b, 0);

    return (
      <div className="jumbotron">
        <h2 className="display-8">Your Order: </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.user_program.map((program) => (
              <tr key={program.program.id}>
                <td>{program.program.name}</td>
                <td>${program.program.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="alert alert-info" role="alert">
          Total Cost: ${totalCost}.00
        </div>
        <Link to="admin/cart">Edit Order</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user_program: state.module.user_program,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserPrograms,
  removeProgram,
})(Checkoutitems);
