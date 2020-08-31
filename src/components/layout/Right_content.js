import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getPrograms, getUserPrograms, addProgram } from "../../actions/module";
import Content_navbar from "./Content_navbar";
class Right_content extends React.Component {
  static propTypes = {
    programs: propTypes.array.isRequired,
    auth: propTypes.object.isRequired,
    user_program: propTypes.array.isRequired,
    isAuthenticated: propTypes.bool,
  };

  componentDidMount() {
    this.props.getPrograms();
    this.props.getUserPrograms();
  }
  render() {
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Content_navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
          </div>
          <div className="container">
            <div className="secondary_color font-medium-x1">
              Programs to Enroll
            </div>
            <div className="row">
              {this.props.programs.map((program) => (
                <div className="col-md-4" key={program.id}>
                  <div className="card">
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
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2020</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  programs: state.module.programs,
  user_program: state.module.user_program,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getPrograms,
  getUserPrograms,
  addProgram,
})(Right_content);
