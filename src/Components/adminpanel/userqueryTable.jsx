import React, { useState } from "react";
import TableTemplate from "../../HelpersComponents/TableTemplate";
import moment from "moment/moment.js";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { CustomDialog, useDialog } from "react-st-modal";

import {
  Grid,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

import { getUsersQueries, updateUserQuery } from "../../actions/adminaction";
import { useDispatch, useSelector } from "react-redux";
import CustomerInfoCard from "../../HelpersComponents/customersinfocardTemplate";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    width: "90vw",
    [theme.breakpoints.down("md")]: {
      overflow: "scroll",
    },
  },
  searchInput: {
    width: "100%",
  },
  buttonSize: {
    minWidth: 85,
  },
  title: {
    flex: "1 1 100%",
    color: "darkblue",
    fontWeight: "bold",
    marginTop: "3%",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  table: {
    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
      padding: "5px",
    },
  },
}));

const headCells = [
  { id: "profile", label: "" },
  { id: "fname", label: "Name" },
  { id: "phone", label: "Contact" },
  { id: "title", label: "Query" },
  // { id: "date", label: "Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "", disableSorting: true },
];

const UserQueryTable = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();
  var records = [];
  const checkAccess = useSelector((state) => state.getspecificrole);

  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  if (data.data && data.data.length) {
    data.data.map((dt) => {
      records.push(dt);
    });
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch(
      getUsersQueries(moment(date).format("ddd MMM DD YYYY").toString())
    );
  };

  const updateStatus = (_id, status) => {
    dispatch(updateUserQuery(_id, status)).then((val) => {
      if (val.status === 200) {
        dispatch(
          getUsersQueries(
            moment(selectedDate).format("ddd MMM DD YYYY").toString()
          )
        );
      }
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    TableTemplate({ records, headCells, filterFn });

  // <---------------------SHOW DIALOG----------------------->
  function CustomDialogContent(props) {
    const dialog = useDialog();

    return <CustomerInfoCard props={props} dialog={dialog} />;
  }

  return (
    <>
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item sm={8}>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Customers Queries
              </Typography>
            </Grid>
            <Grid item sm={3} style={{ marginLeft: "3%" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Search By Date"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item._id}>
                <TableCell className={classes.table}>
                  <Avatar
                    alt="Remy Sharp"
                    src={item.profilepic}
                    className={classes.orange}
                  >
                    {item.fullname ? item.fullname[0] : "A"}
                  </Avatar>
                </TableCell>
                <TableCell className={classes.table}>
                  {item.fullname ? item.fullname : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>
                  {item.phone ? item.phone : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>
                  {item.title ? item.title : "Not Available"}
                </TableCell>
                {/* <TableCell className={classes.table}>{item.date ? item.date : "Not Available"}</TableCell> */}
                <TableCell className={classes.table}>
                  {item.status === "Pending" ? (
                    <Chip
                      size="medium"
                      label={item.status}
                      style={{
                        backgroundColor: "#ffcc29",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    />
                  ) : item.status === "Solved" ? (
                    <Chip
                      size="medium"
                      color="white"
                      label={item.status}
                      style={{
                        backgroundColor: "#81b214",
                        color: "black",
                        fontWeight: "bold",
                        padding: "5%",
                      }}
                    />
                  ) : (
                    <Chip
                      size="medium"
                      label={item.status}
                      style={{
                        backgroundColor: "#fb3640",
                        color: "black",
                        fontWeight: "bold",
                        padding: "7%",
                      }}
                    />
                  )}
                </TableCell>
                {checkAccess.data.customersqueriesedit ? (
                  <TableCell className={classes.table}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        const result = await CustomDialog(
                          <CustomDialogContent
                            data={{
                              _id: item._id,
                              fullname: item.fullname,
                              phone: item.phone,
                              title: item.title,
                              description: item.description,
                              status: item.status,
                              email: item.email,
                              profilepic: item.profilepic,
                              updateStatus: updateStatus,
                              check:item.status==="Pending"?true:false,
                         
                            }}
                            style={{ zIndex: 1000 }}
                          />,
                          {
                            title: "Query Details",
                            showCloseIcon: true,
                          }
                        );
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
  // return <h1>Hello</h1>
};

export default UserQueryTable;
