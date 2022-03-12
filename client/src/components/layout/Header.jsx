import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import MoreIcon from "@material-ui/icons/MoreVert";
import Dropdown from "../common/Dropdown";
import "../common/Dropdownstyles.css";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  navButton: {
    marginRight: "15px"
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, userType } = useAuthState();
  const dispatch = useAuthDispatch();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigationHandler = (route) => {
    handleMobileMenuClose();
    history.push(route);
  };



  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.replace("/");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

    </Menu>
  );
  return (
    <div className={classes.grow} >

      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            disableRipple
            disableFocusRipple
            className={classes.button}

            onClick={() => navigationHandler("/")}
          >

            <Typography variant="h6" noWrap style={{ color: "white", marginLeft: "10px" }}>
              Lend a Hand
            </Typography>
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            {/* <Button
              onClick={handleLogout}
              color="inherit"
              className={`${classes.navButton} ${classes.button}`}
              disableRipple
              disableFocusRipple >
              <Typography variant="body1" noWrap style={{ paddingBottom: "8px" }} >
                Logout
              </Typography>
            </Button> */}


            <Button
              onClick={() => navigationHandler("/user/login")}
              color="inherit"
              className={`${classes.navButton} ${classes.button}`}
              disableRipple
              disableFocusRipple
            >
              <Typography variant="body1" noWrap>
                User
              </Typography>
            </Button>
            <Button
              onClick={() => navigationHandler("/org/login")}
              color="inherit"
              disableRipple
              disableFocusRipple
              className={classes.button}
            >
              <Typography variant="body1" noWrap>
                Organization
              </Typography>
            </Button>
          </div>


          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}



    </div >


  );
};

export default Header;
