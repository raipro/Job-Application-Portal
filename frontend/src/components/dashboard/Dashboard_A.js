import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
//import Jobs from "../../../../backend/models/Jobs";
class dashboard_A extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged in as a applicant
              </p>
            </h4>
            <Link
            to="/Alist_A"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            My Applications
            </Link>
            <Link
            to="/Jlist_A"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              //       e.preventDefault();
              //       window.location.href='http://localhost:3000/Jobs'
              // }
// }
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            View Jobs
            </Link>
            <Link
            to="/Profile_A"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              // onClick={(e) => {
              //       e.preventDefault();
              //       window.location.href='http://localhost:3000/Jobs'
              // }
// }
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Profile
            </Link>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
dashboard_A.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(dashboard_A);