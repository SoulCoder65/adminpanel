import React, { useState, useEffect } from "react";
import TableTemplate from "../../../HelpersComponents/TableTemplate";
import moment from "moment/moment.js";

import {
  Grid,
  MenuItem,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import { daywiseData } from "../../../actions/useraction";
import { useDispatch, useSelector } from "react-redux";

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
  KeyboardTimePicker,
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
  table:{
    [theme.breakpoints.down('md')]:{
      fontSize:"10px",
      padding:'5px'
    }
  }
}));

const headCells = [
  { id: "cname", label: "Customer Name" },
  { id: "cphone", label: "Customer Contact" },
  { id: "bname", label: "Business Name" },
  { id: "attender", label: "Business Attender" },
  { id: "bphone", label: "Business Contact" },
  { id: "token", label: "Token" },
  { id: "time", label: "Time" },
  { id: "actions", label: "", disableSorting: true },
];

const DayWiseTable = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [queue, setQueue] = useState(data);
  const dispatch = useDispatch();
  var records = [];
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  console.log(data);
  if (data) {
    data.map((dt) => {
      dt.usersList.map((rs) => {
        records.push(rs);
      });
    });
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(moment(date).format("ddd MMM DD YYYY").toString());
    dispatch(daywiseData(moment(date).format("ddd MMM DD YYYY").toString()));
  };

  console.log(records);

  // console.log(records);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    TableTemplate({ records, headCells, filterFn });

  return (
    <>
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar style={{ width: "100%" }}>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item lg={8} md={12}>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Day Wise Tokens
              </Typography>
            </Grid>
            <Grid item lg={3} md={12} style={{ marginLeft: "3%" }}>
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
                  {item.fullname ? item.fullname : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>
                  {item.userphone ? item.userphone : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>
                  {item.businessname ? item.businessname : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>
                  {item.contactpersonname
                    ? item.contactpersonname
                    : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>{item.phone}</TableCell>
                <TableCell className={classes.table}>
                  {item.token ? item.token : "Not Available"}
                </TableCell>
                <TableCell className={classes.table}>{item.date ? item.date : "Not Available"}</TableCell>
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

export default DayWiseTable;
