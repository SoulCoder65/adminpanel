import React, { useEffect, useState } from "react";
import Header from "../Navigation/navigation";
import { makeStyles } from "@material-ui/core/styles";

// Helpers
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import UserTable from "./userTable";
import DayWiseRecordsTable from "./daywiserecords/daywisetable";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListData, daywiseData } from "../../actions/useraction";
import moment from "moment/moment.js";
import { Redirect } from "react-router-dom";
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

const Users = () => {
  const users = useSelector((state) => state.usersData);
  const daywise = useSelector((state) => state.daywiselist);
  const checkAccess = useSelector((state) => state.getspecificrole);
  const [customers, setcustomers] = useState(false);
  const [customersview, setcustomersview] = useState(false);
  const [customerstokenview, setcustomerstokenview] = useState(false);
  const [doRedirect, setdoRedirect] = useState(false);

  const token = window.localStorage.getItem("token");

  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersListData());
    dispatch(daywiseData(moment(Date()).format("ddd MMM DD YYYY").toString()));
    dispatch(accessspecificrole(null, JSON.parse(token).role.toString())).then(
      (res) => {
        if (res.status === 200) {
          if (!res.data.customers) {
            setdoRedirect(true);
          }
        } else {
        }
      }
    );
  }, []);

  useEffect(() => {
    if(checkAccess.data!=null ||checkAccess.data!==undefined)
    {

    
    setcustomers(checkAccess.data.customers);
    setcustomersview(checkAccess.data.customersview);
    setcustomerstokenview(checkAccess.data.customerstokenview);
    }
  }, [checkAccess.data]);
  if (!doRedirect) {
    return (
      <>
        <Header>
          <div className={classes.root}>
            <TitleTemplate title="CUSTOMER PANEL" />
            {customers && customersview ? <UserTable data={users} /> : null}
            {customers && customerstokenview ? (
              <DayWiseRecordsTable data={daywise.data} />
            ) : null}
          </div>
        </Header>
      </>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
export default Users;
