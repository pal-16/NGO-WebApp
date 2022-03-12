import React, { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Box,
  Typography,
  Button,
  Paper,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  FormHelperText,
  Grid,

} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Spinner from "../../common/Spinner";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../../context/AuthContext";
import { SnackbarContext } from "../../../context/SnackbarContext";
import FormField from "../../common/FormField";
import constants from "../../../constants";
import { register } from "../../../actions/authActions";
import { REQUEST_AUTH } from "../../../reducers/types";
import validator from 'validator'
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      width: "40%"
    }
  },
  form: {
    width: "100%",
    justifyContent: "center"
  },
  formInner: {
    padding: "20px 30px"
  },
  formControl: {
    marginBottom: "20px",
    width: "100%"
  },
  key: {
    backgroundColor: "#D6D6D6",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));


const Register = () => {
  const classes = useStyles();
  //const { loading } = useAuthState();
  const [loading, setLoading] = useState(false);
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleUser = (e) => {
    setUser((prevStudent) => ({
      ...prevStudent,
      [e.target.name]: e.target.value
    }));
  };
  const isFormValid = () => {
    let formIsValid = true;
    return formIsValid;
  };

  const handleFormSubmit = (event) => {
    setLoading(true);
    dispatch({ type: REQUEST_AUTH });
    event.preventDefault();
    if (isFormValid()) {
      register({ dispatch, user: user, userType: "user" }).then((res) => {
        setLoading(false);
        if (res.error) {
          setSeverity("error");
          setMessage(res.error);
          setOpen(true);
        } else {

          setSeverity("success");
          setMessage("You have successfully registered.");
          setOpen(true);
          history.push(`/`);
        }
      });
    } setLoading(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>

      <Box
        className={classes.root}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
          <div style={{ marginTop: "24px" }}>
            <Typography variant="h5">User Registration</Typography>
          </div>
          <form className={classes.form} noValidate>
            <div className={classes.formInner}>
              <FormField
                label="Name"
                name="name"
                required={true}
                onChange={handleUser}

              />
              <FormField
                label="Email"
                name="email"
                required={true}
                onChange={handleUser}

              />
              <FormField
                label="Password"
                name="password"
                required={true}
                onChange={handleUser}

                InputProps={{
                  type: showPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                onClick={handleFormSubmit}
                size="large"
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
              >
                Register
              </Button>
            </div>
          </form>
          <Typography
            style={{ color: "#303F9E", fontSize: 15, marginBottom: "15px" }}
          >
            Already have an account?
            <Link style={{ color: "#303F9E" }} to={`/user/login`}>
              {" "}
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default Register;