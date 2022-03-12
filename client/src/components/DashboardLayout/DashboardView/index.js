import React, { useEffect, useState } from "react";
import {  Grid, makeStyles } from "@material-ui/core";
import UserDetails from "./UserDetails";
import { useAuthState } from "../../../context/AuthContext";
import Spinner from "../../common/Spinner"
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
   
  }
}));

const MainDashboard = ({ detailList }) => {
  
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(true);
  const { userType } = useAuthState();

var usercoins=userCoins;
  useEffect(() => {
    setLoading(true);
  
    setLoading(false);
  }, [token, userID, userType]);

  return <></>
  
};

export default MainDashboard;
