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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Fuse from "fuse.js";

var jid = [];
class Jlist_A extends Component {

    constructor() {
        super();
        this.state = { flag : 0,jobs: [], sortedjobs: [], sortSalary: true, sortDuration: true, sortRating: true,salarymin: 0, salarymax: 10000000, typefilter: '' ,durfilter: 7,search: ''};
        this.renderIcon = this.renderIcon.bind(this);
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.sortChangeSalary = this.sortChangeSalary.bind(this);
        this.sortChangeDuration = this.sortChangeDuration.bind(this);
        this.sortChangeRating = this.sortChangeRating.bind(this);
        this.filterSalarymin = this.filterSalarymin.bind(this);
        this.Salarymax = this.Salarymax.bind(this);
        this.typefilter = this.typefilter.bind(this);
        this.update = this.update.bind(this);
        this.durfilter = this.durfilter.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        jid = [];
        let info = {
            email: this.props.auth.user.email
        }
        console.log(info);
        axios.post('/users/applicationcheck',info).then( res=> {
            var i;    
            for(i=0;i<res.data.length;i++)
            {
                    jid[i] = res.data[i]['jobid'];
                    console.log(jid[i]);
            }

            // console.log(res.data); 
        axios.post('/users/Jlist_A', info)
            .then(response => {
                this.setState({ jobs: response.data, sortedjobs: response.data });
                console.log(typeof(this.state.jobs[0]._id));
                console.log("shreyash");
                console.log(jid.includes(this.state.jobs[0]._id));
            })
            .catch(function (error) {
                console.log(error);
            })
            this.setState({flag: 0});
        });
            // console.log(jid.indexOf(this.state.jobs[0]._id));
    }
    // componentDidUpdate() {
    //     let info = {
    //         email: this.props.auth.user.email
    //     }
    //     axios.post('/users/applicationcheck',info).then( res=> {
    //         var i;    
    //         for(i=0;i<res.data.length;i++)
    //         {
    //                 jid[i] = res.data[i]['jobid'];
    //                 console.log(jid[i]);
    //         }

