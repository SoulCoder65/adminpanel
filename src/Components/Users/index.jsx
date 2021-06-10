import React, { useEffect } from "react";
import Header from "../Navigation/navigation";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// Helpers
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import UserTable from "./userTable";
import DayWiseRecordsTable from "./daywiserecords/daywisetable";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListData, daywiseData } from "../../actions/useraction";
import moment from "moment/moment.js";
import { Redirect, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Users = () => {
  const users = useSelector((state) => state.usersData);
  const daywise = useSelector((state) => state.daywiselist);
  const checkAccess = useSelector((state) => state.getspecificrole);

  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersListData());
    dispatch(daywiseData(moment(Date()).format("ddd MMM DD YYYY").toString()));
  }, []);
  if(!checkAccess.data.customers){
    return <Redirect to={"/"} />;

  }
  return (
    <>
      <Header>
        <div className={classes.root}>
          <TitleTemplate title="USER PANEL" />
          {checkAccess.data.customers && checkAccess.data.customersview ? (
            <UserTable data={users} />
          ) : null}
          {checkAccess.data.customers && checkAccess.data.customerstokenview ? (
            <DayWiseRecordsTable data={daywise.data} />
          ) : null}
        </div>
      </Header>
    </>
  );
};
export default Users;
