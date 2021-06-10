import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {
  Toolbar,
  Typography,
  Grid,
  
 
} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import EditSubAdmin from "./editadmin";
import Chip from "@material-ui/core/Chip";

import CreateSubAdmin from "./createnewsubadmin";

// import { useDispatch, useSelector } from "react-redux";
import { TableContainer } from "@material-ui/core";
import "../../../App.css";

// redux
import { getAllSubAdmins } from "../../../actions/auth";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    // width:"90vw"
  },

  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
    [theme.breakpoints.down("md")]: {
      fontSize: "10px !important",
      width: "100 !important",
    },
  },
  input: {
    width: "100%",
    height: 40,
  },
  container: {
    height: 300,
    [theme.breakpoints.down("md")]: {
      fontSize: "10px !important",
    },
  },
  title: {
    flex: "1 1 100%",
    color: "black",
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
      textAlign: "center",
      color: "black",
      marginLeft:"5%"
    },
  },
  modal: {
    "& > *": {
      margin: theme.spacing(1),
      width: "75ch",
    },
    [theme.breakpoints.down("md")]: {
      width: "30vw",
    },
  },
  modelField: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  table: {
    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
      padding: "7px",
    },
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  body: {
    fontSize: 14,

    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
      padding: "4px",
    },
  },
}))(TableCell);

// const CustomTableCell = ({ row, onChange }) => {
//   const classes = useStyles();
//   const { isEditMode } = row;
//   return (
//     <TableCell align="left" className={classes.tableCell}>
//       {isEditMode ? (
//         <Input
//           value={row.category_name}
//           name={row.category_name}
//           onChange={(e) => onChange(e, row)}
//           className={classes.input}
//         />
//       ) : (
//         row.category_name
//       )}
//     </TableCell>
//   );
// };

const SubAdmins = ({ data }) => {
  const dispatch = useDispatch(getAllSubAdmins());

  const [rows, setRows] = React.useState(data.data);

  const classes = useStyles();

  useEffect(() => {
    setRows(data.data);
  }, [data]);

  const updateData = () => {
    dispatch(getAllSubAdmins());
  };
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Paper className={classes.root} style={{ color: "red" }}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <Grid
          container
          style={{ width: "100%" }}
          spacing={3}
          alignItems="center"
        >
          <Grid item xs={12} lg={9}>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              Manage Subadmins
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            className={classes.modelField}
            style={{ width: "100%" }}
          >
            <CreateSubAdmin />
          </Grid>
        </Grid>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.table}>
                Name
              </StyledTableCell>
              <StyledTableCell className={classes.table} align="left">
                Email
              </StyledTableCell>
              <StyledTableCell className={classes.table} align="left">
                Mobile
              </StyledTableCell>
              <StyledTableCell className={classes.table} align="left">
                Role
              </StyledTableCell>
              <StyledTableCell className={classes.table} align="left">
                Status
              </StyledTableCell>
              <StyledTableCell
                className={classes.table}
                align="left"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) =>
              !row.isSuperAdmin ? (
                <StyledTableRow key={row._id}>
                  <StyledTableCell className={classes.table}>
                    {row.fullname}
                  </StyledTableCell>
                  <StyledTableCell className={classes.table} align="left">
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell className={classes.table} align="left">
                    {row.phone}
                  </StyledTableCell>
                  <StyledTableCell className={classes.table} align="left">
                    {capitalize(row.role)}
                  </StyledTableCell>
                  <StyledTableCell className={classes.table} align="left">
                    {row.isActive ? (
                      <Chip
                        size="medium"
                        color="white"
                        label="Active"
                        style={{
                          backgroundColor: "#81b214",
                          color: "black",
                          fontWeight: "bold",
                          padding: "7%",
                        }}
                      />
                    ) : (
                      <Chip
                        size="medium"
                        label="Inactive"
                        style={{
                          backgroundColor: "#fb3640",
                          color: "black",
                          fontWeight: "bold",
                          padding: "4%",
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell className={classes.table} align="left">
                    {<EditSubAdmin updateFun={updateData} data={row} />}
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                ""
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default SubAdmins;
