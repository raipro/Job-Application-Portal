
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerR } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from "react-router-dom";

const USER = JSON.parse(localStorage.getItem("USER"));
class Profile_R extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            contactno: '',
            bio: '',
            UserType: 'Recruiter',
            errors: {}
        };
    }
    componentDidMount() {
      this.setState({name: this.props.auth.user.name});
      this.setState({contactno: this.props.auth.user.contactno});
      this.setState({bio: this.props.auth.user.bio});
      this.setState({email: this.props.auth.user.email}); 
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.name
                            })}
                            value={this.state.name}
                            error={errors.name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                            value={this.state.email}
                            error={errors.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input type="text"
                            //  defaultValue = "C++,python,ruby,java" 
                            className={classnames("", {
                                invalid: errors.contactno
                            })}
                            value={this.state.contactno}
                            error={errors.contactno}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text"
                            //  defaultValue = "C++,python,ruby,java" 
                            className={classnames("", {
                                invalid: errors.bio
                            })}
                            value={this.state.bio}
                            error={errors.bio}
                        />
                    </div>
                    <div className="form-group">
                        <Link
                            to="/editprofile_R"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            edit
            </Link>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    auth:state.auth,
    errors:state.errors
})
export default connect(mapStateToProps,{})(Profile_R);