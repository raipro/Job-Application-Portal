import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import Jlist from './components/Users/Jlist'
import Register from './components/Common/Register'
import Register_R from './components/Common/Register_R'
import Navbar from './components/templates/Navbar'
import Landing from './components/templates/Landing'
import Profile_R from './components/Users/Profile_R'
import Login from './components/Common/Login';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import jobs from "./components/Common/Jobs";
import editprofile_R from "./components/Users/editprofile_R";
import dashboard_A from "./components/dashboard/Dashboard_A";
import Jlist_A from "./components/Users/Jlist_A"
import Alist_A from "./components/Users/Alist_A"
import Alist_R from "./components/Users/Alist_R"
import Employee from "./components/Users/Employee"
import Profile_A from "./components/Users/Profile_A"



function App() {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("USER");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      store.dispatch(setCurrentUser(foundUser));
    }
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Landing}/>
        <Route path="/register" component={Register}/>
        <Route path ="/login" component={Login}/>
        <Route path ="/register_r" component={Register_R}/>
        <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/Jobs" component={jobs}/>
              <PrivateRoute exact path="/Jlist" component={Jlist}/>
              <PrivateRoute exact path="/Profile_R" component={Profile_R}/>
              <PrivateRoute exact path="/editprofile_R" component={editprofile_R}/>
              <PrivateRoute exact path="/dashboard_A" component={dashboard_A}/>
              <PrivateRoute exact path = '/Jlist_A' component={Jlist_A}/>
              <PrivateRoute exact path = '/Alist_A' component={Alist_A}/>
              <PrivateRoute exact path = '/Alist_R' component={Alist_R}/>
              <PrivateRoute exact path="/Profile_A" component={Profile_A}/>
              <PrivateRoute exact path="/Employee" component={Employee}/>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
