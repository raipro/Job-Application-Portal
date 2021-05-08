import axios from "axios";
//import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
   //console.log(userData);
  axios
    .post("/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const registerR = (userData, history) => dispatch => {
  //console.log(userData);
 axios
   .post("/users/register_r", userData)
   .then(res => history.push("/login")) // re-direct to login on successful register
   .catch(err =>
     dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     })
   );
};
export const editProfileR = (userData, history) => dispatch => {
  //console.log(userData);
 axios
   .post("/users/editprofile_R", userData)
   .then(res => {
   //  history.push("/Profile_R");
     var User = JSON.parse(localStorage.getItem('USER'));
     if (userData.name !== "")
     {
        User.name = userData.name;
     }
     if (userData.contactno !== "")
     {
        User.contactno = userData.contactno;
     }
     if (userData.bio !== "")
     {
        User.bio = userData.bio;
     }
     localStorage.removeItem("USER");
     localStorage.setItem("USER",JSON.stringify(User));
     dispatch(setCurrentUser(User));
     history.push("/Profile_R");
  }) 
   .catch(err =>
     dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     })
   );
};

export const ProfileA = (userData, history) => dispatch => {
  console.log("kartikinauthactions");
  axios
  .post("/users/Profile_A", userData)
  .then(res =>
    { 
    var User = JSON.parse(localStorage.getItem('USER'));
    if (userData.name !== "")
    {
       User.name = userData.name;
    }
    if (userData.skills !== "")
    {
       User.skills = userData.skills;
    }
    if (userData.education !== [])
    {
       User.education = userData.education;
    }
    localStorage.removeItem("USER");
    localStorage.setItem("USER",JSON.stringify(User));
    dispatch(setCurrentUser(User));
    history.push("/Dashboard_A")
    })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const JobR = (userData, history) => dispatch => {
  axios
  .post("/users/Jobs", userData)
  .then(res => history.push("/dashboard"))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}
// Login - get user token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      // Save to localStorage
      console.log(res.data);
// Set token to localStorage
      // if(res.data.UserType === 'Recruiter')
      // {  
      // history.push('/dashboard');
      // }
      // else
      // history.push('/dashboard_A');
      const { token } = res.data;
      console.log(res.data);
      localStorage.setItem("USER", JSON.stringify(res.data));
      // Set token to Auth header
     // setAuthToken(token);
      // Decode token to get user data
     // const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = token => {
  return {
    type: SET_CURRENT_USER,
    payload: token
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storusage
  localStorage.removeItem("USER");
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

