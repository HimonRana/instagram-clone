import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import { Header, Footer } from "../";
import {
  Home,
  Profile,
  AllProfiles,
  UsersProfile,
  Explore,
  SignUp,
  SignIn,
  CreatePost,
  ProfileEdit,
  NotFoundPage
} from "../../views";

import "./App.css";

const App = children => (
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/profile/:id" component={UsersProfile} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/profiles" component={AllProfiles} />
      <PrivateRoute exact path="/createpost" component={CreatePost} />
      <PrivateRoute exact path="/dashboard" component={ProfileEdit} />
      <PrivateRoute exact path="/explore" component={Explore} />
      <PrivateRoute exact path="/home" component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </React.Fragment>
);

export default App;
