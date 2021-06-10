import React, { useEffect } from "react";
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
import { Redirect, Route } from "react-router-dom";

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
  console.log();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBusinessListData());
    dispatch(getAllCategories());
    dispatch(getcategoryStats());
  }, []);
  if(!checkAccess.data.business){
    return <Redirect to={"/"} />;

  }
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
            {checkAccess.data.business && checkAccess.data.businessview ? (
              <Grid item xs={12}>
                <BusinessTable data={state} />
              </Grid>
            ) : null}
            {checkAccess.data.business && checkAccess.data.categoryview ? (
              <Grid item xs={12}>
                <CategoryTable category={category} />
              </Grid>
            ) : null}
            {checkAccess.data.business && checkAccess.data.categorychartview ? (
              <Grid item xs={12}>
                <CategoryStats stats={categorystats} />
              </Grid>
            ) : null}
          </Grid>
        </div>
      </Header>
    </>
  );
};
export default Business;
