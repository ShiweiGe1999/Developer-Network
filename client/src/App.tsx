import jwtDecode from "jwt-decode";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { useAppDispatch } from "./hooks";
import { logout, setCurrentUser } from "./reducers/authReducer";
import setAuthToken from "./utils/setAuthToken";
function App() {
  const dispatch = useAppDispatch();
  // Check for token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info
    const decoded: any = jwtDecode(localStorage.jwtToken);
    // Set user and isAuthenticated
    dispatch(setCurrentUser(decoded));
    // check if token expired
    const currentTime: number = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // logout user
      dispatch(logout());
      // clear local storage token
      localStorage.removeItem("jwtToken");
      // Redirect to login page
      window.location.href = "/login";
    }
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
