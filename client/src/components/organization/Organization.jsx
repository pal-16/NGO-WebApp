import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import ProtectedRoute from "../common/ProtectedRoute";
const Organization = () => {
  return (
    <Switch>
      <Route path="/org/login">
        <Login userType="user" name="User" />
      </Route>
      <Route path="/org/register" component={Register} />


    </Switch>
  );
};

export default Organization;
