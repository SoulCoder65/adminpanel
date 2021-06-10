import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import ReactFC from "react-fusioncharts";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    maxHeight: "340",
    width: "90vw",
    // margin:"auto"
    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
  },
}));

charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, CandyTheme);

const Businessstats = ({ business, check }) => {
  console.log(check);
  const labels = [];
  const dataValues = [];
  try {
    if (business.data[0] != undefined) {
      if (check == "sevendays") {
        Object.keys(business.data[0].sevendays).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(business.data[0].sevendays).map((data, index) => {
          dataValues.push({ value: data });
        });
      } else if (check == "month") {
        Object.keys(business.data[0].currstats).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(business.data[0].currstats).map((data, index) => {
          dataValues.push({ value: data });
        });
      } else if (check == "lst24hrs") {
        Object.keys(business.data[0].last24hrs).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(business.data[0].last24hrs).map((data, index) => {
          dataValues.push({ value: data });
        });
      } else {
        Object.keys(business.data[0].businessStats).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(business.data[0].businessStats).map((data, index) => {
          dataValues.push({ value: data });
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  const dataSource = {
    chart: {
      caption: "Number Of Registered Businesses ",
      yaxisname: "Number of Businesses",
      showhovereffect: "1",
      divLineIsDashed: "1",
      rotateLabels: "1",
      labelDisplay: "wrap",

      drawcrossline: "1",
      // forceYAxisValueDecimals: "0",
      sForceDecimals: "1",

      plottooltext: "<b>$dataValue</b> accounts Registered ",
      theme: "candy",
    },
    categories: [
      {
        category: labels,
      },
    ],
    dataset: [
      {
        seriesname: "Business",
        data: dataValues,
      },
    ],
  };

  // console.log("dispatch ", auth.error);
  const classes = useStyles();

  return (
    <ReactFusioncharts
      type="msline"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default Businessstats;
