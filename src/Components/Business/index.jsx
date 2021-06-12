import React, { useEffect, useState } from "react";
import Header from "../Navigation/navigation";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// Helpers
import TitleTemplate from "../../HelpersComponents/TitleTemplate";
import BusinessTable from "./businessTable";
import CategoryTable from "./categorytable";
import CategoryStats from "../Charts/categorystats";
import {
  getBusinessListData,
  getAllCategories,
  getcategoryStats,
} from "../../actions/businessaction";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { accessspecificrole } from "../../actions/auth";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  gridCSS: {
    [theme.breakpoints.down("md")]: {
      width: "80vw !important",
    },
  },
}));

const Business = () => {
  const state = useSelector((state) => state.business);
  const category = useSelector((state) => state.businesscategories);
  const categorystats = useSelector((state) => state.businesscategoriesstats);
  const checkAccess = useSelector((state) => state.getspecificrole);
  const [business, setbusiness] = useState(false);
  const [businessview, setbusinessview] = useState(false);
  const [categoryview, setcategoryview] = useState(false);
  const [categorychartview, setcategorychartview] = useState(false);
  const [doRedirect, setdoRedirect] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    dispatch(getBusinessListData());
    dispatch(getAllCategories());
    dispatch(getcategoryStats());
    dispatch(accessspecificrole(null, JSON.parse(token).role.toString())).then(
      (res) => {
        if (res.status === 200) {
          if (!res.data.business) {
            setdoRedirect(true);
          }
        } else {
        }
      }
    );
  }, []);
  {
  }
  useEffect(() => {
    if (checkAccess.data != null || checkAccess.data !== undefined) {
      setbusiness(checkAccess.data.business);
      setbusinessview(checkAccess.data.businessview);
      setcategoryview(checkAccess.data.categoryview);
      setcategorychartview(checkAccess.data.categorychartview);
    }
  }, [checkAccess.data]);
  if (!doRedirect) {
    return (
      <>
        <Header>
          <div className={classes.root}>
            <TitleTemplate title="BUSINESS PANEL" />
            <Grid
              className={classes.gridCSS}
              container
              spacing={2}
              justify="center"
              alignItems="center"
            >
              {business && businessview ? (
                <Grid item xs={12}>
                  <BusinessTable data={state} />
                </Grid>
              ) : null}
              {business && categoryview ? (
                <Grid item xs={12}>
                  <CategoryTable category={category} />
                </Grid>
              ) : null}
              {business && categorychartview ? (
                <Grid item xs={12}>
                  <CategoryStats stats={categorystats} />
                </Grid>
              ) : null}
            </Grid>
          </div>
        </Header>
      </>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
export default Business;
