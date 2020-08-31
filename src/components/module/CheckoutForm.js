import React from "react";
import { checkout, emptyCart } from "../../actions/checkout";
import { connect } from "react-redux";
import propTypes from "prop-types";
class CheckoutForm extends React.Component {
  state = {
    address: "",
    city: "",
    state: "",
    zipcode: "",
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { address, city, state, zipcode } = this.state;
    // total = this.props.total;

    const orderInfo = { address, city, state, zipcode };

    this.props.checkout(orderInfo);
    this.props.emptyCart();

    this.setState({
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };
  render() {
    const { address, city, state, zipcode } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h2>Please Fill out your address</h2>
          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              onChange={this.onChange}
              value={address}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>City</label>
              <input
                name="city"
                type="text"
                className="form-control"
                id="inputCity"
                onChange={this.onChange}
                value={city}
              />
            </div>
            <div className="form-group col-md-4">
              <label>State</label>
              <select
                name="state"
                id="inputState"
                className="form-control"
                onChange={this.onChange}
                value={state}
              >
                <option>New Jersey</option>
                <option>New York</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label>Zip</label>
              <input
                name="zipcode"
                type="text"
                className="form-control"
                id="inputZip"
                onChange={this.onChange}
                value={zipcode}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Enroll Now
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.module.total,
});

export default connect(mapStateToProps, {
  checkout,
  emptyCart,
})(CheckoutForm);
