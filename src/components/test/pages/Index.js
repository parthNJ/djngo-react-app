import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import {
  getPrograms,
  getUserPrograms,
  addProgram,
  enrolledPrograms,
} from "../../../actions/module";

class Index extends React.Component {
  static propTypes = {
    programs: propTypes.array.isRequired,
    auth: propTypes.object.isRequired,
    user_program: propTypes.array.isRequired,
    isAuthenticated: propTypes.bool,
    enrolled: propTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getPrograms();
    this.props.getUserPrograms();
    this.props.enrolledPrograms();
  }
  render() {
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container mt50">
            <div className="secondary_color font-medium-x2">
              Your Enrolled Programs
            </div>
            <div className="row mt20">
              {this.props.enrolled.map((program) => (
                <div className="col-md-4" key={program.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{program.program.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Purchase Date: {program.purchase_date}
                      </h6>
                      <button
                        className="btn btn-primary btn-sm"
                        // onClick={this.program}
                      >
                        Enter Course
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  programs: state.module.programs,
  user_program: state.module.user_program,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  enrolled: state.module.enrolled_program,
});

export default connect(mapStateToProps, {
  getPrograms,
  getUserPrograms,
  addProgram,
  enrolledPrograms,
})(Index);
