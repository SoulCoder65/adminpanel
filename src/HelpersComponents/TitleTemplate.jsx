import React from "react";
import { Paper, Divider, Grid, Button } from "@material-ui/core";
import SecurityIcon from "@material-ui/icons/Security";
import { Redirect, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  },
  access:{
    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
    },  
  }
}));

const TitleTemplate = ({ title }) => {
  const classes = useStyles();
  const token = window.localStorage.getItem("token");

  return (
    <>
      {" "}
      <Paper
        elevation={0}
        style={{
          padding: "5px",
          background: "transparent",
          color: "darkblue",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={7} md={10}>
            <h1 className={classes.title}>{title}</h1>
          </Grid>
          {JSON.parse(token).isSuperAdmin ? (
            title !== "ACCESS PANEL" ? (
              <Grid item xs={5} md={2} style={{width:"100%"}}>
                <NavLink to="/accesspanel" style={{textDecoration:"none"}}>
                <Button
                className={classes.access}
                  size="small"
                  color="primary"
                  endIcon={<SecurityIcon />}
                >
                  Access Panel
                </Button>
                </NavLink>
              </Grid>
            ) : null
          ) : null}
        </Grid>
      </Paper>
      <Divider />
    </>
  );
};

export default TitleTemplate;
