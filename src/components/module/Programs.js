import React, { Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import {
  getPrograms,
  getUserPrograms,
  addProgram,
  enrolledPrograms,
} from "../../actions/module";
// import { Link, Redirect } from "react-router-dom";
import { loadUser } from "../../actions/auth";

class Programs extends React.Component {
  static propTypes = {
    programs: propTypes.array.isRequired,
    auth: propTypes.object.isRequired,
    user_program: propTypes.array.isRequired,
    isAuthenticated: propTypes.bool,
    enrolled_programs: propTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getPrograms();
    this.props.getUserPrograms();
    this.props.enrolledPrograms();
  }

  render() {
    return (
      <Fragment>
        <h2>Programs</h2>
        <div className="container">
          <div className="row">
            {this.props.programs.map((program) => (
              <div className="col-md-4" key={program.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{program.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Price: ${program.cost}
                    </h6>
                    <p className="card-text">{program.description}</p>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={this.props.addProgram.bind(this, program.id)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

//USER IS LADING AFTER THE USER_PROGRAM IS BEING CALLED

const mapStateToProps = (state) => ({
  programs: state.module.programs,
  user_program: state.module.user_program,
  auth: state.auth,
  enrolled_programs: state.module.enrolled_program,
});

export default connect(mapStateToProps, {
  getPrograms,
  getUserPrograms,
  addProgram,
  enrolledPrograms,
})(Programs);
