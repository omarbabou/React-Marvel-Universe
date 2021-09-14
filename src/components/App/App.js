import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
import Footer from "../Footer/Footer";
import Welcome from "../Welcome/Welcome";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import ErrorPage from "../ErrorPage/ErrorPage";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import "../../App.css";
// import { FirebaseProvider } from "../Firebase/context";
// import Firebase from "../Firebase/firebase";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route component={ErrorPage} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
