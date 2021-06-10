import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { Search } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import TableTemplate from "../../HelpersComponents/TableTemplate";
import Controls from "../../HelpersComponents/Input";
import {
  TextField,
  Grid,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import { getUsersListData,removeUserAccount,blockUnblockUser } from "../../actions/useraction";
import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    width:"90vw",
    [theme.breakpoints.down('md')]: {
    overflow:"scroll",  
    },
  },
  searchInput: {
    width: "100%",
  },
  buttonSize: {
    minWidth: 85,
    [theme.breakpoints.down('md')]: {
    minWidth:10  
    },
  },
  table:{
    [theme.breakpoints.down('md')]:{
      fontSize:"10px",
      padding:'5px'
    }
  }
}));


const UserTable = ({ data }) => {
  const deletestatus=useSelector((state)=>state.userdelete)
  const checkAccess = useSelector((state) => state.getspecificrole);
 
  const dispatch = useDispatch(getUsersListData());
   const headCells = [
    { id: "fname", label: "First Name" },
    { id: "lname", label: "Last  Name" },
    { id: "phone", label: "Mobile" },
    {id:"email",label:"Email"},
    { id: "state", label: "State" },
    { id: "city", label: "City" },
    { id: "actions", label: `Total Accounts ${data.data?data.data.length:0}`, disableSorting: true },
  ];
  
//  deleteing user
  const showDeleteAlert = (name, _id,isInactive) => {
    Swal.fire({
      title: "Are you sure?",
      text: isInactive?`This Action Will Activate ${name} Account`:`This Action Will Inactivate ${name} Account`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.value) {
        
          dispatch(removeUserAccount(_id,!isInactive)).then((dt)=>{
           if(dt.data=="success")
            {
              dispatch(getUsersListData());
              Swal.fire(isInactive?"Activate!!":"InActivate!!",isInactive?`${name} account has been Activated.`:`${name} account has been Inactivated.`, "success");
            }
            else{
              Swal.fire("Failed", `Something Went Wrong Try Again`, "warning");       
            }
          })
         
          
       
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled",isInactive?`${name} Account is not Activated`:`${name} Account is not Inactivated`, "error");
      }
    });
  };

// block-unblock toggle
const showBlockUnblockAlert = (name, _id,isBlock) => {
  console.log(_id);
  Swal.fire({
    title: "Are you sure?",
    text: isBlock?`This Action Will Unblock ${name} Account`:`This Action Will block ${name} Account`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then((res) => {
    if (res.value) {
      console.log("block",isBlock);
      
        dispatch(blockUnblockUser(_id,!isBlock)).then((dt)=>{
          console.log(dt);
         if(dt.data=="success")
          {
            dispatch(getUsersListData());
            Swal.fire(isBlock?"Unblock!!":"Block!!",isBlock?`${name} account has been Unblocked.`:`${name} account has been Blocked.`, "success");
          }
          else{
            Swal.fire("Failed", `Something Went Wrong Try Again`, "warning");       
          }
        })
       
        
     
    } else if (res.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled",isBlock?`${name} Account is not unblocked`:`${name} Account is not blocked`, "error");
    }
  });
};


  const classes = useStyles();
  const [searchBy, setSearchBy] = useState("firstname");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const records = data.data?data.data:[];
  console.log(records);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    TableTemplate({ records, headCells, filterFn });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) => {
            if (searchBy == "firstname") {
              return x.firstname
                .toString()
                .toLowerCase()
                .includes(target.value.toString().toLowerCase());
            } else if (searchBy == "lastname") {
              return x.lastname
                .toString()
                .toLowerCase()
                .includes(target.value.toString().toLowerCase());
            } else if (searchBy == "phone") {
              return x.phone
                .toString()
                .toLowerCase()
                .includes(target.value.toString().toLowerCase());
            } else if (searchBy == "email") {
              if (x.email !== undefined) {
                return x.email
                  .toString()
                  .toLowerCase()
                  .includes(target.value.toString().toLowerCase());
              } else {
              }
            } else if (searchBy == "state") {
              if (x.state !== undefined) {
                return x.state
                  .toString()
                  .toLowerCase()
                  .includes(target.value.toString().toLowerCase());
              } else {
              }
            } else if (searchBy == "city") {
              if (x.city !== undefined) {
                return x.city
                  .toString()
                  .toLowerCase()
                  .includes(target.value.toString().toLowerCase());
              } else {
              }
            }
          });
      },
    });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar style={{ width: "100%" }}>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item lg={8} md={12}>
              <TextField
                variant="outlined"
                label="Search Users Accounts"
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item lg={3} md={12} style={{ width:"100%",marginLeft: "3%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Search By
              </InputLabel>
              <Select
                style={{ width: "100%" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={searchBy}
                onChange={(e) => {
                  setSearchBy(e.target.value);
                }}
              >
                <MenuItem value={"firstname"}>First Name</MenuItem>
                <MenuItem value={"lastname"}>Last Person </MenuItem>
                <MenuItem value={"phone"}>Mobile Number</MenuItem>
                <MenuItem value={"email"}>Email</MenuItem>
                <MenuItem value={"city"}>City</MenuItem>
                <MenuItem value={"state"}>State</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item._id}>
                <TableCell className={classes.table}>{item.firstname}</TableCell>
                <TableCell className={classes.table}>{item.lastname}</TableCell>
                <TableCell className={classes.table}>{item.phone}</TableCell>
                <TableCell className={classes.table}>{item.email?item.email:"Not Available"}</TableCell>
                <TableCell className={classes.table}>{item.state?item.state:"Not Available"}</TableCell>
                <TableCell className={classes.table}>{item.city?item.city:"Not Available"}</TableCell>
                <TableCell className={classes.table}>
                  <ButtonGroup
                    aria-label="medium contained button group"
                    padding="10px"
                    m="2rem"
                  >
                    {checkAccess.data.customersblock?item.isBlock ? (
                      <Button
                        className={classes.buttonSize}
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "4px" }}
                        onClick={()=>{
                          console.log(item)
                          showBlockUnblockAlert(`${item.firstname} ${item.lastname}`,item._id,item.isBlock)
                        }}
                      >
                        UnBlock
                      </Button>
                    ) : (
                      <Button
                        className={classes.buttonSize}
                        size="small"
                        variant="contained"
                        style={{
                          marginRight: "4px",
                          backgroundColor: "#cf0000",
                          color: "white",
                        }}
                        onClick={()=>{
                         showBlockUnblockAlert(`${item.firstname} ${item.lastname}`,item._id,item.isBlock)
                        }}
                      >
                        Block
                      </Button>
                    ):null}
                    {checkAccess.data.customersactive?item.isInactive ? (
                      <Button
                        className={classes.buttonSize}
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "4px" }}
                        onClick={()=>{
                          showDeleteAlert(`${item.firstname} ${item.lastname}`, item._id,item.isInactive);
                        }}
                      >
                        Active
                      </Button>
                    ) : (
                      <Button
                        className={classes.buttonSize}
                        size="small"
                        variant="contained"
                        style={{
                          marginRight: "4px",
                          backgroundColor: "#cf0000",
                          color: "white",
                        }}
                        onClick={()=>{
                          showDeleteAlert(`${item.firstname} ${item.lastname}`, item._id,item.isInactive);

                        }}
                      >
                        Inactive
                      </Button>
                    ):null}
                   
                  </ButtonGroup>
                </TableCell>
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

export default UserTable;
