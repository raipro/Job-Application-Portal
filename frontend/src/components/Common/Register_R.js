import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerR } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Register_R extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            contactno:'',
            bio: '',
            UserType: 'Recruiter',
            errors: {}
        };


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangepassword2 = this.onChangepassword2.bind(this);
        this.onChangecontactno = this.onChangecontactno.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
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
    onChangecontactno(event) {
        this.setState({ contactno: event.target.value });
    }
    onChangeUserType(event) {
        this.setState({ UserType: event.target.value });
    }
    onChangebio(event) {
        this.setState({ bio: event.target.value});
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            contactno: this.state.contactno,
            bio: this.state.bio,
            UserType: 'Recruiter',
        };
        this.props.registerR(newUser, this.props.history);
        //axios.post('http://localhost:4000/users/register', newUser)
        //     .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
        //    ;

        this.setState({
            name: '',
            email: '',
            password: '',
            password2: '',
            contactno: '',
            bio: '',
            UserType: 'Recruiter',
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
                        <span className="red-text">
                            {errors.password}
                        </span>
                    </div>
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
                        <span className="red-text">
                            {errors.password2}
                        </span>
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
                            onChange={this.onChangecontactno}
                        />
                        <span className="red-text">
                            {errors.contactno}
                        </span>
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
                            onChange={this.onChangebio}
                        />
                        <span className="red-text">
                            {errors.bio}
                        </span>
                    </div>
                    <div className="form-group">
                        <button type="submit" value="Register" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
Register_R.propTypes = {
    registerR: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerR }
)(Register_R);