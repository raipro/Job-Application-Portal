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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Employee extends Component {
    
    constructor(props) {
        super(props);
        this.state = {applications: [],applicationscopy: [], sortName:true,sortJobTitle: true,sortdate: true,sortrating: true,applrating: []};
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.sortChangeJobTitle = this.sortChangeJobTitle.bind(this);
        this.sortChangeDate = this.sortChangeDate.bind(this);
        this.sortChangerating = this.sortChangerating.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.renderIcon3 = this.renderIcon3.bind(this);
        this.renderIcon4 = this.renderIcon4.bind(this);
    }

    componentDidMount() {
        let info = {
            email: this.props.auth.user.email
        }
        axios.post('http://localhost:4000/users/employee',info)
             .then(response => {
                     let dat = response.data.application;
                     const values = [...dat];
                     for(var i=0;i<dat.length;i++)
                     {    
                     values[i]['applrating'] = response.data.rating[i];
                     }
                 console.log(values);
                 this.setState({applications: values, applicationscopy:values });
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    _onselect(e,id) {
        console.log("hattori")
        console.log(e.value);
        let info = {
            id: id,
            rating: e.value
        }
        axios.post('/users/recrating',info).then(res => {console.log(res.data);}).catch(function(error) {
            console.log(error);
        });
        this.componentDidMount();        
    }
    sortChange() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.applications;
        var flag = this.state.sortName;
        array.sort(function (a, b) {
            if (a.name != undefined && b.name != undefined) {
                return (1 - flag * 2) * ((a.name.localeCompare(b.name)));
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangeJobTitle() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.applications;
        var flag = this.state.sortJobTitle;
        array.sort(function (a, b) {
            if (a.JobTitle != undefined && b.JobTitle != undefined) {
                return (1 - flag * 2) * ((a.JobTitle.localeCompare(b.JobTitle)));
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortJobTitle: !this.state.sortJobTitle,
        })
    }
    sortChangeDate() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.applications;
        var flag = this.state.sortdate;
        array.sort(function (a, b) {
            if (a.joiningate != undefined && b.joiningdate != undefined) {
                return (1 - flag * 2) * (new Date(a.joiningdate) - new Date(b.joiningdate));
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortdate: !this.state.sortdate,
        })
    }
    sortChangerating() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.applications;
        var flag = this.state.sortrating;
        array.sort(function (a, b) {
            if (a.applrating != undefined && b.applrating != undefined) {
                return (1 - flag * 2) * (a.applrating - b.applrating);
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortrating: !this.state.sortrating,
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
    renderIcon2(){
        if(this.state.sortJobTitle){
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
    renderIcon3(){
        if(this.state.sortdate){
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
    renderIcon4(){
        if(this.state.sortrating){
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
        const options = [
            0, 1, 2, 3, 4, 5
        ];
        return (
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> <Button onClick={this.sortChangeDate}>{this.renderIcon3()}</Button>Joining Date</TableCell>
                                            <TableCell><Button onClick={this.sortChangeJobTitle}>{this.renderIcon2()}</Button>Job Title</TableCell>
                                            <TableCell><Button onClick={this.sortChange}>{this.renderIcon()}</Button>Name</TableCell>
                                            <TableCell>Job Type</TableCell>
                                            <TableCell><Button onClick={this.sortChangerating}>{this.renderIcon4()}</Button>Applicant Rating</TableCell>
                                            <TableCell>Rate Applicant</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((applications,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{applications.joiningdate}</TableCell>
                                            <TableCell>{applications.JobTitle}</TableCell>
                                            <TableCell>{applications.name}</TableCell>
                                            <TableCell>{applications.jobtype}</TableCell>
                                            <TableCell>{applications.applrating}</TableCell>
                                            <TableCell><Dropdown options={options} onChange= {e => this._onselect(e,applications._id)} value={applications.recrating} placeholder="Rate Employee" /></TableCell>
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(Employee);