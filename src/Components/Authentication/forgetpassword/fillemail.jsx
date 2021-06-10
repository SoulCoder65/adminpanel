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
import EmailIcon from "@material-ui/icons/Email";
import {NavLink} from "react-router-dom"

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "@material-ui/lab/Alert";

// redux action
// import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../../actions/auth";

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
  alert:{
    marginLeft:"5%",
    marginRight:"5%",
  }
}));

const VerifyEmailPage = (props) => {
  //managing states
  const [email, setemail] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [showAlert, setShowAlert] = useState(null);

  const errorcheck = "Authentication failed,Admin Account Not found";
  // check if user already login if true direct to home
  let auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
   //submit function
  const userLogin = (e) => {
    e.preventDefault();
    const emailData = {
      email,
    };
    dispatch(verifyEmail(emailData)).then((res)=>{
      if(res=="network")
      {
        setShowAlert(true)
        setErrormsg("Something Went Wrong!! Maybe Server Issue.")
      }
      else{
        console.log(res);
        if (res.status == 400 ||res.status == 403 ) {
          setShowAlert(true)
          setErrormsg(res.data.message?res.data.message:res.data.msg);
        } else {
          setErrormsg("");
          setShowAlert(false)
          }
      }
    });
  };

  const classes = useStyles();
  // redirect to home if login
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  if (auth.message == "email exists") {
    return (
      <Redirect
        to={{
          pathname: "/changepassword",
          state: { email: email },
        }}
      />
    );
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
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter Email
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Verify
              </Button>
              <NavLink to="/signin">
              <IconButton aria-label="delete">
                <ArrowBackIcon />
              </IconButton>
              </NavLink>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default VerifyEmailPage;
