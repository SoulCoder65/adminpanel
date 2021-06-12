import React, { useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import validator from "validator";

import { signup } from "../../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//getting category action
// import { fetchAllCategory, addCategory } from "../../../actions/category";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "98%",
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
    formControl: {
      width: "86%",
    },
  },
  btn: {
    backgroundColor: "#cf0000",
    color: "white",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginBottom: "2%",
      marginLeft:"5%"
    },
  },
}));

const CreateSubAdmin = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allroles = useSelector((state) => state.getAllroles);

  function CustomDialogContent(props) {
    const dialog = useDialog();
    const [value, setValue] = useState();

    const [values, setValues] = useState({
      fullname: "",
      password: "",
      email: "",
      phone: "",
      role: "",
      showPassword: false,
    });

    const [errors, setErrors] = useState({
      nameError: false,
      passwordError: false,
      emailError: false,
      phoneError: false,
      roleError: false,
    });
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
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
      } else if (!validator.isStrongPassword(values.password)) {
        setErrors({
          ...errors,
          passwordError: true,
          emailError: false,
        });
      } else {
        setErrors({
          ...errors,
          passwordError: false,
          emailError: false,
          phoneError: false,
          nameError: false,
          roleError: false,
        });

        console.log(values);
        dispatch(signup(values)).then((res) => {
          try {
            if (res.status === 200) {
              Swal.fire(
                "Success",
                `Sub-Admin Account Created Successfully`,
                "success"
              );
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
            <InputLabel htmlFor="outlined-adornment-password">
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
              {/* <MenuItem value="HR">HR</MenuItem>;
              <MenuItem value="support">Support</MenuItem>;
              <MenuItem value="sales">Sales</MenuItem>;
              <MenuItem value="tech">Tech</MenuItem>;
              <MenuItem value="admin">Admin</MenuItem>; */}
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

          <FormControl
            className={classes.formControl}
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.passwordError ? (
              <FormHelperText
                id="component-error-text"
                style={{ color: "red" }}
              >
                Password must be atleast 8 characters long,includes upper,lower
                and numberic combination
              </FormHelperText>
            ) : null}
          </FormControl>
        </form>
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "5%", marginBottom: "20px" }}
            onClick={submitForm}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Button
        className={classes.btn}
        size="medium"
        variant="contained"
        onClick={async () => {
          const result = await CustomDialog(<CustomDialogContent />, {
            title: "Enter Fields",
            showCloseIcon: true,
          });
        }}
      >
        Add
      </Button>
    </div>
  );
};
export default CreateSubAdmin;
