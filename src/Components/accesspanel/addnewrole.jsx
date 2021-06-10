import React, { useEffect, useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormHelperText,
} from "@material-ui/core";
import validator from "validator";

 import { createNewRole } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//getting category action
// import { fetchAllCategory, addCategory } from "../../../actions/category";

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

const AddnewRole = ({updatesRoles}) => {
  const dispatch = useDispatch();
  function CustomDialogContent(props) {
    const classes = useStyles();

    const dialog = useDialog();
    const [value, setValue] = useState();

    const [role_name, setRoleName] = useState("");

    const [errors, setErrors] = useState({
      roleError: false,
    });
    const handleChange=(event) => {
        setRoleName(event.target.value);
    };

    const submitForm = () => {
      if (validator.isEmpty(role_name)) {
        setErrors({
          roleError: true,
        });
      } else {
        setErrors({
          roleError: false,
        });

        console.log(role_name);
        dispatch(createNewRole(role_name)).then((res) => {
          try {
            if (res.status == 200) {
                updatesRoles()
              Swal.fire(
                "Success",
                `Role Added Successfully`,
                "success"
              );
              dialog.close(value);
            } else if (res.status == 400) {
              Swal.fire("Failed", `${res.data.msg}`, "warning");
            }
          } catch (error) {
            Swal.fire(
              "Failed",
              `Something Went Wrong, Try Again Later`,
              "warning"
            );

            dialog.close(value);
          }
        });
      }
    };

    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Role Title"
            variant="outlined"
            value={role_name}
            onChange={(e)=>{
                handleChange(e)
            }}
          />
          {errors.roleError ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              Role can't be empty
            </FormHelperText>
          ) : null}
          </form>
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "2%", marginBottom: "20px" }}
            onClick={submitForm}
          >
            Add
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
        color="primary"
        style={{width:"100%"}}
        onClick={async () => {
          const result = await CustomDialog(<CustomDialogContent />, {
            title: "Enter Fields",
            showCloseIcon: true,
          });
        }}
      >
        Add Role
      </Button>
    </div>
  );
};
export default AddnewRole;
