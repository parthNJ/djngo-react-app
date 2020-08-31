import React, { Fragment } from "react";
import propTypes from "prop-types";
import { getUserPrograms, removeProgram } from "../../actions/module";
import { connect } from "react-redux";

class Cart extends React.Component {
  static propTypes = {
    auth: propTypes.object.isRequired,
    user_program: propTypes.array.isRequired,
  };
  componentDidMount() {
    this.props.getUserPrograms();
  }

  checkoutbtn = (e) => {
    this.props.history.push("/checkout");
  };
  render() {
    const { user } = this.props.auth;
    const priceArry = Object.values(
      this.props.user_program.map((program) => program.program.cost)
    );
    const totalCost = priceArry.reduce((a, b) => a + b, 0);

    return (
      <Fragment>
        <div className="jumbotron">
          <h1 className="display-4">Welcome {user ? user.username : ""}</h1>
          <h2 className="display-5">Shopping Cart: </h2>
          <p className="lead">Click checkout to enroll in your programs!</p>
          <hr className="my-4" />
          <table className="table">
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.props.user_program.map((program) => (
                <tr key={program.program.id}>
                  <td>{program.program.name}</td>
                  <td>${program.program.cost}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={this.props.removeProgram.bind(this, program.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="alert alert-info" role="alert">
            Total Cost: ${totalCost}.00
          </div>
          {totalCost > 0 ? (
            <button
              className="btn btn-primary btn-lg"
              onClick={this.checkoutbtn}
            >
              Checkout
            </button>
          ) : (
            <h2>Nothing In Cart</h2>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user_program: state.module.user_program,
  auth: state.auth,
  // checkoutStart: state.checkouot.isCheckingOut,
});

export default connect(mapStateToProps, {
  getUserPrograms,
  removeProgram,
})(Cart);
