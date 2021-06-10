import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

// components
import Header from "../Navigation/navigation";
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import SearchSubAdmin from "./searchsubadmin";
import Business from "./business";
import Customers from "./customers";
import Queries from "./queries";
import SubAdmins from "./managesubadmins/admintables";
import { Button } from "@material-ui/core";

// redux
import {
  getAllSubAdmins,
  getAllRoles,
  editaccess,
  accessspecificrole,
} from "../../actions/auth";
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
  pageContent: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    width: "90vw",
    [theme.breakpoints.down("md")]: {
      overflow: "scroll",
    },
  },
}));
const AccessPanel = () => {
  const classes = useStyles();

  const [accessList, setaccessList] = useState({
    // Business Page
    business: false,
    businessview: false,
    businessblock: false,
    businessactive: false,

    categoryview: false,
    categoryedit: false,
    categoryactive: false,
    categoryadd: false,

    categorychartview: false,
    // Business Page END

    // CustomersPage
    customers: false,
    customersview: false,
    customersblock: false,
    customersactive: false,

    customerstokenview: false,
    // CustomersPage ENd

    // queries page
    queries: false,

    businessqueriesview: false,
    businessqueriesedit: false,

    customersqueriesview: false,
    customersqueriesedit: false,
    // queries page END
  });

  const [role, setrole] = useState("");
  const [_id, setId] = useState("");

  const allsubadmins = useSelector((state) => state.getAllSubAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubAdmins());
    dispatch(getAllRoles());
  }, []);

  const updateAccess = (_id) => {
    setId(_id);
    try {
      dispatch(accessspecificrole(_id,null)).then((res) => {
        if (res.status == 200) {
          if (res.data !== null) {
            setaccessList(res.data);
          } else {
            setaccessList({
              business: false,
              businessview: false,
              businessblock: false,
              businessactive: false,

              categoryview: false,
              categoryedit: false,
              categoryactive: false,
              categoryadd: false,

              categorychartview: false,
              // Business Page END

              // CustomersPage
              customers: false,
              customersview: false,
              customersblock: false,
              customersactive: false,

              customerstokenview: false,
              // CustomersPage ENd

              // queries page
              queries: false,

              businessqueriesview: false,
              businessqueriesedit: false,

              customersqueriesview: false,
              customersqueriesedit: false,
            });
          }
        }
      });
    } catch (e) {}
  };

  const handleChange = (event) => {
    setaccessList({ ...accessList, [event.target.name]: event.target.checked });
  };
  const saveChanges = () => {
    if (_id !== "") {
      try {
        dispatch(editaccess(_id, accessList)).then((res) => {
          if ((res.status = 200)) {
            Swal.fire(
              "Success",
              "Accesses Modified Successfully",
              "success"
            );
          }
        });
      } catch (e) {
        Swal.fire(
          "Failed",
          "Failed To Modified Accesses",
          "warning"
        );
        console.log(e);
      }
    }
  };
  return (
    <Header>
      <div className={classes.root}>
        <TitleTemplate title="ACCESS PANEL" />
        <div className={classes.pageContent}>
          <SearchSubAdmin
            updateAccess={updateAccess}
            role={role}
            setrole={setrole}
          />
          {role !== "" ? (
            <>
              <Business handleChange={handleChange} accessList={accessList} />
              <Customers handleChange={handleChange} accessList={accessList} />
              <Queries handleChange={handleChange} accessList={accessList} />
            </>
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          >
           {role!==""? <Button variant="contained" color="primary" onClick={saveChanges}>
              SAVE
            </Button>:null}
          </div>
          <SubAdmins data={allsubadmins} />
        </div>
      </div>
    </Header>
  );
};

export default AccessPanel;
