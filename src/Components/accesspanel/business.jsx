import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
      padding: "5px",
    },
  },
}));

const Business = ({ handleChange, accessList }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList.business}
                    onChange={handleChange}
                    name="business"
                    color="primary"
                  />
                }
                label="Business"
              />
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        {accessList.business ? (
          <TableBody>
            {/* Business Accounts */}
            <TableRow key="1">
              <TableCell component="th" scope="row" >
                Business Accounts
              </TableCell>
              <TableCell align="left">
                {" "}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accessList.businessview}
                      onChange={handleChange}
                      name="businessview"
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
                      checked={accessList.businessblock}
                      onChange={handleChange}
                      name="businessblock"
                      color="primary"
                    />
                  }
                  label="Block/Unblock"
                />
              </TableCell>
              <TableCell align="left">
                {" "}
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
                  control={
                    <Checkbox
                      checked={accessList.businessactive}
                      onChange={handleChange}
                      name="businessactive"
                      color="primary"
                    />
                  }
                  label="Active/Inactive"
                />
              </TableCell>
            </TableRow>

            {/* Business Categories */}
            <TableRow key="2">
              <TableCell component="th" scope="row">
                Business Categories
              </TableCell>
              <TableCell align="left">
                {" "}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accessList.categoryview}
                      onChange={handleChange}
                      name="categoryview"
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
                      checked={accessList.categoryadd}
                      onChange={handleChange}
                      name="categoryadd"
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
                      checked={accessList.categoryedit}
                      onChange={handleChange}
                      name="categoryedit"
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
                      checked={accessList.categoryactive}
                      onChange={handleChange}
                      name="categoryactive"
                      color="primary"
                    />
                  }
                  label="Active/Inactive"
                />
              </TableCell>
            </TableRow>

            {/* Category Chart*/}
            <TableRow key="3">
              <TableCell component="th" scope="row">
                Category Chart
              </TableCell>
              <TableCell align="left">
                {" "}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accessList.categorychartview}
                      onChange={handleChange}
                      name="categorychartview"
                      color="primary"
                    />
                  }
                  label="View"
                />
              </TableCell>
              <TableCell align="left">
                {" "}
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
          </TableBody>
        ) : (
          ""
        )}
      </Table>
    </TableContainer>
  );
};
export default Business;
