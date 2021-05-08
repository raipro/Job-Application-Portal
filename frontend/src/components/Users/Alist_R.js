import React, { Component } from 'react';
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


class Alist_R extends Component {

    constructor(props) {
        super(props);
        this.state = { flag: 1,applications: [], applicationscopy: [], sortName: true, sortdate: true, sortrating: true };
        this.renderIcon = this.renderIcon.bind(this);

        this.sortChange = this.sortChange.bind(this);
        this.sortChangeDate = this.sortChangeDate.bind(this);
        this.sortChangerating = this.sortChangerating.bind(this);
    }

    componentDidMount() {
        console.log(typeof (this.props.location.state.set));
        console.log("kartik");
        let info = {
            id: this.props.location.state.set
        }
        console.log(info);
        axios.post("/users/Alist_R", info)
            .then(response => {
                let dat = response.data.application;
                     const values = [...dat];
                     for(var i=0;i<dat.length;i++)
                     {    
                     values[i]['applrating'] = response.data.rating[i];
                     }
                console.log(response.data);
                this.setState({ applications: values, applicationscopy: values });
            })
        //   .catch(function(error) {
        //       console.log(error);
        //   })
    }
    updatestage(e,str,id,ind) {
        e.preventDefault();
        console.log(str);
        let info = {
            id: id,
            upstage: str
        }
        axios.post('/users/updatestage',info).then(res => {;});
        // const values = [...this.state.applications];
        // values[ind].stageofapplication = str;
        this.componentDidMount();
        this.setState({flag: 1});
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
    sortChangeDate() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.applications;
        var flag = this.state.sortdate;
        array.sort(function (a, b) {
            if (a.applicationdate != undefined && b.applicationdate != undefined) {
                return (1 - flag * 2) * (new Date(a.applicationdate) - new Date(b.applicationdate));
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

    renderIcon() {
        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderIcon1() {
        if (this.state.sortdate) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderIcon2() {
        if (this.state.sortrating) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    render() {
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
                                    )
                                }}
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
                                        <TableCell><Button onClick={this.sortChangeDate}>{this.renderIcon1()}</Button> application date</TableCell>
                                        <TableCell><Button onClick={this.sortChange}>{this.renderIcon()}</Button>Name</TableCell>
                                        <TableCell>Skills</TableCell>
                                        <TableCell>SOP</TableCell>
                                        <TableCell><Button onClick={this.sortChangerating}>{this.renderIcon2()}</Button>rating</TableCell>
                                        <TableCell>Application stage</TableCell>
                                        <TableCell>InstitutionName</TableCell>
                                        <TableCell>StartYear</TableCell>
                                        <TableCell>EndYear</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((applications, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{applications.applicationdate}</TableCell>
                                            <TableCell>{applications.name}</TableCell>
                                            <TableCell>{applications.skills}</TableCell>
                                            <TableCell>{applications.SOP}</TableCell>
                                            <TableCell>{applications.applrating}</TableCell>
                                            <TableCell>{applications.stageofapplication}</TableCell>
                                            <TableCell>
                                                <ul>
                                                    {
                                                        applications.education.map((edu, ind1) => (
                                                            <li>{edu.InstitutionName}</li>
                                                        )
                                                        )
                                                    }
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                <ul>
                                                    {
                                                        applications.education.map((edu, ind1) => (
                                                            <li>{edu.StartYear}</li>
                                                        )
                                                        )
                                                    }
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                <ul>
                                                    {
                                                        applications.education.map((edu, ind1) => (
                                                            <li>{edu.EndYear}</li>
                                                        )
                                                        )
                                                    }
                                                </ul>
                                            </TableCell>
                                            <TableCell> {(applications.stageofapplication === 'applied') ? (<button
                                                style={{
                                                    width: "100px",
                                                    borderRadius: "1px",
                                                    letterSpacing: "0.5px",
                                                    marginTop: "0.5rem"
                                                }}
                                                onClick = {e => this.updatestage(e,"shortlisted",applications._id,ind)}
                                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                            >
                                                Shortlist
                                            </button>) : (<button
                                                style={{
                                                    width: "100px",
                                                    borderRadius: "1px",
                                                    letterSpacing: "0.5px",
                                                    marginTop: "0.5rem"
                                                }}
                                                onClick = {e => this.updatestage(e,"accepted",applications._id,ind)}
                                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                            >
                                                Accept
                                            </button>)
                                            }</TableCell>
                                            <TableCell>
                                            <button
                                                style={{
                                                    width: "100px",
                                                    borderRadius: "1px",
                                                    letterSpacing: "0.5px",
                                                    marginTop: "0.5rem"
                                                }}
                                                onClick = {e => this.updatestage(e,"rejected",applications._id,ind)}
                                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                            >
                                                Reject
                                            </button>
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
export default Alist_R;