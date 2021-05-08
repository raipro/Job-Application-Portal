import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { JobR } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const USER = JSON.parse(localStorage.getItem("USER"));
class jobs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            skills: '',
            JobTitle: '',
            jobtype: 'Full-Time',
            duration: '',
            salary: '',
            deadline: '',
            applications: '',
            positions: '',
            errors: {}
        };


        this.onChangeskills = this.onChangeskills.bind(this);
        this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
        this.onChangejobtype = this.onChangejobtype.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        this.onChangeapplications = this.onChangeapplications.bind(this);
        this.onChangepositions = this.onChangepositions.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    // if (this.props.auth.isAuthenticated) {
    // this.props.history.push("/dashboard");
    // }
    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChangeskills(event) {
        this.setState({ skills: event.target.value });
    }
    onChangeJobTitle(event) {
        this.setState({ JobTitle: event.target.value });
    }
    onChangejobtype(event) {
        this.setState({ jobtype: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });   
    }
    onChangeapplications(event) {
        this.setState({ applications: event.target.value });   
    }
    onChangepositions(event) {
        this.setState({ positions: event.target.value });   
    }
    onChangesalary(event) {
        this.setState({ salary: event.target.value });   
    }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });   
    }
    _onselect = e => {
        console.log(e);
        this.setState( {jobtype: e.value} )
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            skills: this.state.skills,
            JobTitle: this.state.JobTitle,
            jobtype: this.state.jobtype,
            duration: this.state.duration,
            salary: this.state.salary,
            deadline: this.state.deadline,
            applications: this.state.applications,
            positions: this.state.positions,
        };
        console.log(newUser);
        this.props.JobR(newUser, this.props.history);
        //axios.post('http://localhost:4000/users/register', newUser)
        //     .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
        //    ;

        this.setState({
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            skills: '',
            jobtype: 'Full-Time',
            duration: '',
            salary: '',
            deadline: '',
            applications: '',
            positions: '',
            JobTitle: ''
        });
    }


    render() {
        const options = [
            'Full-Time', 'Part-Time', 'Work from Home'
        ];
        const defaultOption = options[0];
        const { errors } = this.state;
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                <label>Job type</label>    
                <Dropdown options={options} onChange= {this._onselect} value={this.state.jobtype} placeholder="Select job type" />
                    <div className="form-group">
                        <label>Recruiter name </label>
                        <input type="text"
                            value={this.props.auth.user.name}
                        />
                        <span className="red-text">
                            {errors.name}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Recruiter Email </label>
                        <input type="text"
                            value={this.props.auth.user.email}
                        />
                        <span className="red-text">
                            {errors.email}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>JobTitle </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.JobTitle
                            })}
                            value={this.state.JobTitle}
                            error={errors.JobTitle}
                            onChange={this.onChangeJobTitle}
                        />
                        <span className="red-text">
                            {errors.JobTitle}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Skills required </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.skills
                            })}
                            value={this.state.skills}
                            error={errors.skills}
                            onChange={this.onChangeskills}
                        />
                        <span className="red-text">
                            {errors.skills}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Max Applications </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.applications
                            })}
                            value={this.state.applications}
                            error={errors.applications}
                            onChange={this.onChangeapplications}
                        />
                        <span className="red-text">
                            {errors.applications}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Max Positions </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.positions
                            })}
                            value={this.state.positions}
                            error={errors.positions}
                            onChange={this.onChangepositions}
                        />
                        <span className="red-text">
                            {errors.positions}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Salary per Month </label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.salary
                            })}
                            value={this.state.salary}
                            error={errors.salary}
                            onChange={this.onChangesalary}
                        />
                        <span className="red-text">
                            {errors.salary}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>duration</label>
                        <input type="text"
                            className={classnames("", {
                                invalid: errors.duration
                            })}
                            value={this.state.duration}
                            error={errors.duration}
                            onChange={this.onChangeduration}
                        />
                        <span className="red-text">
                            {errors.duration}
                        </span>
                    </div>
                    <TextField
                        id="deadline"
                        label="Deadline"
                        type="date"

                        value={this.state.deadline}
                        onChange={this.onChangedeadline}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                        <span className="red-text">
                            {errors.deadline}
                        </span>
                    <div className="form-group">
                        <button type="submit" onSubmit= {this.onSubmit} value="Add Job" className="btn btn-primary">Add Job</button>
                    </div>
                </form>
            </div>
        )
    }
}
jobs.propTypes = {
    JobR: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { JobR }
)(withRouter(jobs));