    //         // console.log(res.data);
    //     }); 
    // }
    async Application(e,ind)  {
      e.preventDefault();
      console.log("gamchi");
      let info = {
          id: e.target.id,
          email: this.props.auth.user.email
      }
      let info1 = {
          email: this.props.auth.user.email
      }
      axios.post('/users/appnocheck',info1).then( res=> {
           console.log(res.data);
           if(res.data === "No")
           {
               alert("Not More than 10 Applications allowed!")
               return;
           }
           else if(res.data === "Yes")
           {
            info["SOP"] = prompt("Statement Of Purpose...", "");  
            axios.post('/users/application',info).then(res =>{;})
            //jid = [];
           // this.componentDidMount();
            jid.push(info.id);
            this.setState({ flag: 1 });
            console.log("go");
           }
       })  
     
    //console.log(jobs.JobTitle);
    // this.setState({black: !this.state.black})
     }
    sortChangeSalary() {

        var array = this.state.jobs;
        var flag = this.state.sortSalary;
        array.sort(function (a, b) {
            if (a.salary != undefined && b.salary != undefined) {
                return (1 - flag * 2) * (new Date(a.salary) - new Date(b.salary));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortSalary: !this.state.sortSalary,
        })
    }
    sortChangeDuration() {

        var array = this.state.jobs;
        var flag = this.state.sortDuration;
        array.sort(function (a, b) {
            if (a.duration != undefined && b.duration != undefined) {
                return (1 - flag * 2) * (new Date(a.duration) - new Date(b.duration));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortDuration: !this.state.sortDuration,
        })
    }
    sortChangeRating() {

        var array = this.state.jobs;
        var flag = this.state.sortRating;
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (new Date(a.rating) - new Date(b.rating));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortRating: !this.state.sortRating,
        })
    }
    async filterSalarymin(event) {
        await this.setState({
            salarymin: event.target.value
        });
        this.update();
    }
    async Salarymax(event) {
        await this.setState({
            salarymax: event.target.value
        });
        this.update();
    }
    async typefilter(event) {
        await this.setState({
            typefilter: event.value
        });
        this.update();
    }
    async durfilter(event) {
        await this.setState({
            durfilter: event.value
        });
        this.update();
    }
    async search(event) {
        await this.setState({
            search: event.target.value
        });
        if(this.state.search !== "")
        {
            var cdat = this.state.sortedjobs;
            const fuse = new Fuse(cdat,{ keys:['JobTitle'],includeScore: true});
            const results = fuse.search(this.state.search);
            await this.setState({jobs: results.map(result => result.item)});
        }
        else{
            await this.setState({jobs: this.state.sortedjobs});
        }
        this.update();
    }
    async update() {
        const temp = [];
        let maxsal = this.state.salarymax;
        let minsal = this.state.salarymin;
        let type = this.state.typefilter;
        let Duration = this.state.durfilter;
        let Search = this.state.search;

        console.log(type);
        minsal = parseInt(minsal);
        maxsal = parseInt(maxsal);
        var cdat = this.state.sortedjobs;
        if(this.state.search !== "")
        {
            const fuse = new Fuse(cdat,{ keys:['JobTitle'],includeScore: true});
            const results = fuse.search(this.state.search);
            cdat = results.map(result => result.item);
        }
        let arr = cdat;
        //else{
        //    await this.setState({jobs: this.state.sortedjobs});
        //}
     //   let arr = this.state.sortedjobs;
        arr.forEach(function (arrayItem) {
            if (type === '') {
                if (arrayItem.salary >= minsal && arrayItem.salary <= maxsal && arrayItem.duration < Duration) {
                    temp.push(arrayItem);
                }
            }
            else
            {
                if (arrayItem.salary >= minsal && arrayItem.salary <= maxsal && arrayItem.jobtype === type && arrayItem.duration < Duration ) {
                    temp.push(arrayItem);
                }
            }
        });
        await this.setState({ jobs: temp });
    }
    renderIcon() {
        if (this.state.sortSalary) {
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
        if (this.state.sortDuration) {
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
        if (this.state.sortRating) {
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
        const options = [
            'Full-Time', 'Part-Time', 'Work from Home'
        ];
        const options1 = [
            1, 2, 3, 4, 5, 6, 7
        ];
        console.log(this.state.jobs);
        console.log(jid);
        // let btn_class = this.state.black ? "blackButton" : "whiteButton";
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
                                value = {this.state.search}
                                onChange = {this.search}
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
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" value={this.state.salarymin} onChange={this.filterSalarymin} label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" value={this.state.salarymax} onChange={this.Salarymax} label="Enter Max" fullWidth={true} />
                                    <Dropdown options={options} onChange= {this.typefilter} value={this.state.typefilter} placeholder="Select job type" />
                                    <Dropdown options={options1} onChange= {this.durfilter} value={this.state.durfilter} placeholder="Select duration" />
                                </form>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Job Title</TableCell>
                                        <TableCell>Recruiter name</TableCell>
                                        <TableCell><Button onClick={this.sortChangeRating}>{this.renderIcon2()}</Button>rating</TableCell>
                                        <TableCell><Button onClick={this.sortChangeSalary}>{this.renderIcon()}</Button>Salary</TableCell>
                                        <TableCell><Button onClick={this.sortChangeDuration}>{this.renderIcon1()}</Button>duration</TableCell>
                                        <TableCell>deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.JobTitle}</TableCell>
                                            <TableCell>{jobs.name}</TableCell>
                                            <TableCell >{jobs.rating}</TableCell>
                                            <TableCell>{jobs.salary}</TableCell>
                                            <TableCell>{jobs.duration}</TableCell>
                                            <TableCell>{jobs.deadline}</TableCell>
                                            <TableCell>
                                                
                                            {( jobs.remapplications===0 || jobs.rempositions === 0  ) ?  (<div> <button 
                                                    style={
                                                        {
                                                            width: "100px",
                                                            borderRadius: "2px",
                                                            letterSpacing: "1px",
                                                            marginTop: "1rem",



                                                            // backgroundColor: 'black',
                                                            // color: 'white',

                                                            // background-color: white;
                                                            // color: black; 
                                                        }
                                                    }
                                                    className="btn btn-success"
                                                >
                                                    Full
                                      </button>
                                      </div> ):( (!jid.includes(jobs._id)) ? (<div>
                                                    {console.log(jid)}
                                                   <button id = {jobs._id}
                                                    style={
                                                        {
                                                            width: "100px",
                                                            borderRadius: "2px",
                                                            letterSpacing: "1px",
                                                            marginTop: "1rem",
                                                        }
                                                    }
                                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                                 onClick = {e => this.Application(e,ind)} 
                                                >
                                                    Apply
                                      </button>
                                      </div> ) : (<div>
                                                   <button 
                                                    style={
                                                        {
                                                            width: "100px",
                                                            borderRadius: "2px",
                                                            letterSpacing: "1px",
                                                            marginTop: "1rem",
                                                        }
                                                    }
                                                    className="btn btn-danger"
                                                >
                                                    Applied
                                      </button>
                                      </div> ) )}
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
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(Jlist_A);