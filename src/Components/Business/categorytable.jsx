import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {
  Toolbar,
  Typography,
  Grid,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BackupIcon from "@material-ui/icons/Backup";
import Alert from "@material-ui/lab/Alert";

import { CustomDialog, useDialog } from "react-st-modal";

import {
  getAllCategories,
  deletecategory,
  updatecategory,
  createcategory,
} from "../../actions/businessaction";

import { useDispatch, useSelector } from "react-redux";
import { TableContainer } from "@material-ui/core";
import Swal from "sweetalert2";
import "../../App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    width: "90vw",
    [theme.breakpoints.down("md")]:{
      padding: theme.spacing(0),
      
    }
  },
  table: {},
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
    color: "white",
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
      width: "90vw",
    },
  },
}));

const CustomTableCell = ({ row, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row.category_name}
          name={row.category_name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row.category_name
      )}
    </TableCell>
  );
};

const CategoryTable = ({ category }) => {
  const dispatch = useDispatch(getAllCategories());

  const [rows, setRows] = React.useState(category.data);
  const [previous, setPrevious] = React.useState({});
  const [newvalue, setnewValue] = React.useState("");
  const [showAlert, setShowAlert] = useState(null);
  const checkAccess = useSelector((state) => state.getspecificrole);
  const classes = useStyles();

  useEffect(() => {
    setRows(category.data);
  }, [category]);

  const onToggleEditMode = (e, _id, check = false, name = "") => {
    if (check === true && newvalue !== "") {
      dispatch(updatecategory(_id, newvalue)).then((dt) => {
      });
    }
    setRows((state) => {
      return rows.map((row) => {
        if (row._id === _id) {
          if (!row.category_name == "") {
            return { ...row, isEditMode: !row.isEditMode };
          } else {
            return {
              ...row,
              category_name: previous[row._id].category_name,
              isEditMode: !row.isEditMode,
            };
          }
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row._id]) {
      setPrevious((state) => ({ ...state, [row._id]: row }));
    }
    const value = e.target.value;
    setnewValue(e.target.value);
    const name = e.target.name;
    const { _id } = row;
    const newRows = rows.map((row) => {
      if (row._id === _id) {
        return { ...row, category_name: value };
      }
      return row;
    });

    setRows(newRows);
  };

  const onDelete = (_id, isActive, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: isActive
        ? `This action will Inactive ${name} category!!`
        : `This action will Active ${name} category!!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.value) {
        dispatch(deletecategory(_id, !isActive)).then((res) => {
          if (res !== undefined) {
            setRows(res.data);
            Swal.fire(
              isActive ? "Inactivated!" : "Activated",
              isActive
                ? `${name} category has been Inactivated.`
                : `${name} category has been Activated.`,
              "success"
            );
          } else {
            Swal.fire(
              "Failed",
              isActive ? `${name} to Inactive` : `${name} to Active`,
              "error"
            );
          }
        });
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          isActive
            ? `${name} Category is not Inactivated`
            : `${name} Category is not Activated`,
          "error"
        );
      }
    });
  };

  // <---------------------SHOW DIALOG----------------------->
  function CustomDialogContent(props) {
    const classes = useStyles();

    const dialog = useDialog();

    const [value, setValue] = useState();
    const [iserror, setError] = useState(false);
    const [erromsg, setErrormsg] = useState("");
    const [categoryname, setName] = useState("");

    return (
      <div>
        <form className={classes.modal} noValidate autoComplete="off">
          <FormControl className={classes.modelField} error={iserror}>
            <InputLabel htmlFor="component-error">Name</InputLabel>
            <Input
              id="component-error"
              value={categoryname}
              onChange={(e) => {
                setName(e.target.value);
              }}
              aria-describedby="component-error-text"
            />
            {iserror ? (
              <FormHelperText id="component-error-text">
                {erromsg}
              </FormHelperText>
            ) : null}
          </FormControl>

          <Button
            className={classes.modelField}
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            component="span"
            startIcon={<BackupIcon />}
            onClick={() => {
              if (!categoryname == "") {
                dispatch(createcategory(categoryname)).then((res) => {
                  if (res.data.msg) {
                    setError(true);
                    setErrormsg(res.data.msg);
                  } else if (res.data.msg == undefined) {
                    setError(false);
                    setErrormsg("");
                    dialog.close(value);
                    setRows(res.data);
                    setShowAlert(true);
                  }
                });
              } else {
                setError(true);
                setErrormsg("Field can't be empty!!");
              }
            }}
          >
            Add
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Paper className={classes.root} style={{ color: "red" }}>
      {showAlert && (
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setShowAlert(null)}
        >
          Category Added Successfully!!
        </Alert>
      )}
      <Toolbar style={{ backgroundColor: "black" }}>
        <Grid
          container
          style={{ width: "100%" }}
          spacing={4}
          alignItems="center"
        >
          <Grid item xs={8} lg={9}>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Categories
            </Typography>
          </Grid>
          {checkAccess.data.categoryadd ? (
            <Grid
              item
              xs={3}
              className={classes.modelField}
              style={{ paddingLeft: "10%" }}
            >
              <Button
                size="medium"
                variant="contained"
                style={{ backgroundColor: "#cf0000", color: "white" }}
                onClick={async () => {
                  const result = await CustomDialog(
                    <CustomDialogContent
                      className={classes.modelField}
                      category={category}
                    />,
                    {
                      title: "Enter Category",
                      showCloseIcon: true,
                    }
                  );
                }}
              >
                Add
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="caption table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                {checkAccess.data.categoryedit ? (
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="done"
                          onClick={(e) =>
                            onToggleEditMode(
                              e,
                              row._id,
                              true,
                              row.category_name
                            )
                          }
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => onToggleEditMode(e, row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                ) : null}
                <CustomTableCell {...{ row, onChange }} />
                {/* <CustomTableCell {...{ row, name: "calories", onChange }} /> */}
                {checkAccess.data.categoryactive ? (
                  <TableCell align="left" className={classes.tableCell}>
                    {!row.isActive ? (
                      <Button
                        className={classes.buttonSize}
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{
                          marginRight: "4px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                        onClick={() => {
                          onDelete(row._id, row.isActive, row.category_name);
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
                        onClick={() => {
                          onDelete(row._id, row.isActive, row.category_name);
                        }}
                      >
                        Inactive
                      </Button>
                    )}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default CategoryTable;
