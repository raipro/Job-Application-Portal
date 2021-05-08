import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfileR } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { USER_LOADING } from '../../actions/types';

const USER = JSON.parse(localStorage.getItem("USER"));
class editprofile_R extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contactno:'',
            bio: '',
            UserType: 'Recruiter',
            errors: {}
        };


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangecontactno = this.onChangecontactno.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        // if (this.props.auth.isAuthenticated) {
            // this.props.history.push("/Profile_R");
        // }
        ;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        //this.props.history.push('/Profile_R');
    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }
    onChangecontactno(event) {
        this.setState({ contactno: event.target.value });
    }
    onChangebio(event) {
        this.setState({ bio: event.target.value});
    }
    onSubmit(e) {
        e.preventDefault();

        const updatedUser = {
            name: this.state.name,
            contactno: this.state.contactno,
            bio: this.state.bio,
            email: this.props.auth.user.email
        };
        this.props.editProfileR(updatedUser, this.props.history);
        //axios.post('http://localhost:4000/users/register', newUser)
        //     .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
        //    ;

        this.setState({
            name: '',
            contactno: '',
            bio: '',
        });
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
                            onChange={this.onChangeUsername}
                        />
                          <span className="red-text">
                                        {errors.name}
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
                        <button type="submit" value="Register" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
editprofile_R.propTypes = {
    editProfileR: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { editProfileR }
)(editprofile_R);