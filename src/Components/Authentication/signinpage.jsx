import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {NavLink} from "react-router-dom"
// redux action
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

// Side image
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Bank App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginLeft: "5%",
    marginRight: "5%",
  },
}));

const SigninPage = (props) => {
  //managing states
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  
  const errorcheck = "Authentication failed,Admin Account Not found";
  // check if user already login if true direct to home
  let auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  //submit function
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user)).then((res) => {
      if (res == "network") {
        setShowAlert(true);
        setErrormsg("Something Went Wrong!! Maybe Server Issue.");
      } else {
        if (res.status == 400 || res.status == 403) {
          console.log(res);
          setShowAlert(true);
          setErrormsg(res.data.message ? res.data.message : "Something Went Wrong!! Try Again Later");
        } else {
          console.log(res.data);
          setErrormsg("");
          setShowAlert(false);
        }
      }
    });
  };

  const classes = useStyles();
  // redirect to home if login
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      {showAlert && (
        <Alert
          className={classes.alert}
          variant="filled"
          severity="error"
          onClose={() => setShowAlert(null)}
        >
          {errormsg}
        </Alert>
      )}

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        component="main"
        className={classes.root}
      >
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ExitToAppIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={userLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink to="/verifyEmail" variant="body2" style={{textDecoration:"none"}}>
                    Forgot password?
                  </NavLink>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default SigninPage;
