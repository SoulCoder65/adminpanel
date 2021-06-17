import React, { useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import {
  InputLabel,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import validator from "validator";
import EditIcon from "@material-ui/icons/Edit";
import { editSubAdmins } from "../../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//getting category action
// import { fetchAllCategory, addCategory } from "../../../actions/category";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "75ch",
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
  btn: {
    [theme.breakpoints.down("md")]: {
      // width:"4px"
      // fontSize:"10px"
    },
  },
  formControl: {
    width: "96%",
  },
}));

const UpdateSubAdmin = ({ data, updateFun }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const allroles = useSelector((state) => state.getAllroles);

  function CustomDialogContent(props) {
    const dialog = useDialog();
    const [value, setValue] = useState();

    const [values, setValues] = useState({
      _id: data._id,
      fullname: data.fullname !== null ? data.fullname : "",
      email: data.email !== null ? data.email : "",
      phone: data.phone !== null ? data.phone : "",
      role: data.role !== null && data.role !== undefined ? data.role : "",
      isActive: data.isActive !== null ? data.isActive : false,
    });

    const [errors, setErrors] = useState({
      nameError: false,
      emailError: false,
      phoneError: false,
      roleError: false,
    });
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleCheckChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.checked });
    };
    const submitForm = () => {
      if (validator.isEmpty(values.role)) {
        setErrors({
          ...errors,
          roleError: true,
        });
      } else if (validator.isEmpty(values.fullname)) {
        setErrors({
          ...errors,
          nameError: true,
          roleError: false,
        });
      } else if (!validator.isMobilePhone(values.phone)) {
        setErrors({
          ...errors,
          phoneError: true,
          nameError: false,
        });
      } else if (!validator.isEmail(values.email)) {
        setErrors({
          ...errors,
          emailError: true,
          phoneError: false,
        });
      } else {
        setErrors({
          ...errors,
          emailError: false,
          phoneError: false,
          nameError: false,
          roleError: false,
        });

        dispatch(editSubAdmins(values)).then((res) => {
          try {
            if (res.status === 200) {
              updateFun();
              Swal.fire("Success", `Account Updated Successfully`, "success");
              dialog.close(value);
            } else if (res.status === 400) {
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
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="demo-simple-select-helper"
              style={{ marginLeft: "1%",marginTop:"2px" }}
            >
              Select Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              variant="outlined"
              value={values.role}
              onChange={handleChange("role")}
            >
              <MenuItem value="">Select Role</MenuItem>;
              {allroles !== null && allroles !== undefined
                ? allroles.data.map((dt) => {
                    return (
                      <MenuItem value={dt.role_name}>{dt.role_name}</MenuItem>
                    );
                  })
                : null}
            </Select>
            {errors.roleError ? (
              <FormHelperText
                id="component-error-text"
                style={{ color: "red" }}
              >
                Role can't be empty
              </FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            className={classes.formControl}
            id="standard-basic"
            label="Full Name"
            variant="outlined"
            value={values.fullname}
            onChange={handleChange("fullname")}
          />
          {errors.nameError ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              Name can't be empty
            </FormHelperText>
          ) : null}
          <TextField
            className={classes.formControl}
            id="standard-basic"
            label="Phone"
            variant="outlined"
            value={values.phone}
            onChange={handleChange("phone")}
          />
          {errors.phoneError ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              Enter a valid phone number
            </FormHelperText>
          ) : null}

          <TextField
            className={classes.formControl}
            id="standard-basic"
            label="E-mail"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
          />
          {errors.emailError ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              Enter a valid email address
            </FormHelperText>
          ) : null}
        </form>
        <FormControlLabel
          style={{ marginLeft: "1%" }}
          control={
            <Switch
              checked={values.isActive}
              onChange={handleCheckChange}
              name="isActive"
              color="primary"
            />
          }
          label="Active"
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "5%", marginBottom: "20px" }}
            onClick={submitForm}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        size="small"
        className={classes.btn}
        variant="contained"
        startIcon={<EditIcon />}
        color="primary"
        onClick={async () => {
          const result = await CustomDialog(<CustomDialogContent />, {
            title: "Update Fields",
            showCloseIcon: true,
          });
        }}
      >
        Update
      </Button>
    </div>
  );
};
export default UpdateSubAdmin;
