import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { CustomDialog, useDialog } from "react-st-modal";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {updateRole} from "../../actions/adminaction"
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
    input: {
      display: "none",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "90%",
    },
  },
}));

const EditRole = ({updatesRoles}) => {
  const dispatch = useDispatch();
  const allroles = useSelector((state) => state.getAllroles);
  

  function CustomDialogContent(props) {
    const classes = useStyles();

    const dialog = useDialog();
    const [value, setValue] = useState();

    const [role_name, setRoleName] = useState("");
    const [updaterole, setupdaterole] = useState("");
    const [errors, setErrors] = useState({
      updateroleError: false,
    });
    const [errormsg, seterrormsg] = useState("")
    const handleChange = (event) => {
      setRoleName(event.target.value);
      setupdaterole(event.target.value);
    };

    const submitForm=()=>{
      dispatch(updateRole(role_name,updaterole)).then((res)=>{
        try {
          if(res.status==200)
          {

            updatesRoles()
              Swal.fire(
                "Success",
                `Role Updated Successfully`,
                "success"
              );
              dialog.close(value);
           
          }
          else{
            setErrors({
              updateroleError:true
            })
            seterrormsg(res.data.message)
          }
          
        } catch (error) {
          console.log(error)
          Swal.fire(
            "Failed",
            `Something Went Wrong, Try Again Later`,
            "warning"
          );

          dialog.close(value);
        }
      })
    }
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="demo-simple-select-helper"
              style={{ marginLeft: "1%" }}
            >
              Select Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              variant="outlined"
              value={role_name}
              onChange={handleChange}
            >
              <MenuItem value="">Select Role To Update</MenuItem>;
              {allroles !== null && allroles !== undefined
                ? allroles.data.map((dt) => {
                    return (
                      <MenuItem value={dt.role_name}>{dt.role_name}</MenuItem>
                    );
                  })
                : null}
            </Select>
            </FormControl>
          {role_name !== "" ? (
            <TextField
              className={classes.formControl}
              id="standard-basic"
              label="Edit Role"
              variant="outlined"
              value={updaterole}
              onChange={(e) => {
                setupdaterole(e.target.value);
              }}
            />
          ) : null}
          {errors.updateroleError ? (
              <FormHelperText
                id="component-error-text"
                style={{ color: "red" }}
              >
                {errormsg}
              </FormHelperText>
            ) : null}
          
          </form>
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={role_name === updaterole || updaterole==="" }
            style={{ marginLeft: "2%", marginBottom: "20px" }}
            onClick={submitForm}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        size="medium"
        variant="contained"
        style={{ backgroundColor: "#cf0000", width: "100%", color: "white" }}
        onClick={async () => {
          const result = await CustomDialog(<CustomDialogContent />, {
            title: "Select Role To Update ",
            showCloseIcon: true,
          });
        }}
      >
        Edit Role
      </Button>
    </div>
  );
};

export default EditRole;
