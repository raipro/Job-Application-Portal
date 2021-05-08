
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerR } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from "react-router-dom";
import { ProfileA } from "../../actions/authActions";

const USER = JSON.parse(localStorage.getItem("USER"));
class Profile_A extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            skills: this.props.auth.user.skills,
            education1: this.props.auth.user.education,
            education: [
                {
                    InstitutionName: '',
                    StartYear: '',
                    EndYear: '',
                }
            ],
            rating: this.props.auth.user.rating,
            UserType: 'Applicant',
            errors: {}
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeskills = this.onChangeskills.bind(this);
    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }
    onChangeskills(event) {
        this.setState({ skills: event.target.value });
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log("shreyashinsubmmit");
        // console.log("inputFields", this.state.education);
        const updatedUser = {
            name: this.state.name,
            skills: this.state.skills,
            education: this.state.education,
            email: this.props.auth.user.email
        };
        console.log(this.state.education1);
        console.log(this.state.education);

        for(var i=0;i<(this.state.education1).length;i++)
        updatedUser['education'].push(this.state.education1[i]);

        this.setState({education1: updatedUser['education']});
        console.log(this.state.education);
        this.setState({education: [
            {
                InstitutionName: '',
                StartYear: '',
                EndYear: '',
            }
        ] });
        this.props.ProfileA(updatedUser, this.props.history);
        // this.setState({education: [
        //     {
        //         InstitutionName: '',
        //         StartYear: '',
        //         EndYear: '',
        //     }
        // ] });
        this.componentDidMount();
        // this.setState({
        //     name: ,
        //     skills: '',
        //     bio: '',
        // });
      };
    handleAddFields = () => {
        const values = [...this.state.education];
        values.push({ InstitutionName: '', StartYear: '',EndYear: '' });
        this.setState({education: values});//setInputFields(values);
      };
    
    handleRemoveFields = index => {
        const values = [...this.state.education];
        values.splice(index, 1);
        this.setState({education: values});
        //setInputFields(values);
      };
    componentDidMount() {
        this.setState({ name: this.state.name });
        this.setState({ email: this.props.auth.user.email });
        this.setState({ skills: this.state.skills });
        this.setState({ rating: this.props.auth.user.rating });
        this.setState({ education: this.state.education });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    handleInputChange = (index, event) => {
        const values = [...this.state.education];
        if (event.target.name === "InstitutionName") {
            values[index].InstitutionName = event.target.value;
        } else if (event.target.name === "StartYear") {
            values[index].StartYear = event.target.value;
        }
        else if (event.target.name === "EndYear") {
            values[index].EndYear = event.target.value;
        }
        this.setState({education: values});
   //     setInputFields(values);
    };
    render() {
        const { errors } = this.state;
        return (
            <div>
                <form noValidate onSubmit={this.handleSubmit}>
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
                    </div>
                    <span className="red-text">
                            {errors.name}
                        </span>
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
                        <label>rating: </label>
                        <input type="text"
                            //  defaultValue = "C++,python,ruby,java" 
                            className={classnames("", {
                                invalid: errors.rating
                            })}
                            value={this.state.rating}
                            error={errors.rating}
                        />
                    </div>
                    <div className="form-row">
                        {this.state.education1.map((edu, index) => (
                            <Fragment key={`${edu}~${index}`}>
                                <div className="form-group col-sm-8">
                                    <label htmlFor="Institution Name">Institution Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="InstitutionName"
                                        name="InstitutionName"
                                        value={edu.InstitutionName}
                                    />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="StartYear">Start Year</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="StartYear"
                                        name="StartYear"
                                        value={edu.StartYear}
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="EndYear">End Year</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="EndYear"
                                        name="EndYear"
                                        value={edu.EndYear}
                                    />
                                </div>
                                </Fragment>
                        ))}
                                </div>
                    <div className="form-row">
                        {this.state.education.map((edu, index) => (
                            <Fragment key={`${edu}~${index}`}>
                                <div className="form-group col-sm-8">
                                    <label htmlFor="Institution Name">Institution Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="InstitutionName"
                                        name="InstitutionName"
                                        value={edu.InstitutionName}
                                        error = {errors.education}
                                        onChange={event => this.handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="StartYear">Start Year</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="StartYear"
                                        name="StartYear"
                                        value={edu.StartYear}
                                        error = {errors.education}
                                        onChange={event => this.handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="EndYear">End Year</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="EndYear"
                                        name="EndYear"
                                        value={edu.EndYear}
                                        error = {errors.education}
                                        onChange={event => this.handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-2">
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        onClick={() => this.handleRemoveFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        onClick={() => this.handleAddFields(index)}
                                    >
                                        +
                                </button>
                                <span className="red-text">
                                        {errors.education}
                                </span>
                                </div>
                            </Fragment>
                        ))}
                                </div>
                                <button
                                    className="btn btn-primary mr-2"
                                    type="submit"
                                    // onSubmit={this.handleSubmit}
                                >
                                    Save
                                </button>
                </form>
            </div>
        )
    }
}
Profile_A.propTypes = {
    ProfileA: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { ProfileA }
)(Profile_A);