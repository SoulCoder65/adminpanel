import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

// redux action
// import { login } from "../../actions";
import { changePassword } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";

// import { isUserLogin } from "../../actions/auth";

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

const ChangePasswordPage = (props) => {
  const userEmail = props.location.state.email;
  //managing states
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [showAlert, setShowAlert] = useState(null);

  // check if user already login if true direct to home
  let auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  //submit function
  const userLogin = (e) => {
    e.preventDefault();
    const data = {
      password,
      email: userEmail,
    };

    if (password.length === 0) {
      setErrormsg("Password Field Can't Be Empty!!");
      setShowAlert(true)
  
    } else if (password !== cpassword) {
      setErrormsg("Password Doesn't Match!!!");
      setShowAlert(true)
  
    } else {
       dispatch(changePassword(data)).then((res)=>{
        if(res==="network")
        {
          setShowAlert(true)
          setErrormsg("Something Went Wrong!! Maybe Server Issue.")
        }
        else{
          if (res.status === 400 ||res.status === 403 ) {
            setShowAlert(true)
            setErrormsg(res.data.message?res.data.message:res.data.msg);
          } else {
            setErrormsg("");
            setShowAlert(false)
            }
        }
       });
    }
  };

  const classes = useStyles();
  // redirect to home if login
  // if (auth.authenticate) {
  //   return <Redirect to={"/"} />;
  // }
  if (auth.message === "Password Update Successfully") {
    return <Redirect to={"/signin"} />;
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
              <VpnLockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter New Password
            </Typography>
            <form className={classes.form} noValidate onSubmit={userLogin}>
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                value={cpassword}
                onChange={(e) => setcpassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Change Password
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default ChangePasswordPage;
