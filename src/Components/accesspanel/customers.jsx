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
  
const Customers = ({ handleChange, accessList }) => {
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
                    checked={accessList.customers}
                    onChange={handleChange}
                    name="customers"
                    color="primary"
                  />
                }
                label="Customers"
              />
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
      {accessList.customers?  <TableBody>
          {/* Business Accounts */}
          <TableRow key="1">
            <TableCell component="th" scope="row">
              Customers Accounts
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.customersview}
                    onChange={handleChange}
                    name="customersview"
                    color="primary"
                  />
                }
                label="View"
              />
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.customersblock}
                    onChange={handleChange}
                    name="customersblock"
                    color="primary"
                  />
                }
                label="Block/Unblock"
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
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.customersactive}
                    onChange={handleChange}
                    name="customersactive"
                    color="primary"
                  />
                }
                label="Active/Inactive"
              />
            </TableCell>
            </TableRow>


          {/* Customers TOkens*/}
          <TableRow key="2">
            <TableCell component="th" scope="row">
              Customers Token
            </TableCell>
            <TableCell align="left">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.customerstokenview}
                    onChange={handleChange}
                    name="customerstokenview"
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
        </TableBody>:""}
      </Table>
    </TableContainer>
  );
};
export default Customers;
