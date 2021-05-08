import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            skills: 'C++,python,ruby,java',
            UserType: 'Applicant',
            errors: {}
        };


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangepassword2 = this.onChangepassword2.bind(this);
        this.onChangeskills = this.onChangeskills.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard_A");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangepassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangepassword2(event) {
        this.setState({ password2: event.target.value });
    }
    onChangeskills(event) {
        this.setState({ skills: event.target.value });
    }
    onChangeUserType(event) {
        this.setState({ UserType: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            skills: this.state.skills,
            UserType: this.state.UserType,
        };
        this.props.registerUser(newUser, this.props.history);
        //axios.post('http://localhost:4000/users/register', newUser)
        //     .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
        //    ;

        this.setState({
            name: '',
            email: '',
            password: '',
            password2: '',
            skills: 'C++,python,ruby,java',
            UserType: 'Applicant',
        });
    }


    render() {
        const options = [
            'Applicant', 'Recruiter'
        ];
        const defaultOption = options[0];
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
                            onChange={this.onChangeUsername}
                        />
                        <span className="red-text">
                            {errors.name}
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                            value={this.state.email}
                            error={errors.email}
                            onChange={this.onChangeEmail}
                        />
                         <span className="red-text">
                            {errors.email}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                            value={this.state.password}
                            error={errors.password}
                            onChange={this.onChangepassword}
                        />
                    </div>
                    <span className="red-text">
                            {errors.password}
                    </span>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                            value={this.state.password2}
                            error={errors.password2}
                            onChange={this.onChangepassword2}
                        />
                    </div>
                    <span className="red-text">
                            {errors.password2}
                    </span>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input type="text"
                            //  defaultValue = "C++,python,ruby,java" 
                            className={classnames("", {
                                invalid: errors.skills
                            })}
                            value={this.state.skills}
                            error={errors.skills}
                            onChange={this.onChangeskills}
                        />
                    </div>
                    <span className="red-text">
                            {errors.skills}
                    </span>
                    <div className="form-group">
                        <button type="submit" value="Register" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(Register);