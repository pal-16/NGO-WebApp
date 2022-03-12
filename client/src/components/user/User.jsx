import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import ProtectedRoute from "../common/ProtectedRoute";
const User = () => {
  return (
    <Switch>
      <Route path="/user/login">
        <Login userType="user" name="User" />
      </Route>
      <Route path="/user/register" component={Register} />


    </Switch>
  );
};

export default User;
