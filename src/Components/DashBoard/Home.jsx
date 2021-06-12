import React, { useEffect, useState } from "react";
import Header from "../Navigation/navigation";
// react-bootstrap components
import { makeStyles } from "@material-ui/core/styles";

import { Grid, MenuItem, InputLabel, Select } from "@material-ui/core";

import { getBusinessData } from "../../actions/businessaction";
import { getUserData } from "../../actions/useraction";
import { useDispatch, useSelector } from "react-redux";

// Helpers
// import CardModel from "../../HelpersComponents/CardTemplate";
import CardModel from "../../HelpersComponents/CardTemplate";
import Businessstats from "../Charts/businessstats";
import UsersStats from "../Charts/usersstats";
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import UserImage from "../../utils/images/customerqueue.jpg";
import BusinessImage from "../../utils/images/business.jpg";
import QueryImage from "../../utils/images/query.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "inherit",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  gridCSS: {
    [theme.breakpoints.down("md")]: {
      width: "80vw !important",
    },
  },
  charts: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    maxHeight: "340",
    width: "90vw",
    margin: "auto",
    // margin:"auto"
    [theme.breakpoints.down("md")]: {
      width: "100vw !important",
      margin: "auto",
      paddingLeft: "20%",
    },
  },
  select:{
    width:"30%",
    [theme.breakpoints.down("md")]: {
    width:"50%"  
    },
  }
}));
const Home = () => {
  const classes = useStyles();
  const [searchKey, setsearchKey] = useState("year");
  const [searchcustomerKey, setsearchcustomerKey] = useState("year")
  let business = useSelector((state) => state.business);
  let users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBusinessData("year"));
    dispatch(getUserData("year"));
  }, []);

  const handlechange = (e) => {
    setsearchKey(e.target.value);
    dispatch(getBusinessData(e.target.value))
  };
  const handleCustomerschange=(e)=>{
    setsearchcustomerKey(e.target.value);
    dispatch(getUserData(e.target.value));
  

  }
  return (
    <>
      <Header>
        <div className={classes.root}>
          <TitleTemplate title="DASHBOARD" />
          <Grid
            container
            spacing={3}
            style={{ marginBottom: "2%", marginTop: "1%" }}
            justify="center"
            alignItems="center"
            className={classes.gridCSS}
          >
            <CardModel
              title="Manage Businesses"
              tag="Business"
              iconName="fas fa-ellipsis-v"
              bgPhoto={BusinessImage}
              cta="View"
              direct="business"
            />
            <CardModel
              title="Manage Customers"
              tag="Customers"
              iconName="fas fa-ellipsis-v"
              bgPhoto={UserImage}
              cta="View"
              direct="users"
            />

            <CardModel
              title="Manage Queries"
              tag="Queries"
              iconName="fas fa-ellipsis-v"
              bgPhoto={QueryImage}
              cta="View"
              direct="queries"
            />
            <Grid item className={classes.charts}>
              <div style={{ marginBottom: "1%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Search By
                </InputLabel>
                <Select
                 className={classes.select}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={searchKey}
                  onChange={handlechange}
                >
                  <MenuItem value={"year"}>Year</MenuItem>
                  <MenuItem value={"month"}>This Month</MenuItem>
                  <MenuItem value={"sevendays"}>Last 7 Days</MenuItem>
                  <MenuItem value={"lst24hrs"}>Last 24 Hours</MenuItem>
                </Select>
              </div>
              <Businessstats business={business} check={searchKey} />
            </Grid>
            <Grid item style={{ marginTop: "2%" }} className={classes.charts}>
            <div style={{ marginBottom: "1%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Search By
                </InputLabel>
                <Select
                 className={classes.select}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={searchcustomerKey}
                  onChange={handleCustomerschange}
                >
                  <MenuItem value={"year"}>Year</MenuItem>
                  <MenuItem value={"month"}>This Month</MenuItem>
                  <MenuItem value={"sevendays"}>Last 7 Days</MenuItem>
                  <MenuItem value={"lst24hrs"}>Last 24 Hours</MenuItem>
                </Select>
              </div>
              <UsersStats users={users} check={searchcustomerKey}/>
            </Grid>
          </Grid>
        </div>
      </Header>
    </>
  );
};
export default Home;
