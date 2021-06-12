import React, { useEffect, useState } from "react";
import Header from "../Navigation/navigation";
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import BusinessQueryTable from "./businessqueryTable";
import UserQueryTable from "./userqueryTable";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment/moment.js";
import { Redirect } from "react-router-dom";

//recux
import { getBusinessQueries, getUsersQueries } from "../../actions/adminaction";
import { useDispatch, useSelector } from "react-redux";
import { accessspecificrole } from "../../actions/auth";

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
  const [queries, setqueries] = useState(false);
  const [businessqueriesview, setbusinessqueriesview] = useState(false);
  const [customersqueriesview, setcustomersqueriesview] = useState(false);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [doRedirect, setdoRedirect] = useState(false);

  useEffect(() => {
    dispatch(
      getBusinessQueries(moment(Date()).format("ddd MMM DD YYYY").toString())
    );
    dispatch(
      getUsersQueries(moment(Date()).format("ddd MMM DD YYYY").toString())
    );
    dispatch(accessspecificrole(null, JSON.parse(token).role.toString())).then(
      (res) => {
        if (res.status === 200) {
          if (!res.data.queries) {
            setdoRedirect(true);
          }
        } else {
         }
      }
    );
  }, []);

  useEffect(() => {
    if (checkAccess.data != null || checkAccess.data !== undefined) {
      setqueries(checkAccess.data.queries);
      setbusinessqueriesview(checkAccess.data.businessqueriesview);
      setcustomersqueriesview(checkAccess.data.customersqueriesview);
    }
  }, [checkAccess.data]);
  if (!doRedirect) {
    return (
      <Header>
        <div className={classes.root}>
          <TitleTemplate title="QUERIES" />
          {queries && businessqueriesview ? (
            <BusinessQueryTable data={businessqueries} />
          ) : null}
          {queries && customersqueriesview ? (
            <UserQueryTable data={usersqueries} />
          ) : null}
        </div>
      </Header>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};

export default AdminPanel;
