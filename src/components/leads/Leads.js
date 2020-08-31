import React, { Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getLeads, deleteLead, leadDetail } from "../../actions/leads";
import { Link } from "react-router-dom";
import { getPrograms, getUserPrograms, addProgram } from "../../actions/module";

class Leads extends React.Component {
  static propTypes = {
    leads: propTypes.array.isRequired,
    getLeads: propTypes.func.isRequired,
    deleteLead: propTypes.func.isRequired,
    leadDetail: propTypes.func.isRequired,
  };

  submitClick(e) {
    // console.log("CLICKED");
  }

  componentDidMount() {
    this.props.getLeads();
  }
  render() {
    return (
      <Fragment>
        <h2>Leads</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map((lead) => (
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
                <td>
                  <Link to="/leadetail">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={
                        (this.submitClick,
                        this.props.leadDetail.bind(this, lead.id))
                      }
                    >
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leads.leads,
});

export default connect(mapStateToProps, {
  getLeads,
  deleteLead,
  leadDetail,
})(Leads);
