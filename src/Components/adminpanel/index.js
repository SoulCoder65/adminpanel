import React, { useEffect } from "react";
import Header from "../Navigation/navigation";
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import BusinessQueryTable from "./businessqueryTable";
import UserQueryTable from "./userqueryTable";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment/moment.js";
import { Redirect, Route } from "react-router-dom";

//recux
import { getBusinessQueries, getUsersQueries } from "../../actions/adminaction";
import { useDispatch, useSelector } from "react-redux";

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

const AdminPanel = () => {
  const classes = useStyles();
  let businessqueries = useSelector((state) => state.businessqueries);
  let usersqueries = useSelector((state) => state.userqueries);
  const checkAccess = useSelector((state) => state.getspecificrole);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBusinessQueries(moment(Date()).format("ddd MMM DD YYYY").toString())
    );
    dispatch(
      getUsersQueries(moment(Date()).format("ddd MMM DD YYYY").toString())
    );
  }, []);
  if(!checkAccess.data.queries){
    return <Redirect to={"/"} />;

  }

  return (
    <Header>
      <div className={classes.root}>
        <TitleTemplate title="QUERIES" />
        {checkAccess.data.queries && checkAccess.data.businessqueriesview ? (
          <BusinessQueryTable data={businessqueries} />
        ) : null}
        {checkAccess.data.queries && checkAccess.data.customersqueriesview ? (
          <UserQueryTable data={usersqueries} />
        ) : null}
      </div>
    </Header>
  );
};

export default AdminPanel;
