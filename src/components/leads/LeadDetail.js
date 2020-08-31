import React, { Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import {
  getLeads,
  deleteLead,
  leadDetail,
  editLead,
} from "../../actions/leads";

class LeadDetail extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  static propTypes = {
    deleteLead: propTypes.func.isRequired,
    leadDetail: propTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.individualLead.map((x) => this.props.editLead(x.id, lead));

    this.setState({
      name: "",
      email: "",
      message: "",
    });
  };

  render() {
    const { name, email, message } = this.state;

    return (
      <Fragment>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Message</td>
            </tr>
          </thead>
          <tbody>
            {this.props.individualLead.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Edit Lead</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder={this.props.individualLead.map((lead) => lead.name)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder={this.props.individualLead.map((lead) => lead.email)}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <input
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
              placeholder={this.props.individualLead.map(
                (lead) => lead.message
              )}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

// const mapStateToProps = (state) => ({
//   individualLead: state.leads.lead,
//   leads: state.leads.leads,
// });

const mapStateToProps = (state) => {
  return {
    leads: state.leads.leads,
    individualLead: state.leads.lead,
  };
};

export default connect(mapStateToProps, {
  leadDetail,
  deleteLead,
  editLead,
  getLeads,
})(LeadDetail);
