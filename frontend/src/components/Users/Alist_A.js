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
//import jobs from '../../../../backend/validation/jobs';


class Alist_A extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [],jobscopy: []};
    //    this.renderIcon = this.renderIcon.bind(this);
      //  this.sortChange = this.sortChange.bind(this);
    }

    componentDidMount() {
         let info = {
             email: this.props.auth.user.email
         }
         axios.post('http://localhost:4000/users/Alist_A',info)
             .then(response => {
                 
                  this.setState({jobs: response.data, jobscopy:response.data});
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
        axios.post('/users/applicationrating',info).then(res => {console.log(res.data);});
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
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true}/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Job Title</TableCell>
                                            <TableCell>Date of Joining</TableCell>
                                            <TableCell>Salary per Month</TableCell>
                                            <TableCell>Recruiter Name</TableCell>
                                            <TableCell>Application stage</TableCell>
                                            <TableCell>Rate Job</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.JobTitle}</TableCell>
                                            <TableCell>{jobs.joiningdate}</TableCell>
                                            <TableCell>{jobs.salary}</TableCell>
                                            <TableCell>{jobs.recname}</TableCell>
                                            <TableCell>{jobs.stageofapplication}</TableCell>
                                            <TableCell>{(jobs.stageofapplication === 'accepted') ?(<Dropdown options={options} onChange= {e => this._onselect(e,jobs._id)} value={jobs.rating} placeholder="Rate Job" />):(<div></div>)}</TableCell>
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
export default connect(mapStateToProps, {})(Alist_A);