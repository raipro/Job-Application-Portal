import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
//import jobs from '../../../../backend/validation/jobs';


class Jlist extends Component {
    
    constructor() {
        super();
        this.state = {jobs: [],sortedjobs: [], sortName:true,deadline: '',applications: '',positions: '',errors: {}};
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onChangeapplications = this.onChangeapplications.bind(this);
        this.onChangepositions = this.onChangepositions.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
    }

    componentDidMount() {
        let info={
            email: this.props.auth.user.email
        }
        console.log(this.props);
        console.log(info);
        axios.post('/users/Jlist',info)
             .then(response => {
                 this.setState({jobs: response.data, sortedjobs:response.data});
                 for(var i=0;i<this.state.jobs.length;i++)
                 {
                    const values = [...this.state.jobs];
                    values[i]['applicants'] = values[i]['applications'] - values[i]['remapplications'];
                    this.setState({jobs: values,sortedjobs: values})
                    //console.log(this.state.jobs[i]['applicants']);
                 }
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onSubmit(e,id) {
        e.preventDefault();
        e.stopPropagation();
        const updatedUser = {
            id: id,
            deadline: this.state.deadline,
            applications: this.state.applications,
            positions: this.state.positions,
        };
        console.log(updatedUser);
        axios.post('http://localhost:4000/users/editjob', updatedUser).then( res => {console.log(res.data)})
        //     .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
        //    ;
        this.componentDidMount();
        this.setState({
            deadline: '',
            applications: '',
            positions: '',
        });
    }
    handleClick = (e,id) => {
        e.preventDefault();
        console.log(id);
        this.props.history.push("/Alist_R",{set: id});
    }
    delete = (e,id) => {
        e.stopPropagation();
        console.log(id);
        let info ={
            id: id
        }
        axios.post('/users/delete',info).then(res => {console.log(res);})
        this.componentDidMount();
    }
    onChangeapplications(event) {
        this.setState({ applications: event.target.value });   
    }
    onChangepositions(event) {
        this.setState({ positions: event.target.value });   
    }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });   
    }
    sortChange(){
        var array = this.state.jobs;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }
    renderIcon(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    
    render() {
        const {errors} = this.state;
        return (
            <div>
                <Grid container>
                 {/* <form noValidate onSubmit={this.onSubmit}>    */}
                <TextField
                        id="deadline"
                        label="Deadline"
                        type="date"

                        value={this.state.deadline}
                        onChange={this.onChangedeadline}
                        InputLabelProps={{
                            shrink: true,
                        }} />
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
                </div>     
                </Grid>
                 <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Job Title</TableCell>
                                            <TableCell>Post date</TableCell>
                                            <TableCell>Applicants</TableCell>
                                            <TableCell> Remaining Positions</TableCell>
                                            <TableCell>Edit</TableCell>
                                            <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind} id = {jobs._id} onClick={e=> this.handleClick(e,jobs._id)}>
                                            <TableCell>{jobs.JobTitle}</TableCell>
                                            <TableCell>{jobs.postdate}</TableCell>
                                            <TableCell >{jobs.applicants}</TableCell>
                                            <TableCell>{jobs.rempositions}</TableCell>
                                            <TableCell><button 
                                                    style={
                                                        {
                                                            width: "100px",
                                                            borderRadius: "2px",
                                                            letterSpacing: "1px",
                                                            marginTop: "1rem",
                                                        }
                                                    }
                                                    className="btn btn-success"
                                                    onClick = {e => this.onSubmit(e,jobs._id)}
                                                >
                                                    Edit
                                      </button></TableCell>
                                      <button 
                                                    style={
                                                        {
                                                            width: "100px",
                                                            borderRadius: "2px",
                                                            letterSpacing: "1px",
                                                            marginTop: "1rem",
                                                        }
                                                    }
                                                    className="btn btn-success"
                                                    onClick = {e => this.delete(e,jobs._id)}
                                                >
                                                    Delete
                                      </button>
                                      <TableCell>

                                      </TableCell>

                                        </TableRow>
                                ))}
                                </TableBody>
                                                                 
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        )
    }
}
Jlist.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(Jlist);