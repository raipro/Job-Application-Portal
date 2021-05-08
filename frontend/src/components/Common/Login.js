import React, {Component} from 'react';
//import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
 class Login extends Component {
    
    constructor(props) 
     {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        
        
          this.onChangeEmail = this.onChangeEmail.bind(this);
           this.onChangepassword = this.onChangepassword.bind(this);
           this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          if(this.props.auth.user.UserType === "Recruiter")
          {
            this.props.history.push("/dashboard");
          }
          else
          {
            this.props.history.push("/dashboard_A");
          }
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          console.log(nextProps.auth.user);
          if(nextProps.auth.user.UserType === "Recruiter")
          {
           this.props.history.push("/dashboard");
          }
          else
          {
          this.props.history.push("/dashboard_A");
          } // push user to dashboard when they login
          if (nextProps.errors) {
            this.setState({
              errors: nextProps.errors
            });
          }
        }              
        }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangepassword(event) {
        this.setState({ password: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history); 
     //   axios.post('http://localhost:4000/user/login', newUser)
       //      .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
       //      ;

        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
const { errors } = this.state;        
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className=  {classnames("", {
                                invalid: errors.email || errors.emailnotfound
                              })}
                               value={this.state.email}
                               error={errors.email}
                               onChange={this.onChangeEmail}
                               />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                              })}
                               value={this.state.password}
                               error={errors.password}
                               onChange={this.onChangepassword}
                               /> 
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>         
                     </div>       
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);
  