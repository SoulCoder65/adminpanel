import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import AddnewRole from "./addnewrole";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, getAllSubAdmins } from "../../actions/auth";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),

    marginBottom: "3%",
    [theme.breakpoints.down("md")]: {
      overflow: "scroll",
    },
  },
  title: {
    fontWeight: "bold",
  },
}));

const SearchSubAdmin = ({ updateAccess, role, setrole }) => {
  const state = useSelector((state) => state.getAllroles);
  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  const dispatch = useDispatch(getAllSubAdmins());

  const setRole = (e) => {
    setrole(e.target.value);
    if (e.target.value != null || e.target.value !== undefined) {
      updateAccess(e.target.value);
    }
  };
  const updatesRoles = () => {
    dispatch(getAllRoles());
  };
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.pageContent}>
        <Grid container spacing={2} alignItems="center">
          <Grid item sm={2} xs={12}>
            <Typography
              className={classes.title}
              variant="body1"
              id="tableTitle"
              component="div"
              style={{textAlign:"center"}}
            >
              Sub-Admin
            </Typography>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            style={{ color: "red", width: "1px", marginRight: "5px" }}
          />

          <Grid item sm={7} xs={12}>
            <Select
              style={{ width: "100%", minWidth: "50%" }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              variant="outlined"
              value={role || ""}
              onChange={setRole}
            >
              {state.data !== null
                ? state.data.map((dt, index) => {
                    return (
                      <MenuItem key={index} value={dt._id}>
                        {dt.role_name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </Grid>
          <Grid item md={2} style={{width:"100%"}} alignContent="flex-end">
            <AddnewRole updatesRoles={updatesRoles} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SearchSubAdmin;
