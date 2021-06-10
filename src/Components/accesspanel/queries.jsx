import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  table: {
      
    [theme.breakpoints.down('md')]:{
        fontSize:"10px",
        padding:'5px'
      }},
    
}));

const Queries = ({ handleChange, accessList }) => {
  const classes = useStyles();

  return (
    <TableContainer style={{ marginTop: "3%" }} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.queries}
                    onChange={handleChange}
                    name="queries"
                    color="primary"
                  />
                }
                label="Queries"
              />
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
      {accessList.queries?  <TableBody>
          {/* Business Queries */}
          <TableRow key="1">
            <TableCell component="th" scope="row">
              Business Queries
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.businessqueriesview}
                    onChange={handleChange}
                    name="businessqueriesview"
                    color="primary"
                  />
                }
                label="View"
              />
            </TableCell>
            <TableCell align="left">
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    checked={false}
                    // onChange={handleChange}
                    name=""
                    color="primary"
                  />
                }
                label="Add"
              />
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.businessqueriesedit}
                    onChange={handleChange}
                    name="businessqueriesedit"
                    color="primary"
                  />
                }
                label="Edit"
              />
            </TableCell>
            <TableCell align="left">
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    checked={false}
                    // onChange={handleChange}
                    name=""
                    color="primary"
                  />
                }
                label="Active/Inactive"
              />
            </TableCell>
          </TableRow>

          {/* Customers queries*/}
          <TableRow key="2">
            <TableCell component="th" scope="row">
              Customers Queries
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.customersqueriesview}
                    onChange={handleChange}
                    name="customersqueriesview"
                    color="primary"
                  />
                }
                label="View"
              />
            </TableCell>
            <TableCell align="left">
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    checked={false}
                    // onChange={handleChange}
                    name=""
                    color="primary"
                  />
                }
                label="Add"
              />
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.customersqueriesedit}
                    onChange={handleChange}
                    name="customersqueriesedit"
                    color="primary"
                  />
                }
                label="Edit"
              />
            </TableCell>

            <TableCell align="left">
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    checked={false}
                    // onChange={handleChange}
                    name=""
                    color="primary"
                  />
                }
                label="Edit"
              />
            </TableCell>
          </TableRow>
        </TableBody>:""}
      </Table>
    </TableContainer>
  );
};
export default Queries;
